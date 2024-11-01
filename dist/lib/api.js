// src/lib/api.ts
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
const postsDirectory = join(process.cwd(), "_posts");
export function getPostSlugs() {
    // Filtra apenas arquivos com extensão .md
    return fs.readdirSync(postsDirectory).filter(file => file.endsWith('.md'));
}
export function getPostBySlug(slug) {
    const realSlug = slug.replace(/\.md$/, "");
    const fullPath = join(postsDirectory, `${realSlug}.md`);
    // Verifica se o arquivo existe antes de tentar lê-lo
    if (!fs.existsSync(fullPath)) {
        throw new Error(`Post não encontrado: ${fullPath}`);
    }
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    return { ...data, slug: realSlug, content };
}
export function getAllPosts() {
    const slugs = getPostSlugs();
    const posts = slugs
        .map((slug) => getPostBySlug(slug))
        // Ordena os posts por data em ordem decrescente
        .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
    return posts;
}
