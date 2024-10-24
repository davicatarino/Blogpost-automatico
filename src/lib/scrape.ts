
import * as RSSParser from 'rss-parser';

import axios from 'axios'; // Adicionar axios para fazer o download das imagens
import * as fs from 'fs';
import * as path from 'path';
import * as cheerio from 'cheerio'; // Importar o cheerio como um namespace

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

// Função para baixar a imagem
async function downloadImage(url: string, filePath: string): Promise<void> {
  try {
    const response = await axios({
      url,
      responseType: 'stream',
    });
    response.data.pipe(fs.createWriteStream(filePath));
    return new Promise((resolve, reject) => {
      response.data.on('end', () => resolve());
      response.data.on('error', (err: Error) => reject(err)); // Definido o tipo do erro
    });
  } catch (error: any) {
    console.error('Erro ao baixar a imagem:', error.message);
  }
}

// Função para extrair a URL da imagem do campo content
function extractImageUrl(content: string): string | undefined {
  const $ = cheerio.load(content);
  const img = $('img'); // Encontra a primeira tag img
  return img.attr('src'); // Retorna o atributo src da imagem
}

export async function scrapeG1(): Promise<Article[]> {
  try {
    const feed = await parser.parseURL(G1_RSS_FEED);
    const filteredItems = feed.items.filter(item =>
      item.title?.toLowerCase().includes('estresse') ||
      item.title?.toLowerCase().includes('massagem') ||
      (item.contentSnippet && (item.contentSnippet.toLowerCase().includes('estresse') || item.contentSnippet.toLowerCase().includes('massagem')))
    );

    console.log(`Encontrados ${filteredItems.length} artigos sobre "estresse" ou "massagem".`);

    const articles: Article[] = [];

    for (const item of filteredItems) {
      const imageUrl = extractImageUrl(item.content || '');
      const slug = item.title ? item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : '';

      let localImage = '';

      if (imageUrl) {
        const imageFilePath = path.join(BLOG_ASSETS_DIR, `${slug}.jpg`);
        await downloadImage(imageUrl, imageFilePath);
        localImage = `/assets/blog/${slug}.jpg`;
      }

      articles.push({
        title: item.title || '', // Verificação de que title não será undefined
        contentSnippet: item.contentSnippet || '',
        link: item.link || '',
        content: item.content || '',
        localImage,
      });
    }

    return articles;
  } catch (error: any) {
    console.error('Erro ao fazer scraping do RSS do G1:', error.message);
    return [];
  }
}
