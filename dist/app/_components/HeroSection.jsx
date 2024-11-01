import React from 'react';
export default function HeroSection() {
    return (<section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-[url('./../../public/assets/escura.png')] bg-no-repeat bg-cover">
      <div className="container px-4 md:px-6 mx-auto mt-12">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-4xl text-outline-black font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white animate-fade-in-up">
             Tour No Stress
            </h1>
            <h1 className="text-4xl text-outline-black font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white animate-fade-in-up">
              Seu Melhor Caminho Para a Gestão do Stress
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl animate-fade-in-up animation-delay-200">
           Sua saúde é nosso compromisso! Acompanhe o blog para receber dicas práticas e informações que ajudarão você a reduzir o Estresse e viver com mais Qualidade de Vida.
            </p>
          </div>
       {/*    <div className="space-x-4 animate-fade-in-up animation-delay-400">
             <button className="px-4 py-2 bg-white text-primary hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 rounded-md font-medium">
               Comece Agora
             </button>
             <button className="px-4 py-2 bg-transparent text-white border border-white hover:bg-white hover:text-primary transition-all duration-300 transform hover:scale-105 rounded-md font-medium">
               Saiba Mais
             </button>
           </div> */}
        </div>
      </div>
    </section>);
}
