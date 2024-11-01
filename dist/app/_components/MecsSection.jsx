import { Clock, Book, Users, Award } from "lucide-react";
import BenefitsSection from './BenefitsSextion';
export default function ExpressMassageSection() {
    return (<section id='mecs' className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600/5 via-gray-50 to-blue-600/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-blue-600 sm:text-4xl mb-4">
            Domine a Arte da Massagem Expressa Anti-Estresse
          </h2>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto">
            Transforme vidas em minutos: Aprenda técnicas poderosas para combater o estresse rapidamente
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-black">Por que escolher nosso curso?</h3>
            <ul className="space-y-4">
              {[
            "Técnicas rápidas e eficazes para alívio imediato do estresse",
            "Aplicável em diversos ambientes: escritório, casa, eventos",
            "Melhora a qualidade de vida e produtividade",
            "Habilidade valiosa para cuidar de si e dos outros"
        ].map((item, index) => (<li key={index} className="flex items-start">
                  <span className="mr-2 mt-1 text-blue-600">✓</span>
                  <span>{item}</span>
                </li>))}
            </ul>
            <button className="mt-6 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg">
              Inscreva-se Agora
            </button>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-center">O que nossos alunos dizem</h3>
            <div className="space-y-4">
              {[
            { name: "Maria S.", text: "Esse curso mudou minha vida! Agora consigo lidar com o estresse do trabalho muito melhor." },
            { name: "João P.", text: "As técnicas são simples de aprender e extremamente eficazes. Recomendo a todos!" },
            { name: "Ana L.", text: "Excelente investimento. Aprendi habilidades que uso diariamente para meu bem-estar." }
        ].map((testimonial, index) => (<div key={index} className="bg-gray-50 rounded p-4">
                  <p className="italic mb-2">"{testimonial.text}"</p>
                  <p className="text-right text-sm font-semibold">- {testimonial.name}</p>
                </div>))}
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Jornada do Curso</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
            { icon: <Clock className="h-8 w-8"/>, title: "Módulo 1", description: "Fundamentos da Massagem Expressa" },
            { icon: <Book className="h-8 w-8"/>, title: "Módulo 2", description: "Técnicas Avançadas Anti-Estresse" },
            { icon: <Users className="h-8 w-8"/>, title: "Módulo 3", description: "Prática e Aplicação em Diferentes Contextos" },
            { icon: <Award className="h-8 w-8"/>, title: "Certificação", description: "Avaliação Final e Certificado" }
        ].map((step, index) => (<div key={index} className="bg-white rounded-lg shadow p-6 text-center">
                <div className="text-blue-600 mb-4 flex justify-center">{step.icon}</div>
                <h4 className="font-semibold mb-2">{step.title}</h4>
                <p className="text-sm text-gray-500">{step.description}</p>
              </div>))}
          </div>
        </div>
        <BenefitsSection />

      {/*   <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Pronto para transformar vidas, incluindo a sua?</h3>
            <button className="text-lg px-8 py-3 bg-blue-600 text-white font-bold rounded-lg">
              Comece Sua Jornada Agora
            </button>
            <p className="mt-4 text-sm text-gray-500">
              Vagas limitadas! Garanta já o seu lugar nesta experiência transformadora.
            </p>
          </div> */}
      </div>
    </section>);
}
