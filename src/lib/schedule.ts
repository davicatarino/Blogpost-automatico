// scheduler.ts
import { schedule } from 'node-cron';
import * as dotenv from 'dotenv';
import {main}  from './generatePost';
dotenv.config();

// Agendar para executar a cada 6 horas
schedule('*/1 * * * *', async () => {
  console.log('Iniciando a geração de posts...');
  try {
    await main();
    console.log('Geração de posts concluída com sucesso.');
  } catch (error) {
    console.error('Erro na geração de posts:', error);
  }
});

// Manter o processo ativo
console.log('Scheduler iniciado. Aguardando a próxima execução...');
