import { configureEnv } from './config';
import OpenAI from 'openai';
// Configura as variáveis de ambiente
configureEnv();
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || '', // Adiciona verificação de chave vazia
});
export default openai;
