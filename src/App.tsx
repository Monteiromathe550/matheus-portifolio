import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent as ReactKeyboardEvent } from "react"
import { useForm, ValidationError } from "@formspree/react"
import { ArrowDown, Check, ExternalLink, Menu, MessageCircle, Send, X } from "lucide-react"
import { HeroShaderBackground } from "@/components/ui/hero-shader-background"

import archstudioImage from "../assets/archstudio.jpg"
import importBrzImage from "../assets/import-brz.jpg"
import renovaImage from "../assets/renova-aesthetics.jpg"

type Project = {
  title: string
  category: string
  tags: string[]
  image: string
  liveUrl: string
  summary: string
  challenge: string
  result: string
}

const projects: Project[] = [
  {
    title: "Import BRZ Global",
    category: "E-commerce / Cosméticos importados",
    tags: ["E-commerce", "Cosméticos"],
    image: importBrzImage,
    liveUrl: "https://solange-cosm-ticos-main.vercel.app/",
    summary: "E-commerce de cosméticos importados com direção visual premium, vitrine clara e foco na experiência de compra.",
    challenge: "Apresentar cosméticos importados com uma vitrine elegante, clara e preparada para compra.",
    result: "Uma narrativa visual mais premium, produtos em destaque e uma experiência direta para escolher kits e cosméticos.",
  },
  {
    title: "ArchStudio",
    category: "Arquitetura / Portfolio",
    tags: ["Portfolio", "Arquitetura"],
    image: archstudioImage,
    liveUrl: "https://site-arquitetura-psi.vercel.app/",
    summary: "Site para arquiteto apresentar seus trabalhos com estética premium, navegação objetiva e foco no portfólio.",
    challenge: "Criar uma presença digital para arquitetos apresentarem seus trabalhos com impacto visual e leitura profissional.",
    result: "Portfolio com presença sofisticada, projetos em destaque e narrativa clara para apresentar o trabalho do arquiteto.",
  },
  {
    title: "Renova Aesthetics",
    category: "Clínica estética / Portfolio",
    tags: ["Clínica", "Portfolio"],
    image: renovaImage,
    liveUrl: "https://renova-aesthetics.vercel.app/",
    summary: "Site para clínica de estética apresentar trabalhos, procedimentos e posicionamento premium com foco em agendamento.",
    challenge: "Apresentar uma clínica de estética com confiança, sofisticação e espaço para mostrar trabalhos e procedimentos.",
    result: "Site institucional refinado, com apresentação clara dos serviços e caminho direto para agendamento.",
  },
]

const specialties = [
  ["Web Design", "Sites institucionais e landing pages com hierarquia forte, copy objetiva e acabamento visual de marca premium."],
  ["UX/UI Design", "Fluxos, telas e decisões de produto desenhados para reduzir dúvida, aumentar confiança e guiar ação."],
  ["Design Branding", "Direção visual para marcas digitais, com identidade consistente, presença premium e comunicação memorável."],
]

const processSteps = [
  ["01", "Diagnóstico", "Entendo objetivo, público, referência visual e o que precisa converter para definir a direção certa."],
  ["02", "Direção", "Transformo o briefing em estrutura, hierarquia, estilo visual e primeira rota de experiência."],
  ["03", "Interface", "Desenho telas com atenção a ritmo, responsividade, clareza de ação e detalhes de acabamento."],
  ["04", "Entrega", "Organizo próximos passos, ajustes finais e arquivos ou publicação para a presença digital ficar pronta."],
]

const navItems = [
  { id: "inicio", label: "Início" },
  { id: "sobre", label: "Sobre" },
  { id: "projetos", label: "Projetos" },
  { id: "servicos", label: "Serviços" },
  { id: "contato", label: "Contato" },
]

const whatsappUrl = "https://wa.me/5548984380803?text=Ol%C3%A1%2C%20Matheus!%20Vim%20pelo%20site%20e%20quero%20falar%20sobre%20um%20projeto."

function keepLastWordsTogether(text: string) {
  return text.replace(/\s+([^\s]+)$/, "\u00a0$1")
}

