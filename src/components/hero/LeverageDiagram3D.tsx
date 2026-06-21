'use no memo'

import { useEffect, useMemo, useRef } from 'react'
import { Vector2 } from 'three'
import { Html, Line } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'

import type { CSSProperties } from 'react'
import type { Group, Mesh } from 'three'

type Point3D = [number, number, number]

const FOUNDATIONS: { name: string; pos: Point3D }[] = [
  { name: 'Realtime', pos: [-1.4, 0.7, 0.1] },
  { name: 'Memory', pos: [-1.4, -0.05, 0.45] },
  { name: 'Privacy', pos: [-1.4, -0.8, -0.15] },
]

const PRODUCTS: { name: string; pos: Point3D }[] = [
  { name: 'ConvoMem', pos: [1.4, 0.65, -0.1] },
  { name: 'VoiceFlow', pos: [1.4, -0.05, 0.35] },
  { name: 'Future SaaS', pos: [1.4, -0.75, -0.2] },
]

function Pulse({
  start,
  end,
  offset,
}: {
  start: Point3D
  end: Point3D
  offset: number
}) {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    // Speed factor: 0.18 for elegant, smooth pulse flow
    const t = (state.clock.getElapsedTime() * 0.18 + offset) % 1.0

    meshRef.current.position.set(
      start[0] + (end[0] - start[0]) * t,
      start[1] + (end[1] - start[1]) * t,
      start[2] + (end[2] - start[2]) * t
    )
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.024, 8, 8]} />
      <meshBasicMaterial color="#4f46e5" transparent opacity={0.8} />
    </mesh>
  )
}

function Diagram() {
  const groupRef = useRef<Group>(null)
  const mouse = useRef(new Vector2(0, 0))

  useEffect(() => {
    if (typeof window === 'undefined') return
    const handleMove = (e: MouseEvent) => {
      mouse.current.set(
        (e.clientX / window.innerWidth - 0.5) * 2,
        -(e.clientY / window.innerHeight - 0.5) * 2
      )
    }
    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return
    const time = state.clock.getElapsedTime()

    // Slow auto orbital rotation around Y-axis
    groupRef.current.rotation.y = Math.sin(time * 0.12) * 0.12
    // Mouse hover tilt parallax
    groupRef.current.rotation.x +=
      (mouse.current.y * 0.15 - groupRef.current.rotation.x) * 0.05
    groupRef.current.rotation.z +=
      (-mouse.current.x * 0.1 - groupRef.current.rotation.z) * 0.05
  })

  // Generate links between every foundation and product
  const links = useMemo(() => {
    const arr: { start: Point3D; end: Point3D; key: string }[] = []
    for (const f of FOUNDATIONS) {
      for (const p of PRODUCTS) {
        arr.push({
          start: f.pos,
          end: p.pos,
          key: `${f.name}-${p.name}`,
        })
      }
    }
    return arr
  }, [])

  return (
    <group ref={groupRef}>
      {/* 3D Connecting Lines */}
      {links.map((link) => (
        <Line
          key={link.key}
          points={[link.start, link.end]}
          color="#0b0c10"
          lineWidth={1.0}
          transparent
          opacity={0.08}
        />
      ))}

      {/* Signal pulses flowing through connections */}
      {links.map((link, idx) => (
        <Pulse
          key={`pulse-${link.key}`}
          start={link.start}
          end={link.end}
          offset={idx * 0.11}
        />
      ))}

      {/* Foundation Nodes */}
      {FOUNDATIONS.map((f) => (
        <mesh key={f.name} position={f.pos}>
          <sphereGeometry args={[0.065, 16, 16]} />
          <meshBasicMaterial color="#4f46e5" />
          <Html distanceFactor={5} position={[0, 0.16, 0]} center>
            <div className="select-none whitespace-nowrap border border-line bg-paper/90 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-indigo shadow-sm">
              {f.name}
            </div>
          </Html>
        </mesh>
      ))}

      {/* Product Nodes */}
      {PRODUCTS.map((p) => (
        <mesh key={p.name} position={p.pos}>
          <sphereGeometry args={[0.065, 16, 16]} />
          <meshBasicMaterial color="#06b6d4" />
          <Html distanceFactor={5} position={[0, 0.16, 0]} center>
            <div className="select-none whitespace-nowrap border border-line bg-paper/90 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-cyan shadow-sm">
              {p.name}
            </div>
          </Html>
        </mesh>
      ))}
    </group>
  )
}

export default function LeverageDiagram3D() {
  return (
    <div
      className="relative h-[320px] w-full sm:h-[400px] md:h-[450px] lg:h-[500px]"
      aria-hidden="true"
    >
      {/* Visual background framing lines to ground the 3D model */}
      <div className="pointer-events-none absolute inset-x-4 inset-y-0 border-x border-line/45" />
      <div className="pointer-events-none absolute inset-x-0 inset-y-8 border-y border-line/45" />

      <Canvas
        camera={{ position: [0, 0, 3.2], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ position: 'absolute', inset: 0 } as CSSProperties}
      >
        <ambientLight intensity={0.5} />
        <Diagram />
      </Canvas>
    </div>
  )
}
