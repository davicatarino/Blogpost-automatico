// runGeneratePosts.ts
import { main } from './generatePost';

main()
  .then(() => {
    console.log('Geração de posts concluída com sucesso.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Erro na geração de posts:', error);
    process.exit(1);
  });