function revealStyle(index: number) {
  return { "--reveal-index": String(index) } as CSSProperties
}

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value))
}

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - clamp(value), 3)
}

function useMotionReveals() {
  useEffect(() => {
    const revealElements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"))

    if (!revealElements.length) return

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

    const markVisible = (element: HTMLElement) => {
      element.dataset.revealVisible = "true"
    }

    if (reducedMotion.matches || !("IntersectionObserver" in window)) {
      revealElements.forEach(markVisible)
      return
    }

    document.documentElement.classList.add("motion-ready")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          markVisible(entry.target as HTMLElement)
          observer.unobserve(entry.target)
        })
      },
      {
        rootMargin: "0px 0px -14% 0px",
        threshold: 0.16,
      },
    )

    revealElements.forEach((element) => observer.observe(element))

    return () => {
      observer.disconnect()
      document.documentElement.classList.remove("motion-ready")
    }
  }, [])
}

function ScrollRevealText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const words = text.split(" ")
  const mainWords = words.slice(0, -2)
  const tailWords = words.slice(-2)

  const renderRevealWord = (word: string, index: number, isLast = false) => (
    <span
      key={`${word}-${index}`}
      className="about-reveal-word"
      style={{ opacity: 0.3, transform: "translateY(10px)" } as CSSProperties}
    >
      {word}
      {isLast ? "" : " "}
    </span>
  )

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const wordNodes = () => ref.current?.querySelectorAll<HTMLElement>(".about-reveal-word") ?? []
    let animationFrame = 0

    const update = () => {
      animationFrame = 0
      if (!ref.current) return

      const viewport = window.innerHeight || 1
      const rect = ref.current.getBoundingClientRect()
      const start = viewport * 0.82
      const end = viewport * 0.26
      const nextProgress = clamp((start - rect.top) / (start - end))
      const revealProgress = 0.5 - Math.cos(nextProgress * Math.PI) / 2

      wordNodes().forEach((word, index) => {
        const wordStart = index / (words.length + 6)
        const wordProgress = easeOutCubic((revealProgress - wordStart) / 0.18)
        word.style.opacity = String(0.3 + wordProgress * 0.7)
        word.style.transform = motionQuery.matches ? "none" : `translateY(${(1 - wordProgress) * 10}px)`
      })
    }

    const requestUpdate = () => {
      if (animationFrame) return
      animationFrame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", requestUpdate, { passive: true })
    window.addEventListener("resize", requestUpdate)
    if (typeof motionQuery.addEventListener === "function") {
      motionQuery.addEventListener("change", requestUpdate)
    } else if (typeof motionQuery.addListener === "function") {
      motionQuery.addListener(requestUpdate)
    }

    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame)
      window.removeEventListener("scroll", requestUpdate)
      window.removeEventListener("resize", requestUpdate)
      if (typeof motionQuery.removeEventListener === "function") {
        motionQuery.removeEventListener("change", requestUpdate)
      } else if (typeof motionQuery.removeListener === "function") {
        motionQuery.removeListener(requestUpdate)
      }
    }
  }, [words.length])

  return (
    <p ref={ref} className="text-3xl font-medium leading-tight text-primary md:text-5xl lg:col-span-6" aria-label={text}>
      {mainWords.map((word, index) => renderRevealWord(word, index))}
      <span className="about-reveal-tail">
        {tailWords.map((word, index) => renderRevealWord(word, mainWords.length + index, index === tailWords.length - 1))}
      </span>
    </p>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("inicio")
  const [navProgress, setNavProgress] = useState(0)
  const mobileMenuId = useId()

  useEffect(() => {
    let animationFrame = 0

    const updateNavState = () => {
      animationFrame = 0
      const scrollY = window.scrollY || document.documentElement.scrollTop
      const viewportAnchor = window.innerHeight * 0.36
      let current = "inicio"

      navItems.forEach((item) => {
        const section = document.getElementById(item.id)
        if (!section) return

        const rect = section.getBoundingClientRect()
        if (rect.top - viewportAnchor <= 0 && rect.bottom - viewportAnchor > 0) {
          current = item.id
        }
      })

      setActiveSection(current)
      setNavProgress(Math.round(clamp(scrollY / 120) * 1000) / 1000)
    }

    const requestUpdate = () => {
      if (animationFrame) return
      animationFrame = window.requestAnimationFrame(updateNavState)
    }

    updateNavState()
    window.addEventListener("scroll", requestUpdate, { passive: true })
    window.addEventListener("resize", requestUpdate)

    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame)
      window.removeEventListener("scroll", requestUpdate)
      window.removeEventListener("resize", requestUpdate)
    }
  }, [])

  useEffect(() => {
    if (!open) return

    const closeMenu = () => setOpen(false)
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu()
    }

    window.addEventListener("hashchange", closeMenu)
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("hashchange", closeMenu)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [open])

  const easedNavProgress = easeOutCubic(navProgress)
  const navStyle = {
    maxWidth: `calc(1040px - ${easedNavProgress * 180}px)`,
    padding: `${12 - easedNavProgress * 4}px ${20 - easedNavProgress * 4}px`,
    backgroundColor: `oklch(0.055 0.004 95 / ${0.58 + easedNavProgress * 0.24})`,
    boxShadow: `0 ${18 + easedNavProgress * 4}px ${60 + easedNavProgress * 12}px rgb(0 0 0 / ${0.22 + easedNavProgress * 0.08})`,
    transform: `translate3d(0, ${easedNavProgress * -2}px, 0)`,
    "--nav-progress": String(easedNavProgress),
  } as CSSProperties & Record<string, string>

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 py-4 md:px-8 md:py-6">
      <div
        className={[
          "site-nav-shell pointer-events-auto mx-auto flex items-center justify-between border border-border/80 backdrop-blur-xl",
        ].join(" ")}
        style={navStyle}
      >
        <a
          href="#inicio"
          className="site-mark grid h-11 w-11 place-items-center border border-border text-base font-semibold tracking-tight transition-colors hover:border-primary/50"
          aria-label="Matheus Monteiro, voltar ao início"
        >
          MM
        </a>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Navegação principal">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={activeSection === item.id ? "page" : undefined}
              className={[
                "site-nav-link relative px-4 py-3 text-[11px] font-semibold uppercase transition-colors duration-500",
                activeSection === item.id ? "text-primary" : "text-muted-foreground hover:text-primary",
              ].join(" ")}
            >
              <span
                className={[
                  "absolute inset-x-3 bottom-2 h-px origin-left bg-secondary transition-transform duration-500 ease-out",
                  activeSection === item.id ? "scale-x-100" : "scale-x-0",
                ].join(" ")}
              />
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Falar no WhatsApp com Matheus Monteiro"
          className="site-cta hidden min-h-10 items-center justify-center gap-2 border border-primary/80 bg-primary px-3 text-[10px] font-semibold uppercase text-primary-foreground transition-colors duration-300 hover:bg-transparent hover:text-primary md:inline-flex"
        >
          Vamos criar <MessageCircle size={13} />
        </a>
        <button
          className="grid h-11 w-11 place-items-center border border-border md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls={mobileMenuId}
        >
          {open ? <X size={18} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <nav id={mobileMenuId} className="mobile-menu-panel pointer-events-auto mx-auto mt-3 grid max-w-[1040px] gap-2 border border-border bg-background/88 p-3 backdrop-blur-xl md:hidden">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setOpen(false)}
              className={[
                "mobile-nav-link flex min-h-11 items-center px-3 text-xs font-semibold uppercase transition-colors duration-300",
                activeSection === item.id ? "bg-primary text-primary-foreground" : "text-muted-foreground",
              ].join(" ")}
            >
              {item.label}
            </a>
          ))}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
            aria-label="Falar no WhatsApp com Matheus Monteiro"
            className="mobile-nav-link flex min-h-11 items-center gap-2 bg-primary px-3 text-xs font-semibold uppercase text-primary-foreground transition-colors duration-300 hover:bg-transparent hover:text-primary"
          >
            Vamos criar algo <MessageCircle size={14} />
          </a>
        </nav>
      )}
    </header>
  )
}

