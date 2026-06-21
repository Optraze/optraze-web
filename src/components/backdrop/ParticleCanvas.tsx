'use no memo'

import { useEffect, useMemo, useRef, useState } from 'react'
import { AdditiveBlending, Vector2 } from 'three'
import { Canvas, useFrame } from '@react-three/fiber'

import type { CSSProperties } from 'react'
import type { ShaderMaterial } from 'three'

const vertexShader = /* glsl */ `
  uniform float u_time;
  uniform float u_transition;
  uniform vec2 u_mouse;

  attribute float aRand;
  attribute vec3 aPositionSphere;
  attribute vec3 aPositionWave;

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec3 pos = position;

    // Transition between Grid (position), Sphere (aPositionSphere), and Wave (aPositionWave)
    if (u_transition <= 1.0) {
      pos = mix(position, aPositionSphere, u_transition);
    } else {
      pos = mix(aPositionSphere, aPositionWave, u_transition - 1.0);
    }

    // Add gentle noise flow
    pos.x += sin(u_time * 0.4 + aRand * 6.28) * 0.08;
    pos.y += cos(u_time * 0.4 + aRand * 6.28) * 0.08;
    pos.z += sin(u_time * 0.6 + aRand * 6.28) * 0.08;

    // Mouse magnetic push away
    vec2 mouseWorld = u_mouse * 4.0;
    float d = distance(pos.xy, mouseWorld);
    if (d < 1.0) {
      float force = (1.0 - d) * 0.35;
      pos.xy += normalize(pos.xy - mouseWorld) * force;
    }

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Responsive size
    gl_PointSize = (10.0 / -mvPosition.z) * (1.0 + sin(u_time * 2.0 + aRand * 10.0) * 0.2);

    // Ink and Indigo mix for light theme
    // Indigo: #4f46e5 (rgb: 0.31, 0.275, 0.898)
    // Cyan: #06b6d4 (rgb: 0.024, 0.714, 0.831)
    vColor = mix(vec3(0.310, 0.275, 0.898), vec3(0.024, 0.714, 0.831), aRand);
    vAlpha = smoothstep(-3.0, 3.0, pos.x) * 0.24;
  }
`

const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    // Circle points
    vec2 circ = gl_PointCoord - vec2(0.5);
    if (dot(circ, circ) > 0.25) {
      discard;
    }
    float r = dot(circ, circ) * 4.0;
    float alpha = (1.0 - r) * vAlpha;
    gl_FragColor = vec4(vColor, alpha);
  }
`

function Particles({ scrollRatio }: { scrollRatio: number }) {
  const mat = useRef<ShaderMaterial>(null)
  const mouse = useRef(new Vector2(0, 0))
  const targetMouse = useRef(new Vector2(0, 0))

  const count = 3000

  const { positions, positionsSphere, positionsWave, rands } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const posSph = new Float32Array(count * 3)
    const posWave = new Float32Array(count * 3)
    const rnd = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      // 1. Grid (Hero state)
      const x = ((i % 50) / 50 - 0.5) * 6.5
      const y = (Math.floor(i / 50) / 60 - 0.5) * 5.0
      pos[i * 3] = x
      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = 0

      // 2. Sphere (Platform / constellation state)
      const u = Math.random()
      const v = Math.random()
      const theta = u * 2.0 * Math.PI
      const phi = Math.acos(2.0 * v - 1.0)
      const r = 1.3 + Math.random() * 0.2
      posSph[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      posSph[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      posSph[i * 3 + 2] = r * Math.cos(phi)

      // 3. Wave (VoiceFlow / audio waves state)
      const wx = ((i % 50) / 50 - 0.5) * 6.0
      const wy = (Math.floor(i / 50) / 60 - 0.5) * 3.5
      const dist = Math.sqrt(wx * wx + wy * wy)
      posWave[i * 3] = wx
      posWave[i * 3 + 1] = wy + Math.sin(dist * 2.5) * 0.35
      posWave[i * 3 + 2] = Math.cos(dist * 2.5) * 0.25

      rnd[i] = Math.random()
    }

    return {
      positions: pos,
      positionsSphere: posSph,
      positionsWave: posWave,
      rands: rnd,
    }
  }, [])

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_transition: { value: 0 },
      u_mouse: { value: new Vector2(0, 0) },
    }),
    []
  )

  useEffect(() => {
    if (typeof window === 'undefined') return
    const onMove = (e: PointerEvent) => {
      targetMouse.current.set(
        (e.clientX / window.innerWidth - 0.5) * 2,
        -(e.clientY / window.innerHeight - 0.5) * 2
      )
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  useFrame((state) => {
    if (!mat.current) return
    const time = state.clock.getElapsedTime()
    mat.current.uniforms.u_time.value = time

    // Morph state transition target: scrollRatio maps to 0.0 -> 2.0
    const targetTransition = scrollRatio * 2.0
    mat.current.uniforms.u_transition.value +=
      (targetTransition - mat.current.uniforms.u_transition.value) * 0.08

    // Interpolate mouse coordinates
    mouse.current.lerp(targetMouse.current, 0.08)
    mat.current.uniforms.u_mouse.value.copy(mouse.current)
  })

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute
          attach="attributes-aPositionSphere"
          args={[positionsSphere, 3]}
        />
        <bufferAttribute
          attach="attributes-aPositionWave"
          args={[positionsWave, 3]}
        />
        <bufferAttribute attach="attributes-aRand" args={[rands, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={mat}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  )
}

export default function ParticleCanvas({
  paused = false,
}: {
  paused?: boolean
}) {
  const [scrollRatio, setScrollRatio] = useState(0)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const handleScroll = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight
      if (maxScroll <= 0) return
      setScrollRatio(window.scrollY / maxScroll)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Canvas
      dpr={[1, 2]}
      frameloop={paused ? 'never' : 'always'}
      camera={{ position: [0, 0, 3], fov: 60 }}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      style={{ position: 'absolute', inset: 0 } as CSSProperties}
      aria-hidden="true"
    >
      <Particles scrollRatio={scrollRatio} />
    </Canvas>
  )
}
