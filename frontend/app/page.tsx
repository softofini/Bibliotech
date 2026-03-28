'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import { Spinner } from '@/components/ui/spinner'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // Verifica se o usuário está autenticado
    const isAuthenticated = api.auth.isAuthenticated()
    
    if (isAuthenticated) {
      router.push('/dashboard')
    } else {
      router.push('/login')
    }
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <Spinner className="h-8 w-8 text-primary" />
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    </div>
  )
}
