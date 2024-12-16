# Base da imagem - Node.js
FROM node:18-alpine

ENV HOST 0.0.0.0

# Define o diretório de trabalho dentro do container
WORKDIR /app

COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o código da aplicação para o container
COPY . .

# Define a porta de exposição (opcional)
EXPOSE 3000

# Comando para executar a aplicação
CMD ["npm", "run", "start:dev"] 