'use client'
import React, { useState } from 'react'
import { Send } from 'lucide-react'

export default function PreLaunchSection() {
  const [cell, setCell] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    try {
      const response = await fetch('/api/sendToGoogleSheets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cell })
      })

      if (response.ok) {
        setIsSubmitted(true)
        setCell('')
      } else {
        const data = await response.json()
        setError(data.message || 'Erro ao enviar número para a planilha.')
      }
    } catch (error) {
      console.error('Erro ao enviar o número:', error)
      setError('Erro ao enviar o número.')
    }
  }

  return (
    <section id='mecs' className="w-full pb-12 md:pb-24 lg:pb-32 bg-gradient-to-r from-primary to-primary-dark">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-black">
              Em Breve: Massagem Expressa de Combate ao Stress
            </h2>
            <p className="mx-auto max-w-[700px] text-xl text-primary-100 md:text-2xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Seja o primeiro a saber quando lançarmos nossa técnica exclusiva de massagem, qual o objetivo principal é reduzir o estresse e dar mais qualidade de vida para quem precisa.
            </p>
          </div>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="tel"
                  placeholder="Seu melhor telefone"
                  value={cell}
                  onChange={(e) => setCell(e.target.value)}
                  required
                  className="flex-grow px-4 py-3 rounded-md text-white bg-black border border-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-100"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-secondary text-black rounded-md hover:bg-secondary-dark transition-colors duration-300 flex items-center justify-center"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Inscrever-se
                </button>
              </div>
              {error && <p className="text-red-500">{error}</p>}
            </form>
          ) : (
            <div className="bg-black text-white px-6 py-4 rounded-md shadow-lg animate-fade-in-up">
              <p className="font-semibold">Obrigado por se inscrever!</p>
              <p>Fique atento ao seu e-mail para novidades.</p>
            </div>
          )}
          <p className="text-sm text-primary-100">
            Prometemos não enviar spam. Você pode cancelar a inscrição a qualquer momento.
          </p>
        </div>
      </div>
    </section>
  )
}
