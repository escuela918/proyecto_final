'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

export function BotonVolver() {
  const router = useRouter()

  function volver() {
    // Si se entró directo al lector (sin historial), vuelve a la biblioteca
    if (window.history.length > 1) router.back()
    else router.push('/#biblioteca')
  }

  return (
    <button
      type="button"
      onClick={volver}
      className="flex shrink-0 items-center gap-2 text-xs uppercase tracking-[0.3em] text-sepia outline-none hover:text-paper focus-visible:ring-2 focus-visible:ring-sepia"
    >
      <ArrowLeft className="size-4" aria-hidden="true" />
      Volver
    </button>
  )
}
