'use client'
import React, { useState, useEffect } from 'react'
import { Heart, Menu } from 'lucide-react'

export default function Intro() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  return (
    <header className={`px-4 lg:px-6 h-16 flex items-center fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-white'}`}>
    <a className="flex items-center justify-center" href="/">
      <Heart className="h-8 w-8 text-primary" />
      <span className="ml-2 text-2xl font-bold text-primary">Tour No Stress</span>
    </a>
    <nav className={`ml-auto ${isMenuOpen ? 'flex' : 'hidden'} md:flex gap-4 sm:gap-6`}>
      <a className="text-sm font-medium hover:text-primary transition-colors" href="#about">Sobre</a>
      <a className="text-sm font-medium hover:text-primary transition-colors" href="#benefits">Benefícios</a>
      <a className="text-sm font-medium hover:text-primary transition-colors" href="#contact">Contato</a>
    </nav>
    <button className="ml-auto md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
      <Menu className="h-6 w-6" />
    </button>
  </header>
  )
}
