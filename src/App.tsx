import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent as ReactKeyboardEvent } from "react"
import { useForm, ValidationError } from "@formspree/react"
import { ArrowDown, Check, ExternalLink, Menu, MessageCircle, Send, X } from "lucide-react"
import { HeroShaderBackground } from "@/components/ui/hero-shader-background"

import smartLivingImage from "../assets/smart-living.png"
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
    summary: "Vitrine para cosméticos importados com categorias claras, produto em primeiro plano e caminho direto para compra.",
    challenge: "Organizar uma oferta variada sem deixar preço, benefício e navegação competindo pela atenção.",
    result: "Categorias mais fáceis de comparar, páginas com presença visual e menos atrito até o contato de compra.",
  },
  {
    title: "Smart Living",
    category: "E-commerce / Home",
    tags: ["E-commerce", "Smart Home", "Organização"],
    image: smartLivingImage,
    liveUrl: "https://smartlivinguk.store/",
    summary: "E-commerce focado em produtos inteligentes e práticos para organização e otimização do lar.",
    challenge: "Apresentar itens do dia a dia com apelo visual premium, transmitindo facilidade e beleza sem complicação.",
    result: "Uma experiência de compra fluida que reflete a essência da marca: uma casa mais inteligente e organizada.",
  },
  {
    title: "Renova Aesthetics",
    category: "Clínica estética / Portfolio",
    tags: ["Clínica", "Portfolio"],
    image: renovaImage,
    liveUrl: "https://renova-aesthetics.vercel.app/",
    summary: "Site para clínica estética com serviços organizados, prova visual e chamada direta para agendamento.",
    challenge: "Comunicar cuidado e confiança sem deixar procedimentos, resultados e contato disputando atenção.",
    result: "Serviços mais fáceis de entender, hierarquia mais calma e um caminho de agendamento mais evidente.",
  },
]

const specialties = [
  ["Web design", "Sites sob medida com hierarquia clara, visual premium e caminho direto para a ação principal."],
  ["UX/UI de produto", "Fluxos, telas e decisões de interface para reduzir dúvida e deixar a experiência mais fácil de usar."],
  ["Front-end e publicação", "Interface codificada com responsividade, estados, performance e acabamento pronto para colocar no ar."],
]

const processSteps = [
  ["01", "Diagnóstico", "Defino objetivo, público e a ação principal que a página precisa facilitar."],
  ["02", "Direção", "Organizo conteúdo, hierarquia e referências para a tela nascer com uma lógica clara."],
  ["03", "Interface", "Desenho as telas e codifico estados, responsividade e movimento com acabamento."],
  ["04", "Entrega", "Ajusto detalhes, publico ou preparo os arquivos finais e deixo os próximos passos claros."],
]

const projectTypeOptions = ["Site institucional", "Landing page", "E-commerce", "UX/UI de produto", "Branding digital"]

const budgetOptions = ["Até R$ 1.500", "R$ 1.500 a R$ 3.000", "R$ 3.000 a R$ 6.000", "R$ 6.000 a R$ 10.000", "Acima de R$ 10.000"]

const navItems = [
  { id: "inicio", label: "Início" },
  { id: "sobre", label: "Sobre" },
  { id: "projetos", label: "Projetos" },
  { id: "servicos", label: "Serviços" },
  { id: "processo", label: "Processo" },
  { id: "contato", label: "Contato" },
]

const whatsappUrl = "https://wa.me/5548984380803?text=Ol%C3%A1%2C%20Matheus!%20Vim%20pelo%20site%20e%20quero%20falar%20sobre%20um%20projeto."

const fieldHelp = {
  name: "Use o nome que devo usar na resposta.",
  email: "Vou usar este e-mail para retornar com próximos passos.",
  projectType: "Escolha a opção mais próxima. Se tiver dúvida, selecione UX/UI de produto ou site institucional.",
  budget: "Pode ser uma estimativa. Ela só ajuda a ajustar profundidade e prazo.",
  message: "Inclua objetivo, prazo ideal e o que precisa ficar pronto primeiro.",
}

