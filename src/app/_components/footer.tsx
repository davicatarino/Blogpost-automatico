'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Facebook, Youtube, Send } from 'lucide-react'

export default function Footer() {
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
        body: JSON.stringify({ cell })  // Envia o e-mail para a API
      })

      if (response.ok) {
        setIsSubmitted(true)
        setCell('')
      } else {
        const data = await response.json()
        setError(data.message || 'Erro ao enviar e-mail para a planilha.')
      }
    } catch (error) {
      console.error('Erro ao enviar o e-mail:', error)
      setError('Erro ao enviar o e-mail.')
    }
  }

  return (
    <footer id='contact' className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Coluna 1: Logo e Redes Sociais */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Tour No Stress</h2>
            <div className="flex space-x-4 mt-4">
              <a href="https://www.facebook.com/TourNoStress/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <Facebook size={24} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://www.youtube.com/user/tournostress1" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <Youtube size={24} />
                <span className="sr-only">Youtube</span>
              </a>
            </div>
          </div>

          {/* Coluna 2: Endereço */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Nosso Endereço</h3>
            <p>Rua Gavião Peixoto, 124 - Sl: 1207 </p>
            <p>Bairro Icaraí</p>
            <p>Niterói - RJ</p>
            <p>CEP: 24230-101</p>
            <p className="mt-2">tournostress@gmail.com</p>
            <p>21 99826-2820</p>
          </div>

          {/* Coluna 3: Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Receba Nossas Novidades</h3>
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="flex">
                <input
                  type="tel"
                  placeholder="Seu Melhor Número de Celular"
                  value={cell}
                  onChange={(e) => setCell(e.target.value)}
                  required
                  className="flex-grow px-3 py-2 bg-gray-700 text-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <Send size={20} />
                  <span className="sr-only">Enviar</span>
                </button>
              </form>
            ) : (
              <div className="bg-black text-white px-6 py-4 rounded-md shadow-lg animate-fade-in-up">
                <p className="font-semibold">Obrigado por se inscrever!</p>
                <p>Fique atento ao seu e-mail para novidades.</p>
              </div>
            )}
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>&copy; {new Date().getFullYear()} Tour No Stress. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
