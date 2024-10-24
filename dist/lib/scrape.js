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
exports.scrapeG1 = scrapeG1;
var RSSParser = require("rss-parser");
var axios_1 = require("axios"); // Adicionar axios para fazer o download das imagens
var fs = require("fs");
var path = require("path");
var cheerio = require("cheerio"); // Importar o cheerio como um namespace
var parser = new RSSParser.default();
var G1_RSS_FEED = process.env.G1_RSS_FEED || 'https://g1.globo.com/rss/g1/saude/';
var BLOG_ASSETS_DIR = path.join(process.cwd(), 'public', 'assets', 'blog');
// Função para baixar a imagem
function downloadImage(url, filePath) {
    return __awaiter(this, void 0, void 0, function () {
        var response_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, axios_1.default)({
                            url: url,
                            responseType: 'stream',
                        })];
                case 1:
                    response_1 = _a.sent();
                    response_1.data.pipe(fs.createWriteStream(filePath));
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            response_1.data.on('end', function () { return resolve(); });
                            response_1.data.on('error', function (err) { return reject(err); }); // Definido o tipo do erro
                        })];
                case 2:
                    error_1 = _a.sent();
                    console.error('Erro ao baixar a imagem:', error_1.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// Função para extrair a URL da imagem do campo content
function extractImageUrl(content) {
    var $ = cheerio.load(content);
    var img = $('img'); // Encontra a primeira tag img
    return img.attr('src'); // Retorna o atributo src da imagem
}
function scrapeG1() {
    return __awaiter(this, void 0, void 0, function () {
        var feed, filteredItems, articles, _i, filteredItems_1, item, imageUrl, slug, localImage, imageFilePath, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    return [4 /*yield*/, parser.parseURL(G1_RSS_FEED)];
                case 1:
                    feed = _a.sent();
                    filteredItems = feed.items.filter(function (item) {
                        var _a, _b;
                        return ((_a = item.title) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes('estresse')) ||
                            ((_b = item.title) === null || _b === void 0 ? void 0 : _b.toLowerCase().includes('massagem')) ||
                            (item.contentSnippet && (item.contentSnippet.toLowerCase().includes('estresse') || item.contentSnippet.toLowerCase().includes('massagem')));
                    });
                    console.log("Encontrados ".concat(filteredItems.length, " artigos sobre \"estresse\" ou \"massagem\"."));
                    articles = [];
                    _i = 0, filteredItems_1 = filteredItems;
                    _a.label = 2;
                case 2:
                    if (!(_i < filteredItems_1.length)) return [3 /*break*/, 6];
                    item = filteredItems_1[_i];
                    imageUrl = extractImageUrl(item.content || '');
                    slug = item.title ? item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : '';
                    localImage = '';
                    if (!imageUrl) return [3 /*break*/, 4];
                    imageFilePath = path.join(BLOG_ASSETS_DIR, "".concat(slug, ".jpg"));
                    return [4 /*yield*/, downloadImage(imageUrl, imageFilePath)];
                case 3:
                    _a.sent();
                    localImage = "/assets/blog/".concat(slug, ".jpg");
                    _a.label = 4;
                case 4:
                    articles.push({
                        title: item.title || '', // Verificação de que title não será undefined
                        contentSnippet: item.contentSnippet || '',
                        link: item.link || '',
                        content: item.content || '',
                        localImage: localImage,
                    });
                    _a.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 2];
                case 6: return [2 /*return*/, articles];
                case 7:
                    error_2 = _a.sent();
                    console.error('Erro ao fazer scraping do RSS do G1:', error_2.message);
                    return [2 /*return*/, []];
                case 8: return [2 /*return*/];
            }
        });
    });
}
