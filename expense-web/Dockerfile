# Etapa de build
FROM node:18-alpine AS builder

# Define o diretório de trabalho no contêiner
WORKDIR /app

# Copia os arquivos de dependências para o contêiner
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código da aplicação para o contêiner
COPY . .

# Faz o build da aplicação Next.js
RUN npm run build

# Etapa de produção
FROM node:18-alpine AS runner

# Define o diretório de trabalho no contêiner
WORKDIR /app

# Instala apenas as dependências de produção
COPY --from=builder /app/package.json /app/package-lock.json ./
RUN npm install --omit=dev

# Copia os arquivos de build da etapa anterior
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts

# Porta exposta
EXPOSE 3000

# Comando de execução da aplicação
CMD ["npm", "run", "start"]
