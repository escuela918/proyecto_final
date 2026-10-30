'use client'

import { useEffect, useRef, useState } from 'react'

// Muestra el PDF completo con pdf.js y abre directamente en `pagina`.
// El visor nativo del celular ignora "#page=N", por eso se dibuja cada hoja a mano.
export function VisorPdf({ src, pagina = 1, titulo }: { src: string; pagina?: number; titulo: string }) {
  const contenedor = useRef<HTMLDivElement>(null)
  const [estado, setEstado] = useState<'cargando' | 'listo' | 'error'>('cargando')

  useEffect(() => {
    const raiz = contenedor.current
    if (!raiz) return
    let cancelado = false
    let observador: IntersectionObserver | null = null
    let documento: { destroy: () => Promise<void> } | null = null

    async function cargar() {
      const pdfjs = await import('pdfjs-dist')
      pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString()

      const pdf = await pdfjs.getDocument(src).promise
      documento = pdf
      if (cancelado || !raiz) return

      // Se mide cada hoja antes de dibujarla para que el salto a `pagina` caiga justo
      const tamanios = await Promise.all(
        Array.from({ length: pdf.numPages }, (_, i) => pdf.getPage(i + 1).then((p) => p.getViewport({ scale: 1 }))),
      )
      if (cancelado) return
      const hojas: HTMLDivElement[] = []
      for (let n = 1; n <= pdf.numPages; n++) {
        const hoja = document.createElement('div')
        hoja.dataset.pagina = String(n)
        hoja.className = 'mx-auto mb-3 w-full max-w-3xl bg-white shadow-lg'
        hoja.style.aspectRatio = `${tamanios[n - 1].width} / ${tamanios[n - 1].height}`
        raiz.appendChild(hoja)
        hojas.push(hoja)
      }

      const dibujadas = new Set<number>()
      async function dibujar(hoja: HTMLDivElement) {
        const n = Number(hoja.dataset.pagina)
        if (dibujadas.has(n)) return
        dibujadas.add(n)
        const page = await pdf.getPage(n)
        const escala = (hoja.clientWidth / page.getViewport({ scale: 1 }).width) * (window.devicePixelRatio || 1)
        const vista = page.getViewport({ scale: escala })
        const lienzo = document.createElement('canvas')
        lienzo.width = vista.width
        lienzo.height = vista.height
        lienzo.className = 'block h-auto w-full'
        hoja.appendChild(lienzo)
        await page.render({ canvasContext: lienzo.getContext('2d')!, viewport: vista }).promise
      }

      observador = new IntersectionObserver(
        (entradas) => entradas.forEach((e) => e.isIntersecting && dibujar(e.target as HTMLDivElement)),
        { root: raiz, rootMargin: '150% 0px' },
      )
      hojas.forEach((h) => observador!.observe(h))

      const destino = hojas[Math.min(Math.max(pagina, 1), hojas.length) - 1]
      raiz.scrollTop = destino.offsetTop - 12
      setEstado('listo')
    }

    cargar().catch(() => !cancelado && setEstado('error'))

    return () => {
      cancelado = true
      observador?.disconnect()
      documento?.destroy()
      raiz.replaceChildren()
    }
  }, [src, pagina])

  return (
    <div className="relative flex-1 overflow-hidden bg-card">
      <div ref={contenedor} aria-label={titulo} className="absolute inset-0 overflow-y-auto px-2 py-3 md:px-6" />
      {estado !== 'listo' && (
        <p className="absolute inset-0 flex items-center justify-center text-sm italic text-paper/60">
          {estado === 'cargando' ? 'Abriendo el libro…' : 'No se pudo abrir el libro.'}
        </p>
      )}
    </div>
  )
}