function keepLastWordsTogether(text: string) {
  return text.replace(/\s+([^\s]+)$/, "\u00a0$1")
}

function revealStyle(index: number) {
  return { "--reveal-index": String(index) } as CSSProperties
}

type StackStyle = CSSProperties & Record<"--reveal-index" | "--stack-index" | "--stack-offset" | "--stack-offset-mobile", string>

function stackStyle(index: number, desktopStep: number, mobileStep: number): StackStyle {
  return {
    "--reveal-index": String(index),
    "--stack-index": String(index),
    "--stack-offset": `${index * desktopStep}rem`,
    "--stack-offset-mobile": `${index * mobileStep}rem`,
  }
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

function useStackScrollMotion() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const stackCards = Array.from(document.querySelectorAll<HTMLElement>(".stack-card"))

    if (!stackCards.length || reducedMotion.matches) return

    let animationFrame = 0

    const update = () => {
      animationFrame = 0
      const viewport = window.innerHeight || 1

      stackCards.forEach((card) => {
        const rect = card.getBoundingClientRect()
        const enterProgress = clamp((viewport - rect.top) / (viewport * 0.82))
        const exitProgress = clamp(rect.bottom / (viewport * 0.42))
        const presence = Math.min(enterProgress, exitProgress)
        const settledLift = clamp((viewport * 0.18 - rect.top) / (viewport * 0.18))
        const y = (1 - easeOutCubic(presence)) * 24 - settledLift * 5
        const scale = 0.985 + easeOutCubic(presence) * 0.015

        card.style.setProperty("--stack-motion-y", `${Math.round(y * 100) / 100}px`)
        card.style.setProperty("--stack-motion-scale", String(Math.round(scale * 1000) / 1000))
        card.style.setProperty("--stack-motion-presence", String(Math.round(presence * 1000) / 1000))
      })
    }

    const requestUpdate = () => {
      if (animationFrame) return
      animationFrame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", requestUpdate, { passive: true })
    window.addEventListener("resize", requestUpdate)

    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame)
      window.removeEventListener("scroll", requestUpdate)
      window.removeEventListener("resize", requestUpdate)
      stackCards.forEach((card) => {
        card.style.removeProperty("--stack-motion-y")
        card.style.removeProperty("--stack-motion-scale")
        card.style.removeProperty("--stack-motion-presence")
      })
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
    backgroundColor: `oklch(0.055 0.004 95 / ${0.58 + easedNavProgress * 0.24})`,
    boxShadow: `0 ${6 + easedNavProgress * 2}px ${10 + easedNavProgress * 4}px rgb(0 0 0 / ${0.16 + easedNavProgress * 0.04})`,
    transform: `translate3d(0, ${easedNavProgress * -2}px, 0)`,
    "--nav-progress": String(easedNavProgress),
  } as CSSProperties & Record<string, string>

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 py-4 md:px-8 md:py-6">
      <div
        className={[
          "site-nav-shell pointer-events-auto mx-auto flex max-w-[1040px] items-center justify-between border border-border/80 px-4 py-3 backdrop-blur-xl md:px-5",
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
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegação principal">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={activeSection === item.id ? "page" : undefined}
              className={[
                "site-nav-link relative px-4 py-3 text-xs font-semibold uppercase transition-colors duration-500",
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
          rel="noopener noreferrer"
          aria-label="Falar no WhatsApp com Matheus Monteiro"
          className="site-cta hidden min-h-11 items-center justify-center gap-2 border border-primary/80 bg-primary px-3 text-xs font-semibold uppercase text-primary-foreground transition-colors duration-300 hover:bg-transparent hover:text-primary lg:inline-flex"
        >
          Iniciar projeto
        </a>
        <button
          className="grid h-11 w-11 place-items-center border border-border lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls={mobileMenuId}
        >
          {open ? <X size={18} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <nav id={mobileMenuId} className="mobile-menu-panel pointer-events-auto mx-auto mt-3 max-w-[1040px] border border-border bg-background/94 p-3 backdrop-blur-xl lg:hidden" aria-label="Menu mobile">
          <div className="mobile-menu-heading flex items-center justify-between border-b border-border px-2 pb-3">
            <span>Menu</span>
            <span>{navItems.find((item) => item.id === activeSection)?.label ?? "Início"}</span>
          </div>
          <div className="mobile-nav-list grid">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.id

              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={[
                    "mobile-nav-link flex min-h-12 items-center justify-between border-b border-border px-2 text-sm font-semibold transition-colors duration-300",
                    isActive ? "is-active text-primary" : "text-muted-foreground",
                  ].join(" ")}
                >
                  <span>{item.label}</span>
                  <span className="mobile-nav-index">{String(index + 1).padStart(2, "0")}</span>
                </a>
              )
            })}
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            aria-label="Falar no WhatsApp com Matheus Monteiro"
            className="mobile-menu-cta mt-3 flex min-h-12 items-center justify-between border border-primary bg-primary px-3 text-xs font-semibold uppercase text-primary-foreground transition-colors duration-300 hover:bg-transparent hover:text-primary"
          >
            Iniciar projeto
          </a>
        </nav>
      )}
    </header>
  )
}

