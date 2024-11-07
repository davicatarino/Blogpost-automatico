# Use a imagem oficial do Node.js como base para o build
FROM node:18 AS builder

# Defina o diretório de trabalho
WORKDIR /app

# Copie o package.json e o package-lock.json
COPY package.json package-lock.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código para dentro do container
COPY . .

# Compile o TypeScript para JavaScript
RUN npm run build

# Remova dependências de desenvolvimento
RUN npm prune --production

# Crie o segundo estágio apenas para produção
FROM node:18

WORKDIR /app

# Copie os arquivos necessários do estágio de build
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Instale apenas dependências de produção
RUN npm install --only=production

EXPOSE 3004

CMD ["npm", "start"]
