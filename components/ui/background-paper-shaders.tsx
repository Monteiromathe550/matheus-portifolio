"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

const vertexShader = `
  uniform float time;
  uniform float intensity;
  varying vec2 vUv;
  varying vec3 vPosition;

  void main() {
    vUv = uv;
    vPosition = position;

    vec3 pos = position;
    pos.y += sin(pos.x * 10.0 + time) * 0.1 * intensity;
    pos.x += cos(pos.y * 8.0 + time * 1.5) * 0.05 * intensity;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const fragmentShader = `
  uniform float time;
  uniform float intensity;
  uniform vec3 color1;
  uniform vec3 color2;
  varying vec2 vUv;
  varying vec3 vPosition;

  void main() {
    vec2 uv = vUv;

    uv.x += sin(time * 0.38 + uv.y * 5.0) * 0.08;
    uv.y += cos(time * 0.34 + uv.x * 4.0) * 0.06;

    float noise = sin(uv.x * 14.0 + time * 1.8) * cos(uv.y * 11.0 + time * 1.25);
    noise += sin(uv.x * 25.0 - time * 2.8) * cos(uv.y * 18.0 + time * 1.85) * 0.55;

    float pattern = noise * 0.5 + 0.5;
    vec3 color = mix(color1, color2, pattern);
    color = mix(color, vec3(1.0), pow(abs(noise), 2.0) * intensity * 0.45);

    float glow = 1.0 - length(uv - 0.5) * 1.45;
    glow = clamp(glow, 0.0, 1.0);
    glow = 0.2 + pow(glow, 1.35) * 0.8;
    glow *= 0.82 + sin(time * 1.15 + uv.x * 3.0) * 0.18;

    gl_FragColor = vec4(color * glow, glow * 0.72);
  }
`

export function ShaderPlane({
  position,
  color1 = "#ff5722",
  color2 = "#ffffff",
}: {
  position: [number, number, number]
  color1?: string
  color2?: string
}) {
  const mesh = useRef<THREE.Mesh>(null)

  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      intensity: { value: 1.0 },
      color1: { value: new THREE.Color(color1) },
      color2: { value: new THREE.Color(color2) },
    }),
    [color1, color2],
  )

  useFrame((state) => {
    if (mesh.current) {
      const time = state.clock.elapsedTime
      uniforms.time.value = time
      uniforms.intensity.value = 1.18 + Math.sin(time * 1.4) * 0.42
      mesh.current.rotation.z = Math.sin(time * 0.42 + position[0]) * 0.075
      mesh.current.position.x = position[0] + Math.sin(time * 0.34 + position[1]) * 0.16
      mesh.current.position.y = position[1] + Math.cos(time * 0.31 + position[0]) * 0.1
      mesh.current.scale.setScalar(1.04 + Math.sin(time * 0.58 + position[1]) * 0.08)
    }
  })

  return (
    <mesh ref={mesh} position={position}>
      <planeGeometry args={[2, 2, 32, 32]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

export function EnergyRing({
  radius = 1,
  position = [0, 0, 0],
}: {
  radius?: number
  position?: [number, number, number]
}) {
  const mesh = useRef<THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>>(null)

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.z = state.clock.elapsedTime
      mesh.current.material.opacity = 0.5 + Math.sin(state.clock.elapsedTime * 3) * 0.3
    }
  })

  return (
    <mesh ref={mesh} position={position}>
      <ringGeometry args={[radius * 0.8, radius, 32]} />
      <meshBasicMaterial color="#c6ba8e" transparent opacity={0.6} side={THREE.DoubleSide} />
    </mesh>
  )
}

export function BreathingOrb({
  position = [0, 0, -0.25],
  color = "#c6ba8e",
}: {
  position?: [number, number, number]
  color?: string
}) {
  const mesh = useRef<THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>>(null)

  useFrame((state) => {
    if (mesh.current) {
      const time = state.clock.elapsedTime
      mesh.current.position.x = position[0] + Math.sin(time * 0.5) * 0.42
      mesh.current.position.y = position[1] + Math.cos(time * 0.42) * 0.2
      mesh.current.scale.set(
        1.18 + Math.sin(time * 0.85) * 0.16,
        0.62 + Math.cos(time * 0.72) * 0.1,
        1,
      )
      mesh.current.rotation.z = Math.sin(time * 0.35) * 0.18
      mesh.current.material.opacity = 0.18 + Math.sin(time * 1.1) * 0.08
    }
  })

  return (
    <mesh ref={mesh} position={position}>
      <circleGeometry args={[1.65, 96]} />
      <meshBasicMaterial color={color} transparent opacity={0.22} blending={THREE.AdditiveBlending} depthWrite={false} />
    </mesh>
  )
}
