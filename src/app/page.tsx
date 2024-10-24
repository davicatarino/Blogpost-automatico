import Container from "./_components/container";
import { HeroPost } from "./_components/hero-post";
import { Intro } from "./_components/intro";
import { MoreStories } from "./_components/more-stories";
import { getAllPosts } from "./../lib/api";
import './globals.css';

// Este componente agora é renderizado no servidor
export default async function Index() {
  // Carrega os posts diretamente no Server Component
  const allPosts = getAllPosts();

  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  return (
    <main>
      <Container>
        <Intro />
        {heroPost && (
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.coverImage}
            date={heroPost.date}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
          />
        )}
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
    </main>
  );
}
