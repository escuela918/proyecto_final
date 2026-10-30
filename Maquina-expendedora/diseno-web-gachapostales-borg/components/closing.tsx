import { Reveal } from '@/components/reveal'

export function Closing() {
  return (
    <section className="flex min-h-[70svh] flex-col items-center justify-center gap-12 px-5 py-20 text-center md:gap-16 md:py-28">
      <Reveal className="flex max-w-3xl flex-col items-center gap-8">
        <span className="size-2 rotate-45 bg-sepia" aria-hidden="true" />
        <blockquote className="text-balance text-2xl font-light italic leading-snug md:text-5xl">
          Somos nuestra memoria, somos ese quimérico museo de formas inconstantes, ese montón de
          espejos rotos.
        </blockquote>
        <p className="text-xs uppercase tracking-[0.35em] text-sepia">Cambridge · Elogio de la sombra</p>
      </Reveal>

      <Reveal delay={300} className="flex flex-col items-center gap-4 text-sm text-paper/45">
        <span className="flex h-1 w-28 overflow-hidden" aria-hidden="true">
          {['#8b3a2e', '#3f6b6a', '#b08a3e', '#4a5d8a', '#6e7a45'].map((c) => (
            <span key={c} className="flex-1" style={{ backgroundColor: c }} />
          ))}
        </span>
        <p className="italic">
          Parte de <span className="text-paper/70">Gachapostales Borgianas</span>, un proyecto lúdico para
          acercarnos a su obra.
        </p>
      </Reveal>
    </section>
  )
}