function Hero() {
  return (
    <section id="inicio" className="relative grid min-h-[100svh] place-items-center overflow-hidden px-5 pb-24 pt-32 sm:px-6 md:px-20 md:pt-40">
      <HeroShaderBackground />
      <div className="relative z-10 mx-auto mt-6 flex w-full max-w-5xl flex-col items-center text-center md:mt-8">
        <p className="hero-kicker mb-6 text-xs font-semibold uppercase text-muted-foreground">Matheus Monteiro</p>
        <h1 className="hero-title mb-8 w-full max-w-[920px] text-[clamp(2.45rem,10.6vw,5.2rem)] font-normal leading-[0.98] tracking-normal text-primary" aria-label="Web Designer e UX/UI Designer">
          <span className="hero-title-line block">Web Designer</span>
          <span className="hero-title-line block font-sans text-primary/75">
            <span className="text-secondary">&amp;</span> UX/UI Designer
          </span>
        </h1>
        <p className="hero-copy max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
          {keepLastWordsTogether("Criação de interfaces, sites e experiências digitais pensadas para unir estética, usabilidade e conversão. Minimalismo com propósito.")}
        </p>
        <a href="#projetos" className="hero-cta mt-12 inline-flex items-center gap-4 text-xs font-semibold uppercase text-muted-foreground transition-colors duration-500 hover:text-primary">
          <span className="hero-cta-icon grid h-12 w-12 place-items-center border border-border">
            <ArrowDown size={17} />
          </span>
          Ver projetos
        </a>
      </div>
    </section>
  )
}

