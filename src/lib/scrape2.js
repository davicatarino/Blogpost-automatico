"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = main;
var openAiClient_1 = require("./openAiClient");
var fs = require("fs");
var path = require("path");
var axios_1 = require("axios");
var cheerio = require("cheerio");
var __filename = ((_a = require.main) === null || _a === void 0 ? void 0 : _a.filename) || '';
var __dirname = path.dirname(__filename);
var BLOG_POSTS_DIR = './../../_posts';
// Cria o diretório de posts se não existir
var postsDirPath = path.join(__dirname, BLOG_POSTS_DIR);
if (!fs.existsSync(postsDirPath)) {
    fs.mkdirSync(postsDirPath, { recursive: true });
}
// Função para baixar a imagem
function downloadImage(url, filePath) {
    return __awaiter(this, void 0, void 0, function () {
        var response_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, (0, axios_1.default)({ url: url, responseType: 'stream' })];
                case 1:
                    response_1 = _a.sent();
                    response_1.data.pipe(fs.createWriteStream(filePath));
                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                            response_1.data.on('end', resolve);
                            response_1.data.on('error', reject);
                        })];
                case 2:
                    _a.sent();
                    return [2 /*return*/, filePath];
                case 3:
                    error_1 = _a.sent();
                    console.error('Erro ao baixar a imagem:', error_1.message);
                    return [2 /*return*/, ''];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Função para capturar links de notícias e snippets da página principal
function scrapeCNN() {
    return __awaiter(this, void 0, void 0, function () {
        var articles, cnnSaudeUrl, data, $_1, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    articles = [];
                    cnnSaudeUrl = 'https://www.cnnbrasil.com.br/saude/';
                    console.log("Capturando links de not\u00EDcias de ".concat(cnnSaudeUrl));
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1.default.get(cnnSaudeUrl)];
                case 2:
                    data = (_a.sent()).data;
                    $_1 = cheerio.load(data);
                    $_1('.home__list__item a.home__list__tag').each(function (_, element) {
                        var link = $_1(element).attr('href');
                        var title = $_1(element).find('.news-item-header__title').text().trim();
                        var contentSnippet = $_1(element).attr('title') || '';
                        if (link) {
                            articles.push({ title: title, contentSnippet: contentSnippet, link: link, localImage: '', content: '' });
                        }
                    });
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error('Erro ao capturar notícias da CNN:', error_2.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/, articles];
            }
        });
    });
}
// Função para capturar conteúdo detalhado de cada notícia
function fetchArticleContent(article) {
    return __awaiter(this, void 0, void 0, function () {
        var data, $, content, imageUrl, localImagePath, _a, error_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log("Capturando conte\u00FAdo detalhado da not\u00EDcia: ".concat(article.link));
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, axios_1.default.get(article.link)];
                case 2:
                    data = (_b.sent()).data;
                    $ = cheerio.load(data);
                    content = $('.single-content').text().trim();
                    imageUrl = $('.featured-image__img').attr('src');
                    if (!imageUrl) return [3 /*break*/, 4];
                    return [4 /*yield*/, downloadImage(imageUrl, path.join(BLOG_POSTS_DIR, "".concat(article.title, ".jpg")))];
                case 3:
                    _a = _b.sent();
                    return [3 /*break*/, 5];
                case 4:
                    _a = '';
                    _b.label = 5;
                case 5:
                    localImagePath = _a;
                    return [2 /*return*/, __assign(__assign({}, article), { content: content, localImage: localImagePath })];
                case 6:
                    error_3 = _b.sent();
                    console.error('Erro ao capturar conteúdo detalhado:', error_3.message);
                    return [2 /*return*/, article];
                case 7: return [2 /*return*/];
            }
        });
    });
}
// Gera conteúdo do post usando a API do OpenAI
function generatePostContent(title, description, link) {
    return __awaiter(this, void 0, void 0, function () {
        var prompt, response, error_4;
        var _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    prompt = "T\u00EDtulo: ".concat(title, "\nDescri\u00E7\u00E3o: ").concat(description, "\nLink: ").concat(link);
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, openAiClient_1.default.chat.completions.create({
                            model: 'gpt-4',
                            messages: [
                                { role: 'system', content: 'Você é um assistente que resume as notícias em 50% em formato de blogpost. Imprima somente texto puro do resumo das matérias e adicione ao final o link da fonte.' },
                                { role: 'user', content: prompt },
                            ],
                            max_tokens: 300,
                            temperature: 0.5,
                        })];
                case 2:
                    response = _e.sent();
                    return [2 /*return*/, ((_d = (_c = (_b = (_a = response === null || response === void 0 ? void 0 : response.choices) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.message) === null || _c === void 0 ? void 0 : _c.content) === null || _d === void 0 ? void 0 : _d.trim()) || null];
                case 3:
                    error_4 = _e.sent();
                    console.error('Erro ao gerar conteúdo com OpenAI:', error_4.message);
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Salva o post gerado como arquivo .md
function savePost(title, content, image) {
    var date = new Date().toISOString();
    var slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    var excerpt = content.substring(0, 150).replace(/\n/g, ' ').replace(/"/g, '\\"');
    var frontMatter = "---\ntitle: \"".concat(title, "\"\nexcerpt: \"").concat(excerpt, "\"\ncoverImage: \"").concat(image || '/assets/blog/default.jpg', "\"\ndate: \"").concat(date, "\"\nogImage:\n  url: \"").concat(image || '/assets/blog/default.jpg', "\"\n---\n\n").concat(content, "\n");
    var filePath = path.join(postsDirPath, "".concat(date.split('T')[0], "-").concat(slug, ".md"));
    fs.writeFileSync(filePath, frontMatter, 'utf8');
    console.log("Post \"".concat(title, "\" salvo em ").concat(filePath));
}
// Função principal para coordenar o scraping e geração de posts
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var latestArticles, articlesToProcess, _i, articlesToProcess_1, article, existingFilePath, detailedArticle, content;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, scrapeCNN()];
                case 1:
                    latestArticles = _a.sent();
                    articlesToProcess = latestArticles.slice(0, 2);
                    _i = 0, articlesToProcess_1 = articlesToProcess;
                    _a.label = 2;
                case 2:
                    if (!(_i < articlesToProcess_1.length)) return [3 /*break*/, 7];
                    article = articlesToProcess_1[_i];
                    existingFilePath = path.join(postsDirPath, "".concat(article.title, ".md"));
                    if (fs.existsSync(existingFilePath)) {
                        console.log("Post \"".concat(article.title, "\" j\u00E1 existe. Pulando..."));
                        return [3 /*break*/, 6];
                    }
                    return [4 /*yield*/, fetchArticleContent(article)];
                case 3:
                    detailedArticle = _a.sent();
                    if (!detailedArticle.content) return [3 /*break*/, 5];
                    return [4 /*yield*/, generatePostContent(detailedArticle.title, detailedArticle.contentSnippet, detailedArticle.link)];
                case 4:
                    content = _a.sent();
                    if (content) {
                        savePost(detailedArticle.title, content, detailedArticle.localImage);
                    }
                    else {
                        console.error("Falha ao gerar conte\u00FAdo para o post: \"".concat(detailedArticle.title, "\""));
                    }
                    return [3 /*break*/, 6];
                case 5:
                    console.error("Conte\u00FAdo da not\u00EDcia \"".concat(article.title, "\" est\u00E1 vazio. Pulando..."));
                    _a.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 2];
                case 7: return [2 /*return*/];
            }
        });
    });
}
