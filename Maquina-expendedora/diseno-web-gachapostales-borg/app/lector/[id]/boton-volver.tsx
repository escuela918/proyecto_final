'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { CLAVE, DESDE_WEB } from '@/components/biblioteca'

export function BotonVolver({ id }: { id: string }) {
  const router = useRouter()

  function volver() {
    let desdeWeb = false
    try {
      desdeWeb = sessionStorage.getItem(DESDE_WEB) === id
      sessionStorage.removeItem(DESDE_WEB)
      // Si se entró directo al lector (por el QR), la biblioteca abre la tarjeta de este libro
      if (!desdeWeb) sessionStorage.setItem(CLAVE, JSON.stringify({ id, scroll: null }))
    } catch {}
    if (desdeWeb && window.history.length > 1) router.back()
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
