"use client"

export function HeroShaderBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="paper-shader-field" />
      <div className="hero-smoke hero-smoke-primary" />
      <div className="hero-smoke hero-smoke-secondary" />
      <div className="hero-smoke hero-smoke-tertiary" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(198,186,142,0.18)_0%,rgba(246,244,238,0.04)_28%,rgba(11,11,10,0.14)_48%,#0b0b0a_82%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
    </div>
  )
}
