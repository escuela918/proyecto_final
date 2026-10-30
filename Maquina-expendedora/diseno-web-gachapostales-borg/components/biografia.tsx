import { hitos } from '@/lib/borges'
import { Reveal } from '@/components/reveal'
import { SectionLabel } from '@/components/section-label'

export function Biografia() {
  return (
    <section id="vida" className="relative px-5 py-20 md:px-12 md:py-40">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-12 flex flex-col gap-5 md:mb-28 md:max-w-2xl">
          <SectionLabel>Una vida</SectionLabel>
          <h2 className="text-balance text-4xl font-light leading-tight md:text-7xl">
            El hombre que <em className="text-sepia">soñó</em> el universo como una biblioteca
          </h2>
        </Reveal>

        <ol className="relative flex flex-col">
          <span
            className="absolute top-0 bottom-0 left-1 w-px bg-gradient-to-b from-transparent via-sepia/40 to-transparent md:left-1/2"
            aria-hidden="true"
          />
          {hitos.map((hito, i) => {
            const izquierda = i % 2 === 0
            return (
              <Reveal
                as="li"
                key={hito.anio}
                className="relative flex flex-col gap-2 py-6 pl-8 md:grid md:grid-cols-2 md:gap-20 md:py-10 md:pl-0"
              >
                <span
                  className="absolute top-9 left-1 size-2 -translate-x-1/2 rotate-45 bg-sepia md:top-14 md:left-1/2"
                  aria-hidden="true"
                />
                <div
                  className={`flex items-baseline gap-3 md:flex-col md:gap-0 md:pt-2 ${izquierda ? 'md:items-end md:text-right' : 'md:order-2'}`}
                >
                  <span className="text-3xl font-light text-sepia md:text-6xl">{hito.anio}</span>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-paper/40 md:mt-1 md:text-xs">
                    {hito.lugar}
                  </span>
                </div>
                <div
                  className={`flex flex-col gap-2 md:gap-3 ${izquierda ? '' : 'md:order-1 md:items-end md:text-right'}`}
                >
                  <h3 className="text-xl md:text-3xl">{hito.titulo}</h3>
                  <p className="max-w-md text-pretty leading-relaxed text-paper/60">{hito.texto}</p>
                </div>
              </Reveal>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
