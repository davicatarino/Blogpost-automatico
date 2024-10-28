import Link from 'next/link'
import { Facebook, Instagram, Twitter, Send } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Coluna 1: Logo e Redes Sociais */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Tour No Stress</h2>
            <div className="flex space-x-4 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <Facebook size={24} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <Instagram size={24} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <Twitter size={24} />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>

          {/* Coluna 2: Links Úteis */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Úteis</h3>
            <ul className="space-y-2">
              <li><Link href="/sobre" className="hover:text-gray-300">Sobre Nós</Link></li>
              <li><Link href="/servicos" className="hover:text-gray-300">Nossos Serviços</Link></li>
              <li><Link href="/politica-privacidade" className="hover:text-gray-300">Política de Privacidade</Link></li>
              <li><Link href="/termos-condicoes" className="hover:text-gray-300">Termos e Condições</Link></li>
            </ul>
          </div>

          {/* Coluna 3: Endereço */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Nosso Endereço</h3>
            <p>Rua das Palmeiras, 123</p>
            <p>Bairro Jardim</p>
            <p>São Paulo - SP</p>
            <p>CEP: 01234-567</p>
            <p className="mt-2">contato@tournostress.com</p>
            <p>(11) 1234-5678</p>
          </div>

          {/* Coluna 4: Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Receba Nossas Novidades</h3>
            <form className="flex">
              <input
                type="email"
                placeholder="Seu e-mail"
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
