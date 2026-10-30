'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { libros } from '@/lib/borges'
import { cn } from '@/lib/utils'
import { Reveal } from '@/components/reveal'
import { SectionLabel } from '@/components/section-label'

// Guarda el último libro abierto y la posición del scroll para volver al mismo lugar
const CLAVE = 'biblioteca:ultimo'

export function Biblioteca() {
  const router = useRouter()
  const [activo, setActivo] = useState<string | null>(null)
  const indice = libros.findIndex((l) => l.id === activo)
  const libro = indice >= 0 ? libros[indice] : null

  useEffect(() => {
    let guardado: { id: string; scroll: number } | null = null
    try {
      guardado = JSON.parse(sessionStorage.getItem(CLAVE) ?? 'null')
    } catch {}
    if (!guardado || !libros.some((l) => l.id === guardado.id)) return
    const { id, scroll } = guardado
    setActivo(id)
    requestAnimationFrame(() => window.scrollTo({ top: scroll, behavior: 'instant' }))
  }, [])

  function abrir(id: string) {
    try {
      sessionStorage.setItem(CLAVE, JSON.stringify({ id, scroll: window.scrollY }))
    } catch {}
    router.push(`/lector/${id}`)
  }

  return (
    <section id="biblioteca" className="relative overflow-hidden px-5 py-20 md:px-12 md:py-40">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-96 transition-colors duration-700"
        style={{
          backgroundImage: `radial-gradient(ellipse at top, ${libro?.postal ?? '#c6a46a'}2e, transparent 70%)`,
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl">
        <Reveal className="mb-14 flex flex-col gap-5 md:mb-20 md:max-w-2xl">
          <SectionLabel>La biblioteca</SectionLabel>
          <h2 className="text-balance text-4xl font-light leading-tight md:text-7xl">
            Cinco libros de un <em className="text-sepia">anaquel infinito</em>
          </h2>
          <p className="text-pretty text-base leading-relaxed text-paper/65 md:text-lg">
            Elegí un lomo para abrirlo.
          </p>
        </Reveal>

        <div
          className={cn(
            'grid gap-10 md:gap-16',
            libro ? 'lg:grid-cols-[1fr_1.1fr] lg:items-end' : 'mx-auto max-w-xl',
          )}
        >
          <Reveal>
            <div
              aria-label="Libros"
              className="flex items-end justify-center gap-1.5 border-b-8 border-[#2a2219] px-1 pt-8 shadow-[0_24px_40px_-20px_rgb(0_0_0/0.9)] sm:gap-3 sm:px-2"
            >
              {libros.map((l) => {
                const seleccionado = l.id === activo
                return (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => abrir(l.id)}
                    style={{ backgroundColor: l.lomo }}
                    className={cn(
                      'spine-texture group relative flex w-[3.25rem] flex-col items-center justify-between overflow-hidden rounded-t-[2px] pt-6 pb-4 text-paper/80 transition-all duration-500 ease-out outline-none focus-visible:ring-2 focus-visible:ring-sepia sm:w-16 sm:pt-7 sm:pb-5',
                      l.alto,
                      seleccionado
                        ? '-translate-y-5 text-paper shadow-[0_0_40px_rgb(198_164_106/0.2)] sm:-translate-y-6'
                        : 'hover:-translate-y-3',
                    )}
                  >
                    <span
                      className={cn(
                        'absolute inset-x-0 top-0 h-2 transition-opacity duration-500',
                        seleccionado ? 'opacity-100' : 'opacity-40',
                      )}
                      style={{ backgroundColor: l.postal }}
                      aria-hidden="true"
                    />
                    <span className="h-px w-6 bg-sepia/60 sm:w-8" aria-hidden="true" />
                    <span className="rotate-180 whitespace-nowrap text-xs tracking-[0.12em] [writing-mode:vertical-rl] sm:text-base">
                      {l.corto}
                    </span>
                    <span className="sr-only">Abrir {l.titulo}</span>
                    <span className="flex flex-col items-center gap-2">
                      <span className="h-px w-6 bg-sepia/60 sm:w-8" aria-hidden="true" />
                      <span className="text-[10px] tracking-widest text-paper/50">{l.anio}</span>
                    </span>
                  </button>
                )
              })}
            </div>
          </Reveal>

          {libro && (
            <article
              key={libro.id}
              aria-live="polite"
              className="fade-up relative overflow-hidden border border-border bg-card p-6 pt-8 md:p-12"
            >
              <span
                className="absolute inset-x-0 top-0 h-1"
                style={{ backgroundColor: libro.postal }}
                aria-hidden="true"
              />
              <div className="flex items-start justify-between gap-4">
                <p className="text-[11px] uppercase tracking-[0.3em] text-sepia md:text-xs">
                  {libro.genero} · {libro.anio}
                </p>
                <span
                  className="flex shrink-0 flex-col items-center border border-dashed px-2.5 py-1.5 text-[10px] uppercase leading-tight tracking-[0.2em]"
                  style={{ borderColor: libro.postal, color: libro.postal }}
                >
                  Postal
                  <span className="text-base tracking-normal">
                    {`Nº ${String(indice + 1).padStart(2, '0')}`}
                  </span>
                </span>
              </div>
              <h3 className="mt-4 text-balance text-3xl font-light leading-tight md:text-5xl">
                {libro.titulo}
              </h3>
              <p className="mt-1 text-sm italic text-paper/45">{libro.libro}</p>
              <div className="my-6 h-px w-12 md:my-8" style={{ backgroundColor: libro.postal }} aria-hidden="true" />
              <p className="text-pretty text-xl italic leading-snug text-paper/90 md:text-2xl">
                {libro.pregunta}
              </p>
            </article>
          )}
        </div>
      </div>
    </section>
  )
}
