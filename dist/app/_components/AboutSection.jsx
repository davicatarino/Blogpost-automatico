import React from 'react';
import { Zap, Heart, CheckCircle } from 'lucide-react';
export default function AboutSection() {
    const features = [
        { title: "Técnicas Rápidas", content: "Aprenda técnicas de massagem que podem ser aplicadas em poucos minutos, perfeitas para o seu dia a dia agitado.", icon: Zap },
        { title: "Autoaplicação", content: "Ensinamos como você pode aplicar as técnicas em si mesmo, proporcionando alívio imediato quando precisar.", icon: Heart },
        { title: "Baseado em Evidências", content: "Nossas técnicas são fundamentadas em pesquisas científicas sobre o manejo do estresse e bem-estar.", icon: CheckCircle }
    ];
    return (<section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 text-primary">
          Programa MECS
        </h2>
        <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-center mb-12">
          O MECS (Massagem Expressa de Combate ao Stress) é nossa abordagem revolucionária para ajudar você a gerenciar o
          estresse diário de forma rápida, eficaz e transformadora.
        </p>
        <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
          {features.map((feature, index) => (<div key={index} className="bg-gradient-to-br from-primary/5 to-primary/10 border-none shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-lg p-6">
              <h3 className="flex items-center text-primary text-xl font-semibold mb-2">
                <feature.icon className="w-6 h-6 mr-2"/>
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.content}</p>
            </div>))}
        </div>
      </div>
    </section>);
}
