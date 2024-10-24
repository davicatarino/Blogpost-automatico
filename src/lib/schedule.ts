import cron from 'node-cron';
import { main as generatePost } from './generatePost';

// Agendar a geração de 2 posts a cada 5 minutos
cron.schedule('*/2 * * * *', async () => {
  console.log('Iniciando geração automática de posts a cada 5 minutos...');
  try {
    await generatePost();
    console.log('Posts gerados com sucesso.');
  } catch (error) {
    console.error('Erro ao gerar posts automaticamente:', error);
  }
});

console.log('Cron job configurado para rodar a cada 5 minutos.');
