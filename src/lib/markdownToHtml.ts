export default async function markdownToHtml(markdown: string) {
  const { remark } = await import("remark");
  const html = await import("remark-html");

  const result = await remark().use(html.default).process(markdown);
  return result.toString();
}