function Projects() {
  const [active, setActive] = useState<Project | null>(null)

  return (
    <section id="projetos" className="mx-auto max-w-[1440px] px-6 py-24 md:px-20">
      <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div data-reveal="heading">
          <h2 className="text-4xl font-medium text-primary md:text-5xl">Projetos selecionados</h2>
          <p className="mt-3 text-xs font-semibold uppercase text-muted-foreground">Trabalhos recentes</p>
        </div>
        <a href="#contato" className="section-action inline-flex items-center gap-2 text-xs font-semibold uppercase text-primary" data-reveal="heading" style={revealStyle(1)}>
          Falar sobre projeto <ExternalLink size={14} />
        </a>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {projects.map((project, index) => (
          <button
            key={project.title}
            className="project-card group border border-border bg-card text-left transition-[border-color,transform,background-color] duration-500 ease-out hover:-translate-y-0.5 hover:border-primary/35 hover:bg-card/90"
            onClick={() => setActive(project)}
            aria-label={`Abrir preview do projeto ${project.title}`}
            data-reveal="card"
            style={revealStyle(index)}
          >
            <div className="relative aspect-[4/3] overflow-hidden border-b border-border">
              <img src={project.image} alt={`Preview visual do projeto ${project.title}`} loading="lazy" decoding="async" className="h-full w-full object-cover opacity-80 grayscale transition-[filter,opacity] duration-700 ease-out group-hover:opacity-95 group-hover:grayscale-0" />
              <span className="project-index absolute left-5 top-5 text-xs font-semibold text-primary/70">{String(index + 1).padStart(2, "0")}</span>
            </div>
            <div className="p-6">
              <div className="project-tags mb-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="border border-border px-2 py-1 text-[10px] font-semibold uppercase text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="mb-4 text-2xl font-medium text-primary">{project.title}</h3>
              <p className="text-sm leading-6 text-muted-foreground">{keepLastWordsTogether(project.summary)}</p>
            </div>
          </button>
        ))}
      </div>
      {active && <ProjectDialog project={active} onClose={() => setActive(null)} />}
    </section>
  )
}

