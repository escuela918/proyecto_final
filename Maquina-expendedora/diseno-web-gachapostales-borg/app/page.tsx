import { Hero } from '@/components/hero'
import { Biografia } from '@/components/biografia'
import { Pensamientos } from '@/components/pensamientos'
import { Biblioteca } from '@/components/biblioteca'
import { Simbolos } from '@/components/simbolos'
import { Closing } from '@/components/closing'

export default function Page() {
  return (
    <>
      <Hero />
      <main>
        <Biografia />
        <Pensamientos />
        <Biblioteca />
        <Simbolos />
        <Closing />
      </main>
      <footer className="flex flex-col items-center justify-between gap-3 border-t border-border px-6 py-8 text-xs uppercase tracking-[0.3em] text-paper/40 sm:flex-row md:px-12">
        <span>Jorge Luis Borges</span>
        <span className="text-sm normal-case italic tracking-normal">1899 – 1986</span>
      </footer>
    </>
  )
}
