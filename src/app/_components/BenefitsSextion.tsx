import React from 'react'
import { CheckCircle, Zap, Heart } from 'lucide-react'

export default function BenefitsSection() {
  const benefits = [
    { title: "Redução do Estresse", content: "Diminua seus níveis de estresse em minutos com nossas técnicas.", icon: CheckCircle, color: "text-green-500" },
    { title: "Aumento da Produtividade", content: "Melhore seu foco e eficiência no trabalho e na vida pessoal.", icon: Zap, color: "text-yellow-500" },
    { title: "Melhoria do Bem-estar", content: "Sinta-se mais equilibrado e feliz no seu dia a dia.", icon: Heart, color: "text-red-500" }
  ]

  return (
    <section id="benefits" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 text-primary">
          Benefícios do MECS
        </h2>
        <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start space-x-4 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <benefit.icon className={`mt-1 h-8 w-8 ${benefit.color}`} />
              <div>
                <h3 className="font-bold text-lg text-primary">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
