'use no memo'

import { useEffect, useMemo, useRef } from 'react'
import { Vector2 } from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'

import type { CSSProperties } from 'react'
import type { ShaderMaterial } from 'three'

/**
 * Optraze hero — "contour field".
 * A single fullscreen triangle draws flowing topographic isolines of a
 * domain-warped fBM field, inked in indigo->cyan on paper. It reads as layers of
 * memory / sound contours resonating through a medium; the cursor displaces the
 * field, and the left edge is kept clean so the headline stays crisp.
 * No drei — a hand-rolled clip-space triangle keeps the client chunk small.
 */

// fullscreen triangle in clip space + matching uvs
const POSITIONS = new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0])
const UVS = new Float32Array([0, 0, 2, 0, 0, 2])

const vertexShader = /* glsl */ `
	varying vec2 vUv;
	void main() {
		vUv = uv;
		gl_Position = vec4(position.xy, 0.0, 1.0);
	}
`

const fragmentShader = /* glsl */ `
	precision highp float;
	varying vec2 vUv;
	uniform float u_time;
	uniform vec2 u_mouse;
	uniform vec2 u_res;

	vec3 mod289(vec3 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
	vec2 mod289(vec2 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
	vec3 permute(vec3 x){ return mod289(((x*34.0)+1.0)*x); }

	float snoise(vec2 v){
		const vec4 C = vec4(0.211324865405187, 0.366025403784439,
			-0.577350269189626, 0.024390243902439);
		vec2 i  = floor(v + dot(v, C.yy));
		vec2 x0 = v - i + dot(i, C.xx);
		vec2 i1 = (x0.x > x0.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
		vec4 x12 = x0.xyxy + C.xxzz;
		x12.xy -= i1;
		i = mod289(i);
		vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
			+ i.x + vec3(0.0, i1.x, 1.0));
		vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
			dot(x12.zw,x12.zw)), 0.0);
		m = m*m; m = m*m;
		vec3 x = 2.0 * fract(p * C.www) - 1.0;
		vec3 h = abs(x) - 0.5;
		vec3 ox = floor(x + 0.5);
		vec3 a0 = x - ox;
		m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
		vec3 g;
		g.x  = a0.x  * x0.x  + h.x  * x0.y;
		g.yz = a0.yz * x12.xz + h.yz * x12.yw;
		return 130.0 * dot(m, g);
	}

	float fbm(vec2 p){
		float v = 0.0;
		float a = 0.5;
		for (int i = 0; i < 5; i++) {
			v += a * snoise(p);
			p = p * 2.0 + vec2(11.3, 7.1);
			a *= 0.5;
		}
		return v;
	}

	void main(){
		float aspect = u_res.x / max(u_res.y, 1.0);
		vec2 p = vUv;
		p.x *= aspect;
		p *= 2.3;

		vec2 mo = u_mouse - 0.5;
		mo.x *= aspect;
		p += mo * 0.6;

		float t = u_time * 0.05;
		vec2 w = vec2(fbm(p + t), fbm(p + vec2(4.7, 2.1) - t));
		float field = fbm(p + 1.3 * w);

		// isolines: distance to nearest contour level
		float f = field * 6.0 + t * 1.2;
		float d = abs(fract(f) - 0.5);
		float aa = fwidth(f) * 1.25;
		float line = 1.0 - smoothstep(0.0, aa, d);

		// ink colour by field value
		vec3 indigo = vec3(0.310, 0.275, 0.898);
		vec3 cyan   = vec3(0.024, 0.714, 0.831);
		vec3 ink    = mix(indigo, cyan, smoothstep(-0.7, 0.7, field));

		vec3 paper = vec3(0.957, 0.953, 0.933);

		// keep the left edge clean for the headline; strengthen toward the right
		float edge = smoothstep(0.02, 0.46, vUv.x);
		// faint field tint between contours adds depth without clutter
		float tint = smoothstep(0.2, 0.9, field) * 0.05 * edge;
		float cov = line * edge * 0.82;

		vec3 col = mix(paper, ink, clamp(cov + tint, 0.0, 1.0));
		gl_FragColor = vec4(col, 1.0);
	}
`

function Field() {
  const ref = useRef<ShaderMaterial>(null)
  const target = useRef(new Vector2(0.5, 0.5))
  const current = useRef(new Vector2(0.5, 0.5))
  const { size } = useThree()

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_mouse: { value: new Vector2(0.5, 0.5) },
      u_res: { value: new Vector2(size.width, size.height) },
    }),
    [size.width, size.height]
  )

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      target.current.set(
        e.clientX / window.innerWidth,
        1 - e.clientY / window.innerHeight
      )
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  useFrame((state, delta) => {
    const m = ref.current
    if (!m) return
    m.uniforms.u_time.value += Math.min(delta, 0.033)
    current.current.lerp(target.current, 0.04)
    m.uniforms.u_mouse.value.copy(current.current)
    m.uniforms.u_res.value.set(state.size.width, state.size.height)
  })

  return (
    <mesh frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[POSITIONS, 3]} />
        <bufferAttribute attach="attributes-uv" args={[UVS, 2]} />
      </bufferGeometry>
      <shaderMaterial
        ref={ref}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  )
}

export default function HeroCanvas({ paused = false }: { paused?: boolean }) {
  return (
    <Canvas
      dpr={[1, 2]}
      frameloop={paused ? 'never' : 'always'}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
      }}
      style={{ position: 'absolute', inset: 0 } as CSSProperties}
      aria-hidden="true"
    >
      <Field />
    </Canvas>
  )
}
