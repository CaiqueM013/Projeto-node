# Usa uma imagem leve do Node
FROM node:20-alpine

# Define o diretório de trabalho
WORKDIR /app

# Instala dependências
COPY package*.json ./
RUN npm ci

# Copia o restante dos arquivos e builda
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]