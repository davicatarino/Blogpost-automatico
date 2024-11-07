import pkg from './scrape.js';
const { main } = pkg;

// Restante do código
import { schedule } from 'node-cron';

schedule('0 */6 * * *', async () => {
  console.log('Iniciando a geração de posts...');
  try {
    await main();
    console.log('Geração de posts concluída com sucesso.');
  } catch (error) {
    console.error('Erro na geração de posts:', error);
  }
});

console.log('Scheduler iniciado. Aguardando a próxima execução...');