function Hero() {
  return (
    <section id="inicio" className="relative grid min-h-[100svh] place-items-center overflow-hidden px-5 pb-24 pt-32 sm:px-6 md:px-20 md:pt-40" aria-labelledby="hero-title">
      <HeroShaderBackground />
      <div className="relative z-10 mx-auto mt-6 flex w-full max-w-5xl flex-col items-center text-center md:mt-8">
        <p className="hero-kicker mb-6 text-xs font-semibold uppercase text-muted-foreground">Matheus Monteiro</p>
        <h1 id="hero-title" className="hero-title mb-8 w-full max-w-[920px] text-[clamp(2.45rem,10.6vw,5.2rem)] font-normal leading-[1.08] tracking-normal text-primary" aria-label="Web Designer e UX/UI Designer">
          <span className="hero-title-line block">Web Designer</span>
          <span className="hero-title-line block font-sans text-primary/75">
            <span className="text-secondary">&amp;</span> UX/UI Designer
          </span>
        </h1>
        <p className="hero-copy max-w-xl text-base leading-8 text-muted-foreground md:text-lg">
          {keepLastWordsTogether("Crio, codifico e entrego sites para marcas que precisam explicar valor, provar confiança e levar o visitante ao próximo passo.")}
        </p>
        <a href="#projetos" className="hero-cta mt-12 inline-flex items-center gap-4 text-xs font-semibold uppercase text-muted-foreground transition-colors duration-500 hover:text-primary">
          <span className="hero-cta-icon grid h-12 w-12 place-items-center border border-border">
            <ArrowDown size={17} />
          </span>
          Ver trabalhos
        </a>
      </div>
    </section>
  )
}

