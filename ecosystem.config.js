// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'post-scheduler',
      script: 'dist/lib/scheduler.js',    // Caminho para o script JavaScript compilado
      interpreter: 'node',                // Usa Node.js para interpretar JavaScript
      watch: false,                        // Não monitora alterações no arquivo
      env: {
        NODE_ENV: 'production',
        G1_RSS_FEED: process.env.G1_RSS_FEED || 'https://g1.globo.com/rss/g1/saude/',
        OPENAI_API_KEY: process.env.OPENAI_API_KEY || 'your_openai_api_key',
        // Adicione outras variáveis de ambiente necessárias aqui
      },
      instances: 1,                        // Número de instâncias
      autorestart: true,                   // Reinicia automaticamente se o processo falhar
      max_memory_restart: '1G',            // Reinicia se o processo consumir mais de 1GB de memória
      log_date_format: 'YYYY-MM-DD HH:mm Z', // Formato das datas nos logs
      error_file: './logs/error.log',      // Caminho para o log de erros
      out_file: './logs/out.log',          // Caminho para o log de saída
      merge_logs: true,                    // Mescla logs de diferentes instâncias
    },
  ],
};
