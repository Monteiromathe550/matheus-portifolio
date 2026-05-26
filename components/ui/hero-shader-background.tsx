"use client"

import { Canvas } from "@react-three/fiber"
import { BreathingOrb, EnergyRing, ShaderPlane } from "@/components/ui/background-paper-shaders"

export function HeroShaderBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="paper-shader-field" />
      <Canvas
        className="hero-canvas"
        camera={{ position: [0, 0, 3.4], fov: 48 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <BreathingOrb position={[0, 0.1, -0.65]} color="#c6ba8e" />
        <BreathingOrb position={[0.72, -0.12, -0.72]} color="#f6f4ee" />
        <group scale={[2.2, 1.42, 1]}>
          <ShaderPlane position={[-0.42, 0.2, 0]} color1="#c6ba8e" color2="#f6f4ee" />
        </group>
        <group scale={[1.92, 1.24, 1]}>
          <ShaderPlane position={[0.68, -0.18, -0.16]} color1="#6f684f" color2="#f6f4ee" />
        </group>
        <EnergyRing radius={1.34} position={[0, -0.02, -0.1]} />
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(198,186,142,0.18)_0%,rgba(246,244,238,0.04)_28%,rgba(11,11,10,0.14)_48%,#0b0b0a_82%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
    </div>
  )
}
