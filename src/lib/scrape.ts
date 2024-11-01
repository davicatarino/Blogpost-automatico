import * as RSSParser from 'rss-parser';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import * as cheerio from 'cheerio';

// Definir tipos
interface Article {
  title: string;
  contentSnippet: string;
  link: string;
  content: string;
  localImage: string;
}

const parser = new RSSParser.default();
const G1_RSS_FEED = process.env.G1_RSS_FEED || 'https://g1.globo.com/rss/g1/saude/';
const BLOG_ASSETS_DIR = path.join(process.cwd(), 'public', 'assets', 'blog');
const BLOG_POSTS_DIR = './_posts';

// Função para baixar a imagem
async function downloadImage(url: string, filePath: string): Promise<void> {
  try {
    const response = await axios({ url, responseType: 'stream' });
    response.data.pipe(fs.createWriteStream(filePath));
    return new Promise((resolve, reject) => {
      response.data.on('end', () => resolve());
      response.data.on('error', (err: Error) => reject(err));
    });
  } catch (error: any) {
    console.error('Erro ao baixar a imagem:', error.message);
  }
}

// Função para extrair a URL da imagem do campo content
function extractImageUrl(content: string): string | undefined {
  const $ = cheerio.load(content);
  const img = $('img');
  return img.attr('src');
}

// Função para salvar o post como um arquivo .md
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
  const postsDirPath = path.join(process.cwd(), BLOG_POSTS_DIR);
  const filePath = path.join(postsDirPath, fileName);

  if (!fs.existsSync(postsDirPath)) {
    fs.mkdirSync(postsDirPath, { recursive: true });
  }

  fs.writeFileSync(filePath, frontMatter, 'utf8');
  console.log(`Post "${title}" salvo em ${filePath}`);
}

// Função principal que coordena o scraping e salvamento de posts, limitada a 2 por execução
export async function main(): Promise<void> {
  try {
    const feed = await parser.parseURL(G1_RSS_FEED);
    console.log(`Encontrados ${feed.items.length} artigos no feed.`);

    let createdPostsCount = 0;
    let index = 0;

    // Continue processando até criar 2 posts novos ou esgotar os artigos
    while (createdPostsCount < 2 && index < feed.items.length) {
      const item = feed.items[index];
      const slug = item.title ? item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : '';
      const fileName = `${new Date().toISOString().split('T')[0]}-${slug}.md`;
      const filePath = path.join(BLOG_POSTS_DIR, fileName);

      // Verifica se o post já existe
      if (fs.existsSync(filePath)) {
        console.log(`Post "${item.title}" já existe. Pulando...`);
      } else {
        const imageUrl = extractImageUrl(item.content || '');
        let localImage = '';

        if (imageUrl) {
          const imageFilePath = path.join(BLOG_ASSETS_DIR, `${slug}.jpg`);
          await downloadImage(imageUrl, imageFilePath);
          localImage = `/assets/blog/${slug}.jpg`;
        }

        savePost(item.title || '', item.contentSnippet || '', localImage);
        createdPostsCount++;
      }

      index++;
    }

    if (createdPostsCount === 0) {
      console.log('Nenhum novo post foi criado.');
    } else {
      console.log(`${createdPostsCount} novo(s) post(s) criado(s).`);
    }
  } catch (error: any) {
    console.error('Erro ao fazer scraping do RSS do G1:', error.message);
  }
}
