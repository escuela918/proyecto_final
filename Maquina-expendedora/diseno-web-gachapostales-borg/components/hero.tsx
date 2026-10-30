import Image from 'next/image'
import { QuoteRotator } from '@/components/quote-rotator'

const nav = [
  { href: '#vida', label: 'Vida' },
  { href: '#pensamientos', label: 'Pensamientos' },
  { href: '#biblioteca', label: 'Biblioteca' },
  { href: '#simbolos', label: 'Símbolos' },
]

export function Hero() {
  return (
    <header className="relative flex min-h-svh flex-col overflow-hidden bg-ink text-paper">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/babel.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="slow-zoom object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(11_10_8/0.35)_0%,rgb(11_10_8/0.85)_60%,#0b0a08_100%)]" />
      </div>

      <nav
        aria-label="Secciones"
        className="relative z-10 flex items-center justify-between px-6 py-6 text-xs uppercase tracking-[0.35em] md:px-12"
      >
        <span className="text-paper/70">J. L. B.</span>
        <ul className="hidden gap-8 md:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="text-paper/60 transition-colors hover:text-sepia">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-8 px-5 pb-10 text-center md:gap-10 md:pb-16">
        <p className="fade-up text-[10px] uppercase tracking-[0.35em] text-sepia md:text-xs md:tracking-[0.5em]">
          Buenos Aires 1899 — Ginebra 1986
        </p>
        <h1 className="fade-up text-balance font-light leading-[0.9] [animation-delay:200ms]">
          <span className="block text-2xl italic text-paper/70 md:text-4xl">Jorge Luis</span>
          <span className="block text-[3.4rem] tracking-[0.1em] sm:text-8xl md:text-[10rem] md:tracking-[0.12em]">
            BORGES
          </span>
        </h1>
        <div className="h-px w-24 bg-sepia/60" aria-hidden="true" />
        <div className="min-h-36 w-full">
          <QuoteRotator />
        </div>
      </div>

      <a
        href="#vida"
        className="relative z-10 mx-auto mb-8 flex flex-col items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-paper/50 transition-colors hover:text-sepia"
      >
        Entrar al laberinto
        <span className="h-10 w-px animate-pulse bg-current" aria-hidden="true" />
      </a>
    </header>
  )
}