function Projects() {
  const [active, setActive] = useState<Project | null>(null)

  return (
    <section id="projetos" className="projects-section section-spacing mx-auto max-w-[1440px] px-6 py-24 md:px-20" aria-labelledby="projects-title">
      <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div className="max-w-2xl" data-reveal="heading">
          <h2 id="projects-title" className="text-4xl font-medium text-primary md:text-5xl">Projetos selecionados</h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Três entregas com problemas diferentes: vender produto, apresentar arquitetura e converter interesse em agendamento.
          </p>
        </div>
        <a href="#contato" className="section-action inline-flex items-center gap-2 text-xs font-semibold uppercase text-primary" data-reveal="heading" style={revealStyle(1)}>
          Falar sobre projeto <ExternalLink size={14} />
        </a>
      </div>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <button
            type="button"
            key={project.title}
            className="project-card stack-card group text-left"
            onClick={() => setActive(project)}
            aria-label={`Abrir preview do projeto ${project.title}`}
            data-reveal="card"
            style={stackStyle(index, 0.9, 0.55)}
          >
            <div className="project-media relative overflow-hidden">
              <img src={project.image} alt={`Preview visual do projeto ${project.title}`} loading="lazy" decoding="async" className="h-full w-full object-cover opacity-90 transition-[filter,opacity] duration-700 ease-out md:opacity-80 md:grayscale md:group-hover:opacity-95 md:group-hover:grayscale-0" />
              <span className="project-index absolute left-5 top-5 text-xs font-semibold text-primary/70">{String(index + 1).padStart(2, "0")}</span>
            </div>
            <div className="project-card-body p-6">
              <div className="project-tags mb-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="border border-border px-2 py-1 text-xs font-semibold uppercase text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="project-card-title mb-4 text-2xl font-medium text-primary">{project.title}</h3>
              <p className="text-sm leading-6 text-muted-foreground">{keepLastWordsTogether(project.summary)}</p>
              <span className="project-card-action mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase text-primary">
                Abrir preview <ExternalLink size={13} />
              </span>
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
          <button ref={closeButtonRef} type="button" className="grid h-11 w-11 place-items-center border border-border text-primary" onClick={onClose} aria-label="Fechar preview">
            <X size={18} />
          </button>
        </div>
        <div className="grid lg:grid-cols-[1.35fr_0.65fr]">
          <div className="border-b border-border p-4 lg:border-b-0 lg:border-r md:p-6">
            <div className="relative aspect-video overflow-hidden border border-border bg-card">
              <div className="absolute inset-x-0 top-0 z-10 flex h-10 items-center justify-between border-b border-border bg-background/80 px-4 text-xs font-semibold uppercase text-muted-foreground backdrop-blur">
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
                <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Desafio</p>
                <p className="text-sm leading-6 text-muted-foreground">{keepLastWordsTogether(project.challenge)}</p>
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Resultado</p>
                <p className="text-sm leading-6 text-muted-foreground">{keepLastWordsTogether(project.result)}</p>
              </div>
            </div>
            <div className="mt-auto flex flex-col gap-3 sm:flex-row">
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 border border-primary bg-primary px-5 text-xs font-semibold uppercase text-primary-foreground hover:bg-transparent hover:text-primary">
                Abrir projeto <ExternalLink size={14} />
              </a>
              <button type="button" className="inline-flex min-h-12 items-center justify-center border border-border px-5 text-xs font-semibold uppercase text-primary hover:border-primary" onClick={onClose}>
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
    <section id="sobre" className="about-section section-spacing mx-auto max-w-[1440px] px-6 py-20 md:px-20" aria-labelledby="about-title">
      <div className="about-panel grid gap-10 py-16 lg:grid-cols-12" data-reveal="line">
        <h2 id="about-title" className="font-sans text-xs font-semibold uppercase text-muted-foreground lg:col-span-3">Sobre</h2>
        <ScrollRevealText text="Desenho e codifico páginas digitais com direção visual precisa, estrutura clara e uma entrega final pronta para usar." />
        <div className="space-y-6 text-base leading-7 text-muted-foreground lg:col-span-3">
          <p>{keepLastWordsTogether("Atuo quando o site precisa vender uma percepção antes de vender uma solução: confiança, clareza e cuidado.")}</p>
          <p>{keepLastWordsTogether("A entrega combina estratégia, interface, front-end e publicação para o projeto não ficar só no design.")}</p>
        </div>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section id="servicos" className="services-section section-spacing mx-auto max-w-[1440px] px-6 py-24 md:px-20" aria-labelledby="services-title">
      <div className="reference-layout services-layout">
        <div className="reference-copy" data-reveal="heading">
          <p className="reference-kicker">Serviços</p>
          <h2 id="services-title" className="reference-title">Design e front-end integrados.</h2>
          <p className="reference-lede">
            Cada frente resolve uma parte do projeto: o que mostrar, como organizar, como codificar e como colocar no ar.
          </p>
        </div>
        <div className="reference-list services-grid" aria-label="Especialidades">
        {specialties.map(([title, text], index) => (
          <article key={title} className="reference-card service-card" data-reveal="card">
            <p className="reference-number service-number">{String(index + 1).padStart(2, "0")}</p>
            <div className="reference-card-copy">
              <h3>{title}</h3>
              <p>{keepLastWordsTogether(text)}</p>
            </div>
          </article>
        ))}
        </div>
      </div>
    </section>
  )
}

