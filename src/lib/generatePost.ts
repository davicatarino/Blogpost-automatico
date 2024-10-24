import openai from './openAiClient';
import * as fs from 'fs';
import * as path from 'path';
import { scrapeG1 } from './scrape';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Definir tipos
interface Article {
  title: string;
  contentSnippet: string;
  link: string;
  localImage: string;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BLOG_POSTS_DIR = './../../_posts';

// Cria o diretório de posts se não existir
const postsDirPath = path.join(__dirname, BLOG_POSTS_DIR);
if (!fs.existsSync(postsDirPath)) {
  fs.mkdirSync(postsDirPath, { recursive: true });
}

/**
 * Gera o conteúdo do post utilizando a API do OpenAI
 * @param {string} title - Título da notícia
 * @param {string} description - Descrição da notícia
 * @param {string} link - Link para a notícia original
 * @returns {Promise<string|null>} - Conteúdo gerado ou null em caso de erro
 */
async function generatePostContent(title: string, description: string, link: string): Promise<string | null> {
  const prompt = `
      utilize o título, descrição e link para gerar um conteúdo de blog sobre o assunto.

      Título: ${title}
      Descrição: ${description}
      Link: ${link}
  `;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'Você é um assistente que resume notícias para blogs. Não gere titulo e nem marcações de texto, imprima somente texto puro do resumo das matérias.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 500,
      temperature: 0.5,
    });

    if (response && response.choices?.[0]?.message?.content) {
      const content = response.choices[0].message.content.trim();
      return content;
    } else {
      console.error('A resposta da OpenAI não contém conteúdo válido.');
      return null;
    }

  } catch (error: any) {
    console.error('Erro ao gerar conteúdo com o OpenAI:', error.response ? error.response.data : error.message);
    return null;
  }
}

/**
 * Salva o post gerado como um arquivo .md
 * @param {string} title - Título do post
 * @param {string} content - Conteúdo do post
 * @param {string} image - Caminho da imagem do post
 */
function savePost(title: string, content: string, image: string): void {
  const date = new Date().toISOString();
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const excerpt = content.substring(0, 150).replace(/\n/g, ' ').replace(/"/g, '\\"');

  const frontMatter = `---
title: "${title}"
excerpt: "${excerpt}"
coverImage: "${image || '/assets/blog/default.jpg'}"
date: "${date}"
ogImage:
  url: "${image || '/assets/blog/default.jpg'}"
---

${content}
`;

  const fileName = `${date.split('T')[0]}-${slug}.md`;
  const filePath = path.join(postsDirPath, fileName);

  fs.writeFileSync(filePath, frontMatter, 'utf8');
  console.log(`Post "${title}" salvo em ${filePath}`);
}

/**
 * Função principal que coordena o scraping e a geração de posts
 * Limita para processar 2 artigos por vez.
 */
export async function main(): Promise<void> {
  const articles: Article[] = await scrapeG1();

  // Limita a busca a 2 artigos por vez
  const articlesToProcess = articles.slice(0, 2);

  for (const article of articlesToProcess) {
    const slug = article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const fileName = `${slug}.md`;
    const filePath = path.join(postsDirPath, fileName);

    if (fs.existsSync(filePath)) {
      console.log(`Post "${article.title}" já existe. Pulando...`);
      continue;
    }

    const content = await generatePostContent(article.title, article.contentSnippet, article.link);

    if (content) {
      savePost(article.title, content, article.localImage);
    } else {
      console.error(`Falha ao gerar conteúdo para o post: "${article.title}"`);
    }
  }
}