function ProjectDialog({ project, onClose }: { project: Project; onClose: () => void }) {
  const titleId = useId()
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const previousActiveElement = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = "hidden"
    closeButtonRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      previousActiveElement?.focus()
    }
  }, [])

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault()
      onClose()
      return
    }

    if (event.key !== "Tab" || !dialogRef.current) return

    const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
    )
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    if (!firstElement || !lastElement) return

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault()
      lastElement.focus()
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault()
      firstElement.focus()
    }
  }

  return (
    <div
      ref={dialogRef}
      className="project-dialog-backdrop fixed inset-0 z-[80] overflow-y-auto bg-background/92 px-6 py-6 backdrop-blur-md md:px-10"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onKeyDown={handleKeyDown}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="project-dialog-panel mx-auto max-w-[1280px] border border-border bg-background">
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <p className="text-xs font-semibold uppercase text-muted-foreground">Preview do projeto</p>
          <button ref={closeButtonRef} className="grid h-11 w-11 place-items-center border border-border text-primary" onClick={onClose} aria-label="Fechar preview">
            <X size={18} />
          </button>
        </div>
        <div className="grid lg:grid-cols-[1.35fr_0.65fr]">
          <div className="border-b border-border p-4 lg:border-b-0 lg:border-r md:p-6">
            <div className="relative aspect-video overflow-hidden border border-border bg-card">
              <div className="absolute inset-x-0 top-0 z-10 flex h-10 items-center justify-between border-b border-border bg-background/80 px-4 text-[10px] font-semibold uppercase text-muted-foreground backdrop-blur">
                <span>Preview visual</span>
                <span>{project.category}</span>
              </div>
              <img src={project.image} alt={`Preview visual do projeto ${project.title}`} decoding="async" className="h-full w-full object-cover" />
            </div>
          </div>
          <div className="flex min-h-[420px] flex-col p-6 md:p-8">
            <p className="mb-4 text-xs font-semibold uppercase text-muted-foreground">{project.category}</p>
            <h2 id={titleId} className="mb-6 text-3xl font-medium leading-tight text-primary md:text-4xl">{project.title}</h2>
            <p className="mb-8 text-base leading-7 text-muted-foreground">{keepLastWordsTogether(project.summary)}</p>
            <div className="mb-8 space-y-6 border-y border-border py-6">
              <div>
                <p className="mb-2 text-[10px] font-semibold uppercase text-muted-foreground">Desafio</p>
                <p className="text-sm leading-6 text-muted-foreground">{keepLastWordsTogether(project.challenge)}</p>
              </div>
              <div>
                <p className="mb-2 text-[10px] font-semibold uppercase text-muted-foreground">Resultado</p>
                <p className="text-sm leading-6 text-muted-foreground">{keepLastWordsTogether(project.result)}</p>
              </div>
            </div>
            <div className="mt-auto flex flex-col gap-3 sm:flex-row">
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 border border-primary bg-primary px-5 text-xs font-semibold uppercase text-primary-foreground hover:bg-transparent hover:text-primary">
                Abrir projeto <ExternalLink size={14} />
              </a>
              <button className="inline-flex min-h-12 items-center justify-center border border-border px-5 text-xs font-semibold uppercase text-primary hover:border-primary" onClick={onClose}>
                Voltar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function About() {
  return (
    <section id="sobre" className="mx-auto max-w-[1440px] px-6 py-20 md:px-20">
      <div className="about-panel grid gap-10 border-y border-border py-16 lg:grid-cols-12" data-reveal="line">
        <p className="text-xs font-semibold uppercase text-muted-foreground lg:col-span-3">Sobre</p>
        <ScrollRevealText text="Desenho páginas e produtos digitais com direção visual precisa, estrutura clara e atenção aos detalhes que fazem a interface parecer inevitável." />
        <div className="space-y-6 text-base leading-7 text-muted-foreground lg:col-span-3">
          <p>{keepLastWordsTogether("Atuo nos pontos onde marca, produto e conversão precisam falar a mesma língua.")}</p>
          <p>{keepLastWordsTogether("O resultado é uma presença digital com hierarquia, acabamento e intenção.")}</p>
        </div>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section id="servicos" className="mx-auto max-w-[1440px] px-6 py-24 md:px-20">
      <h2 className="mb-12 text-4xl font-medium text-primary md:text-5xl" data-reveal="heading">Especialidades</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {specialties.map(([title, text], index) => (
          <div key={title} className="service-card border border-border bg-card p-7" data-reveal="card" style={revealStyle(index)}>
            <p className="service-number mb-10 text-xs font-semibold text-muted-foreground">{String(index + 1).padStart(2, "0")}</p>
            <h3 className="mb-5 text-2xl font-medium text-primary">{title}</h3>
            <p className="text-sm leading-6 text-muted-foreground">{keepLastWordsTogether(text)}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Process() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-10 md:px-20 md:py-16" aria-labelledby="process-title">
      <div className="grid gap-10 border-y border-border py-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
        <div data-reveal="heading">
          <p className="mb-5 text-xs font-semibold uppercase text-muted-foreground">Processo</p>
          <h2 id="process-title" className="max-w-md text-4xl font-medium leading-tight text-primary md:text-5xl">Clareza antes de construir</h2>
        </div>
        <div className="process-list divide-y divide-border" data-reveal="timeline">
          {processSteps.map(([number, title, text]) => (
            <div key={title} className="process-step grid gap-4 py-6 first:pt-0 last:pb-0 sm:grid-cols-[4rem_0.72fr_1.28fr] sm:items-start" data-reveal="process-step" style={revealStyle(Number(number) - 1)}>
              <p className="process-number text-xs font-semibold text-secondary">{number}</p>
              <h3 className="text-xl font-medium text-primary">{title}</h3>
              <p className="max-w-xl text-sm leading-6 text-muted-foreground">{keepLastWordsTogether(text)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [state, handleSubmit] = useForm("mbdbpdlb")

  return (
    <section id="contato" className="mx-auto max-w-[1440px] px-6 py-24 md:px-20">
      <div className="grid gap-12 border-t border-border pt-16 lg:grid-cols-[0.82fr_1fr] lg:gap-20">
        <div data-reveal="heading">
          <p className="mb-5 text-xs font-semibold uppercase text-muted-foreground">Contato</p>
          <h2 className="mb-7 text-4xl font-medium leading-tight text-primary md:text-5xl">Iniciar projeto</h2>
          <p className="max-w-md text-base leading-7 text-muted-foreground">
            {keepLastWordsTogether("Conte o que você quer construir. Eu retorno com próximos passos, escopo inicial e uma direção clara para começarmos sem chute de preço.")}
          </p>
          <p className="mt-5 max-w-md text-sm leading-6 text-muted-foreground">
            {keepLastWordsTogether("O orçamento previsto ajuda a ajustar profundidade, prazo e prioridade desde a primeira resposta.")}
          </p>
          <div className="contact-channels mt-9" aria-label="Canais de contato">
            <a href="mailto:matheusapm550@gmail.com" className="contact-channel group">
              <span className="contact-channel-copy">
                <span className="contact-channel-label">E-mail</span>
                <span className="contact-channel-value">matheusapm550@gmail.com</span>
              </span>
              <span className="contact-channel-action" aria-hidden="true">
                <span>Escrever</span>
                <ExternalLink className="contact-channel-icon" size={13} />
              </span>
            </a>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="contact-channel group" aria-label="Falar no WhatsApp com Matheus Monteiro">
              <span className="contact-channel-copy">
                <span className="contact-channel-label">WhatsApp</span>
                <span className="contact-channel-value">+55 48 98438-0803</span>
              </span>
              <span className="contact-channel-action" aria-hidden="true">
                <span>Chamar</span>
                <MessageCircle className="contact-channel-icon" size={14} />
              </span>
            </a>
            <a className="contact-social-link" href="https://www.linkedin.com/in/monteiro00/" target="_blank" rel="noreferrer">
              Ver LinkedIn <ExternalLink size={12} />
            </a>
          </div>
        </div>
        <form className="contact-form grid gap-8" onSubmit={handleSubmit} aria-busy={state.submitting} data-reveal="form">
          <input type="hidden" name="_subject" value="Novo briefing pelo site Matheus Monteiro" />
          <div className="grid gap-6 md:grid-cols-2">
            <label className="group grid gap-3">
              <span className="text-[10px] font-semibold uppercase text-muted-foreground transition-colors group-focus-within:text-primary">Nome</span>
              <input
                id="name"
                className="min-h-12 border-0 border-b border-border bg-transparent px-0 text-base text-primary outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary"
                name="name"
                type="text"
                placeholder="Seu nome"
                required
              />
              <ValidationError className="text-xs leading-5 text-destructive" prefix="Nome" field="name" errors={state.errors} />
            </label>
            <label className="group grid gap-3">
              <span className="text-[10px] font-semibold uppercase text-muted-foreground transition-colors group-focus-within:text-primary">E-mail</span>
              <input
                id="email"
                className="min-h-12 border-0 border-b border-border bg-transparent px-0 text-base text-primary outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary"
                name="email"
                type="email"
                placeholder="voce@email.com"
                required
              />
              <ValidationError className="text-xs leading-5 text-destructive" prefix="E-mail" field="email" errors={state.errors} />
            </label>
          </div>
          <label className="group grid gap-3">
            <span className="text-[10px] font-semibold uppercase text-muted-foreground transition-colors group-focus-within:text-primary">Tipo de projeto</span>
            <select
              id="projectType"
              className="min-h-12 border-0 border-b border-border bg-background px-0 text-base text-primary outline-none transition-colors focus:border-primary"
              name="projectType"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Selecione uma opção
              </option>
              <option>Site institucional</option>
              <option>Landing page</option>
              <option>E-commerce</option>
              <option>UX/UI de produto</option>
              <option>Branding digital</option>
            </select>
            <ValidationError className="text-xs leading-5 text-destructive" prefix="Tipo de projeto" field="projectType" errors={state.errors} />
          </label>
          <label className="group grid gap-3">
            <span className="text-[10px] font-semibold uppercase text-muted-foreground transition-colors group-focus-within:text-primary">Orçamento previsto</span>
            <select
              id="budget"
              className="min-h-12 border-0 border-b border-border bg-background px-0 text-base text-primary outline-none transition-colors focus:border-primary"
              name="budget"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Selecione uma faixa
              </option>
              <option>Até R$ 1.500</option>
              <option>R$ 1.500 a R$ 3.000</option>
              <option>R$ 3.000 a R$ 6.000</option>
              <option>R$ 6.000 a R$ 10.000</option>
              <option>Acima de R$ 10.000</option>
              <option>Ainda quero entender o investimento</option>
            </select>
            <ValidationError className="text-xs leading-5 text-destructive" prefix="Orçamento" field="budget" errors={state.errors} />
          </label>
          <label className="group grid gap-3">
            <span className="text-[10px] font-semibold uppercase text-muted-foreground transition-colors group-focus-within:text-primary">Mensagem</span>
            <textarea
              id="message"
              className="min-h-36 resize-none border-0 border-b border-border bg-transparent px-0 py-3 text-base leading-7 text-primary outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary"
              name="message"
              placeholder="Fale sobre objetivo, prazo e o que precisa ficar pronto."
              required
            />
            <ValidationError className="text-xs leading-5 text-destructive" prefix="Mensagem" field="message" errors={state.errors} />
          </label>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <button
              className="inline-flex min-h-12 items-center justify-center gap-3 border border-primary bg-primary px-6 text-xs font-semibold uppercase text-primary-foreground transition-colors hover:bg-transparent hover:text-primary disabled:cursor-not-allowed disabled:opacity-55 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ring"
              type="submit"
              disabled={state.submitting}
            >
              {state.submitting ? "Enviando" : "Enviar briefing"} <Send size={15} />
            </button>
            <p className="min-h-6 text-sm leading-5 text-muted-foreground" aria-live="polite" role="status">
              {state.succeeded ? (
                <span className="inline-flex items-center gap-2 text-primary sm:max-w-md">
                  <Check size={14} /> Briefing recebido. Retorno com o melhor caminho em até 1 dia útil.
                </span>
              ) : (
                "Resposta em até 1 dia útil"
              )}
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}

export default function App() {
  useMotionReveals()

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-primary">
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Services />
        <Process />
        <Contact />
      </main>
      <footer className="border-t border-border px-6 py-10 text-xs font-semibold uppercase text-muted-foreground md:px-20">
        Matheus Monteiro. Todos os direitos reservados.
      </footer>
    </div>
  )
}
