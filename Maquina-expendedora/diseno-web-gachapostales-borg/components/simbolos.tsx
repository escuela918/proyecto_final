import Image from 'next/image'
import { simbolos } from '@/lib/borges'
import { Reveal } from '@/components/reveal'
import { SectionLabel } from '@/components/section-label'

export function Simbolos() {
  return (
    <section id="simbolos" className="relative overflow-hidden border-t border-border">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/laberinto.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/70 to-ink" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 py-20 md:px-12 md:py-40">
        <Reveal className="mb-12 flex flex-col items-center gap-5 text-center md:mb-20">
          <SectionLabel>Símbolos</SectionLabel>
          <h2 className="text-balance text-4xl font-light md:text-7xl">
            Sus <em className="text-sepia">obsesiones</em>
          </h2>
        </Reveal>

        <ul className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
          {simbolos.map((s, i) => (
            <Reveal
              as="li"
              key={s.nombre}
              delay={i * 90}
              className="group flex flex-col gap-4 bg-ink/90 p-8 backdrop-blur-sm transition-colors duration-500 hover:bg-card md:p-10"
            >
              <span className="text-xs tracking-[0.35em] text-sepia/70">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-2xl font-light md:text-3xl transition-colors duration-500 group-hover:text-sepia">
                {s.nombre}
              </h3>
              <p className="text-pretty leading-relaxed text-paper/60">{s.texto}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
