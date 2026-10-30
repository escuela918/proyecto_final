import { notFound } from 'next/navigation'
import { libros } from '@/lib/borges'
import { VisorPdf } from '@/components/visor-pdf'
import { BotonVolver } from './boton-volver'

export function generateStaticParams() {
  return libros.map((l) => ({ id: l.id }))
}

export default async function Lector({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const libro = libros.find((l) => l.id === id)
  if (!libro) notFound()

  return (
    <div className="flex h-dvh flex-col bg-ink">
      <header className="flex items-center justify-between gap-4 border-b border-border px-4 py-3 md:px-8">
        <BotonVolver id={libro.id} />
        <div className="min-w-0 text-right">
          <p className="truncate text-lg font-light md:text-2xl">{libro.titulo}</p>
          <p className="truncate text-xs italic text-paper/45">{libro.libro}</p>
        </div>
      </header>
      <VisorPdf src={libro.pdf} pagina={libro.pagina} titulo={libro.titulo} />
      <a
        href={libro.pagina ? `${libro.pdf}#page=${libro.pagina}` : libro.pdf}
        target="_blank"
        rel="noopener"
        className="border-t border-border px-4 py-3 text-center text-xs uppercase tracking-[0.3em] text-sepia md:hidden"
      >
        ¿No se ve? Abrir el PDF
      </a>
    </div>
  )
}