function Process() {
  return (
    <section id="processo" className="process-section section-spacing mx-auto max-w-[1440px] px-6 py-24 md:px-20" aria-labelledby="process-title">
      <div className="process-shell">
        <div className="reference-layout process-layout">
          <div className="reference-copy process-intro" data-reveal="heading">
            <p className="reference-kicker process-kicker">Processo</p>
            <h2 id="process-title" className="reference-title">Do briefing à entrega.</h2>
            <p className="reference-lede">
              Cada etapa fecha uma decisão antes da próxima: intenção, estrutura, interface e publicação.
            </p>
          </div>
          <ol className="reference-list process-list" data-reveal="timeline">
            {processSteps.map(([number, title, text], index) => (
              <li
                key={title}
                className="reference-card process-step"
                data-reveal="process-step"
                data-step={number}
              >
                <span className="reference-number process-number">{number}</span>
                <div className="reference-card-copy process-step-copy">
                  <h3>{title}</h3>
                  <p>{keepLastWordsTogether(text)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [state, handleSubmit] = useForm("mbdbpdlb")

  return (
    <section id="contato" className="contact-section section-spacing mx-auto max-w-[1440px] px-6 py-24 md:px-20" aria-labelledby="contact-title">
      <div className="contact-shell py-14 lg:py-16">
        <div className="contact-layout">
          <div className="contact-copy" data-reveal="heading">
            <p className="contact-kicker">Contato</p>
            <h2 id="contact-title" className="contact-title">Iniciar projeto</h2>
            <p className="contact-lede">
              {keepLastWordsTogether("Conte o que precisa sair do papel. Eu retorno com direção recomendada, escopo inicial e o melhor formato para desenhar, codificar e publicar.")}
            </p>
            <div className="contact-channels" aria-label="Canais de contato">
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
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="contact-channel group" aria-label="Falar no WhatsApp com Matheus Monteiro">
                <span className="contact-channel-copy">
                  <span className="contact-channel-label">WhatsApp</span>
                  <span className="contact-channel-value">+55 48 98438-0803</span>
                </span>
                <span className="contact-channel-action" aria-hidden="true">
                  <span>Chamar</span>
                  <MessageCircle className="contact-channel-icon" size={14} />
                </span>
              </a>
              <a className="contact-social-link" href="https://www.linkedin.com/in/monteiro00/" target="_blank" rel="noopener noreferrer">
                Ver LinkedIn <ExternalLink size={12} />
              </a>
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit} aria-busy={state.submitting} data-reveal="form">
            <input type="hidden" name="_subject" value="Novo briefing pelo site Matheus Monteiro" />
            <div className="contact-form-heading">
              <div>
                <p className="contact-form-kicker">Briefing inicial</p>
                <h3>Conte sobre o projeto</h3>
              </div>
              <p>Responda o essencial. Se ainda não tiver todas as respostas, mande o que já sabe.</p>
            </div>
            <div className="contact-field-grid">
              <label className="contact-field group">
                <span className="contact-field-label">Nome</span>
                <input
                  id="name"
                  className="contact-input"
                  name="name"
                  type="text"
                  placeholder="Seu nome"
                  autoComplete="name"
                  aria-describedby="name-help"
                  aria-invalid={Boolean(state.errors?.getFieldErrors?.("name")?.length) || undefined}
                  required
                />
                <span id="name-help" className="contact-field-help">{fieldHelp.name}</span>
                <ValidationError className="text-xs leading-5 text-destructive" prefix="Nome" field="name" errors={state.errors} />
              </label>
              <label className="contact-field group">
                <span className="contact-field-label">E-mail</span>
                <input
                  id="email"
                  className="contact-input"
                  name="email"
                  type="email"
                  placeholder="voce@email.com"
                  autoComplete="email"
                  aria-describedby="email-help"
                  aria-invalid={Boolean(state.errors?.getFieldErrors?.("email")?.length) || undefined}
                  required
                />
                <span id="email-help" className="contact-field-help">{fieldHelp.email}</span>
                <ValidationError className="text-xs leading-5 text-destructive" prefix="E-mail" field="email" errors={state.errors} />
              </label>
            </div>
            <fieldset className="contact-choice-group" aria-describedby="project-type-help">
              <legend className="contact-field-label">Tipo de projeto</legend>
              <div className="contact-choice-list">
                {projectTypeOptions.map((option, index) => (
                  <label key={option} className="contact-choice">
                    <input type="radio" name="projectType" value={option} required={index === 0} />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
              <span id="project-type-help" className="contact-field-help">{fieldHelp.projectType}</span>
              <ValidationError className="text-xs leading-5 text-destructive" prefix="Tipo de projeto" field="projectType" errors={state.errors} />
            </fieldset>
            <fieldset className="contact-choice-group" aria-describedby="budget-help">
              <legend className="contact-field-label">Orçamento previsto</legend>
              <div className="contact-choice-list">
                {budgetOptions.map((option, index) => (
                  <label key={option} className="contact-choice">
                    <input type="radio" name="budget" value={option} required={index === 0} />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
              <span id="budget-help" className="contact-field-help">{fieldHelp.budget}</span>
              <ValidationError className="text-xs leading-5 text-destructive" prefix="Orçamento" field="budget" errors={state.errors} />
            </fieldset>
            <label className="contact-field contact-field-message group">
              <span className="contact-field-label">Mensagem</span>
              <textarea
                id="message"
                className="contact-input"
                name="message"
                placeholder="Fale sobre objetivo, prazo e o que precisa ficar pronto."
                aria-describedby="message-help"
                aria-invalid={Boolean(state.errors?.getFieldErrors?.("message")?.length) || undefined}
                required
              />
              <span id="message-help" className="contact-field-help">{fieldHelp.message}</span>
              <ValidationError className="text-xs leading-5 text-destructive" prefix="Mensagem" field="message" errors={state.errors} />
            </label>
            <div className="contact-submit-row">
              <button
                className="contact-submit"
                type="submit"
                disabled={state.submitting}
              >
                {state.submitting ? "Enviando" : "Enviar briefing"} <Send size={15} />
              </button>
              <p className="contact-status" aria-live="polite" aria-atomic="true" role="status">
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
      </div>
    </section>
  )
}

export default function App() {
  useMotionReveals()
  useStackScrollMotion()

  return (
    <div className="portfolio-page min-h-screen overflow-x-clip bg-background text-primary">
      <a
        href="#conteudo"
        className="skip-link"
        onFocus={(event) => {
          event.currentTarget.setAttribute("data-focus", "true")
          event.currentTarget.style.transition = "none"
          event.currentTarget.style.transform = "none"
        }}
        onBlur={(event) => {
          event.currentTarget.removeAttribute("data-focus")
          event.currentTarget.style.removeProperty("transition")
          event.currentTarget.style.removeProperty("transform")
        }}
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo" tabIndex={-1}>
        <Hero />
        <About />
        <Projects />
        <Services />
        <Process />
        <Contact />
      </main>
      <footer className="site-footer border-t border-border px-6 md:px-20">
        <div className="site-footer-inner mx-auto max-w-[1280px]">
          <div className="site-footer-lead">
            <p className="site-footer-kicker">Disponível para novos projetos</p>
            <a className="site-footer-title" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              Vamos transformar uma ideia em presença digital.
              <ExternalLink size={20} />
            </a>
          </div>
          <div className="site-footer-meta">
            <p>Matheus Monteiro. Web design, UX/UI e front-end.</p>
            <div className="site-footer-links" aria-label="Links do rodapé">
              <a href="mailto:matheusapm550@gmail.com">E-mail</a>
              <a href="https://www.linkedin.com/in/monteiro00/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="#inicio">Voltar ao topo</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
