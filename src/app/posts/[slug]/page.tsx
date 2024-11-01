import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import { CMS_NAME } from "@/lib/constants";
import markdownToHtml from "@/lib/markdownToHtml";
import Container from "@/app/_components/container";
import { PostBody } from "@/app/_components/post-body";
import { PostHeader } from "@/app/_components/post-header";
import Link from "next/link";

export default async function Post({ params }: Params) {
  // Certifique-se de que `params` é aguardado corretamente
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const allPosts = getAllPosts();

  if (!post) {
    return notFound();
  }

  // Converte o conteúdo do post para HTML
  const content = await markdownToHtml(post.content || "");

  // Encontra o índice do post atual na lista de posts
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);

  // Calcula o post anterior e o próximo
  const prevPost = allPosts[currentIndex - 1] || null;
  const nextPost = allPosts[currentIndex + 1] || null;

  return (
    <main>
      <Container>
        <article>
          <PostHeader
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
          />
          <PostBody content={content} />

          <div className="flex justify-between my-8">
            {prevPost && (
              <Link href={`/posts/${prevPost.slug}`} legacyBehavior>
                <a className="text-white hover:underline text-xl mx-6 p-3 bg-black rounded-xl">← VEJA: {prevPost.title}</a>
              </Link>
            )}
            {nextPost && (
              <Link href={`/posts/${nextPost.slug}`} legacyBehavior>
                <a className="text-white hover:underline text-xl mx-6 p-3 bg-black rounded-xl"> VEJA: {nextPost.title} →</a>
              </Link>
            )}
          </div>
        </article>
      </Container>
    </main>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  // Certifique-se de que `params` é aguardado corretamente
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | Next.js Blog Example with ${CMS_NAME}`;

  return {
    title,
    openGraph: {
      title,
      images: [post.ogImage.url],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
