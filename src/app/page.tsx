import Container from "./_components/container";
import { MoreStories } from "./_components/more-stories";
import { getAllPosts } from "./../lib/api";

import HeroSection from './_components/HeroSection';
import AboutSection from './_components/AboutSection';
import BenefitsSection from './_components/BenefitsSextion';
import ExpressMassageSection from './_components/MecsSection';
import PreLaunchSection from './_components/preSection';

// Este componente agora é renderizado no servidor
export default async function Index() {
  // Carrega os posts diretamente no Server Component
  const allPosts = getAllPosts();


  const morePosts = allPosts.slice(1);

  return (
    <main>
      <HeroSection/>
      <Container>
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
    {/*   <AboutSection/>
      <BenefitsSection/>
      <ExpressMassageSection/>*/}
      <PreLaunchSection/>
    </main>
  );
}
