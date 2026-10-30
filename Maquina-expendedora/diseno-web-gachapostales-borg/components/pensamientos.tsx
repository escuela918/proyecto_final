import { pensamientos } from '@/lib/borges'
import { Reveal } from '@/components/reveal'
import { SectionLabel } from '@/components/section-label'

export function Pensamientos() {
  return (
    <section
      id="pensamientos"
      className="border-y border-border bg-card px-5 py-20 md:px-12 md:py-40"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-16 flex flex-col items-center gap-5 text-center md:mb-24">
          <SectionLabel>Pensamientos</SectionLabel>
          <h2 className="text-balance text-4xl font-light md:text-6xl">
            Lo que Borges <em className="text-sepia">iba diciendo</em>
          </h2>
        </Reveal>

        <ul className="flex flex-col gap-20 md:gap-40">
          {pensamientos.map((p, i) => (
            <Reveal
              as="li"
              key={p.obra}
              className={`flex max-w-4xl flex-col gap-6 md:gap-8 ${i % 2 === 0 ? 'md:self-start' : 'md:self-end md:text-right'}`}
            >
              <span className="text-7xl leading-none text-sepia/30 md:text-9xl" aria-hidden="true">
                {i % 2 === 0 ? '«' : '»'}
              </span>
              <blockquote className="-mt-12 text-balance text-2xl font-light italic leading-snug md:-mt-20 md:text-5xl">
                {p.texto}
              </blockquote>
              <p className="text-[11px] uppercase leading-relaxed tracking-[0.3em] text-paper/45 md:text-xs">
                <span className="text-sepia">{p.obra}</span>
                <span className="mx-3" aria-hidden="true">
                  ·
                </span>
                {p.libro}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
