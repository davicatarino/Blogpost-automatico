"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = main;
var openAiClient_1 = require("../../src/lib/openAiClient");
var fs = require("fs");
var path = require("path");
var scrape_1 = require("../../src/lib/scrape");
var url_1 = require("url");
var path_1 = require("path");
var __filename = (0, url_1.fileURLToPath)(import.meta.url);
var __dirname = (0, path_1.dirname)(__filename);
var BLOG_POSTS_DIR = './../../_posts';
// Cria o diretório de posts se não existir
var postsDirPath = path.join(__dirname, BLOG_POSTS_DIR);
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
function generatePostContent(title, description, link) {
    return __awaiter(this, void 0, void 0, function () {
        var prompt, response, content, error_1;
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    prompt = "\n      utilize o t\u00EDtulo, descri\u00E7\u00E3o e link para gerar um conte\u00FAdo de blog sobre o assunto.\n\n      T\u00EDtulo: ".concat(title, "\n      Descri\u00E7\u00E3o: ").concat(description, "\n      Link: ").concat(link, "\n  ");
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, openAiClient_1.default.chat.completions.create({
                            model: 'gpt-4',
                            messages: [
                                { role: 'system', content: 'Você é um assistente que resume notícias para blogs. Não gere titulo e nem marcações de texto, imprima somente texto puro do resumo das matérias.' },
                                { role: 'user', content: prompt },
                            ],
                            max_tokens: 500,
                            temperature: 0.5,
                        })];
                case 2:
                    response = _d.sent();
                    if (response && ((_c = (_b = (_a = response.choices) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.message) === null || _c === void 0 ? void 0 : _c.content)) {
                        content = response.choices[0].message.content.trim();
                        return [2 /*return*/, content];
                    }
                    else {
                        console.error('A resposta da OpenAI não contém conteúdo válido.');
                        return [2 /*return*/, null];
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _d.sent();
                    console.error('Erro ao gerar conteúdo com o OpenAI:', error_1.response ? error_1.response.data : error_1.message);
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    });
}
/**
 * Salva o post gerado como um arquivo .md
 * @param {string} title - Título do post
 * @param {string} content - Conteúdo do post
 * @param {string} image - Caminho da imagem do post
 */
function savePost(title, content, image) {
    var date = new Date().toISOString();
    var slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    var excerpt = content.substring(0, 150).replace(/\n/g, ' ').replace(/"/g, '\\"');
    var frontMatter = "---\ntitle: \"".concat(title, "\"\nexcerpt: \"").concat(excerpt, "\"\ncoverImage: \"").concat(image || '/assets/blog/default.jpg', "\"\ndate: \"").concat(date, "\"\nogImage:\n  url: \"").concat(image || '/assets/blog/default.jpg', "\"\n---\n\n").concat(content, "\n");
    var fileName = "".concat(date.split('T')[0], "-").concat(slug, ".md");
    var filePath = path.join(postsDirPath, fileName);
    fs.writeFileSync(filePath, frontMatter, 'utf8');
    console.log("Post \"".concat(title, "\" salvo em ").concat(filePath));
}
/**
 * Função principal que coordena o scraping e a geração de posts
 * Limita para processar 2 artigos por vez.
 */
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var articles, articlesToProcess, _i, articlesToProcess_1, article, slug, fileName, filePath, content;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, scrape_1.scrapeG1)()];
                case 1:
                    articles = _a.sent();
                    articlesToProcess = articles.slice(0, 2);
                    _i = 0, articlesToProcess_1 = articlesToProcess;
                    _a.label = 2;
                case 2:
                    if (!(_i < articlesToProcess_1.length)) return [3 /*break*/, 5];
                    article = articlesToProcess_1[_i];
                    slug = article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                    fileName = "".concat(slug, ".md");
                    filePath = path.join(postsDirPath, fileName);
                    if (fs.existsSync(filePath)) {
                        console.log("Post \"".concat(article.title, "\" j\u00E1 existe. Pulando..."));
                        return [3 /*break*/, 4];
                    }
                    return [4 /*yield*/, generatePostContent(article.title, article.contentSnippet, article.link)];
                case 3:
                    content = _a.sent();
                    if (content) {
                        savePost(article.title, content, article.localImage);
                    }
                    else {
                        console.error("Falha ao gerar conte\u00FAdo para o post: \"".concat(article.title, "\""));
                    }
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/];
            }
        });
    });
}
