// src/lib/scrape2.ts
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
// Configuração para obter o diretório com ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Diretórios para salvar posts e imagens
const BLOG_POSTS_DIR = path.resolve(__dirname, '../../_posts');
const IMAGES_DIR = path.join(process.cwd(), 'public', 'assets', 'blog');
// Cria os diretórios de posts e imagens se não existirem
if (!fs.existsSync(BLOG_POSTS_DIR)) {
    fs.mkdirSync(BLOG_POSTS_DIR, { recursive: true });
}
if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
}
// Função para baixar a imagem
async function downloadImage(url, filePath) {
    try {
        const response = await axios({ url, responseType: 'stream' });
        const writer = fs.createWriteStream(filePath);
        response.data.pipe(writer);
        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });
        return filePath;
    }
    catch (error) {
        console.error('Erro ao baixar a imagem:', error.message);
        return '';
    }
}
// Função para capturar links de notícias e snippets da página principal
async function scrapeCNN() {
    const articles = [];
    const cnnSaudeUrl = 'https://www.cnnbrasil.com.br/saude/';
    console.log(`Capturando links de notícias de ${cnnSaudeUrl}`);
    try {
        const { data } = await axios.get(cnnSaudeUrl);
        const $ = cheerio.load(data);
        $('.home__list__item a.home__list__tag').each((_, element) => {
            const link = $(element).attr('href');
            const title = $(element).find('.news-item-header__title').text().trim();
            const contentSnippet = $(element).attr('title') || '';
            if (link && title) {
                articles.push({ title, contentSnippet, link, localImage: '', content: '' });
            }
        });
    }
    catch (error) {
        console.error('Erro ao capturar notícias da CNN:', error.message);
    }
    return articles;
}
// Função para capturar conteúdo detalhado de cada notícia
async function fetchArticleContent(article) {
    console.log(`Capturando conteúdo detalhado da notícia: ${article.link}`);
    try {
        const { data } = await axios.get(article.link);
        const $ = cheerio.load(data);
        const content = $('.single-content').text().trim();
        const imageUrl = $('.featured-image__img').attr('src');
        const sanitizedTitle = article.title.replace(/[^a-z0-9]+/gi, '-').toLowerCase();
        const imageFileName = `${sanitizedTitle}.jpg`;
        const localImagePath = imageUrl
            ? await downloadImage(imageUrl, path.join(IMAGES_DIR, imageFileName))
            : '';
        // Define a URL relativa para o image
        const relativeImagePath = localImagePath ? `/assets/blog/${imageFileName}` : '';
        return { ...article, content, localImage: relativeImagePath };
    }
    catch (error) {
        console.error('Erro ao capturar conteúdo detalhado:', error.message);
        return article;
    }
}
// Salva o post gerado como arquivo .md
function savePost(title, content, image) {
    const date = new Date().toISOString();
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const formattedDate = date.split('T')[0]; // Exemplo: 2023-10-29
    const postSlug = `${formattedDate}-${slug}`;
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
    const filePath = path.join(BLOG_POSTS_DIR, `${postSlug}.md`);
    fs.writeFileSync(filePath, frontMatter, 'utf8');
    console.log(`Post "${title}" salvo em ${filePath}`);
}
// Função principal para coordenar o scraping e geração de posts
async function main() {
    const latestArticles = await scrapeCNN();
    const articlesToProcess = latestArticles.slice(0, 2); // Limita a 2 artigos
    for (const article of articlesToProcess) {
        const sanitizedTitle = article.title.replace(/[^a-z0-9]+/gi, '-').toLowerCase();
        const date = new Date().toISOString();
        const formattedDate = date.split('T')[0];
        const slug = `${formattedDate}-${sanitizedTitle}`;
        const existingFilePath = path.join(BLOG_POSTS_DIR, `${slug}.md`);
        if (fs.existsSync(existingFilePath)) {
            console.log(`Post "${article.title}" já existe. Pulando...`);
            continue;
        }
        const detailedArticle = await fetchArticleContent(article);
        if (detailedArticle.content) {
            savePost(detailedArticle.title, detailedArticle.content, detailedArticle.localImage);
        }
        else {
            console.error(`Conteúdo da notícia "${article.title}" está vazio. Pulando...`);
        }
    }
}
// Chamada da função principal
main().catch(error => {
    console.error('Erro na execução principal:', error);
});
