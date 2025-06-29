# Dockerfile para desenvolvimento
FROM node:18-alpine

# Definir diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm ci

# Copiar código fonte
COPY . .

# Expor porta 3000
EXPOSE 3000

# Comando padrão para desenvolvimento
CMD ["npm", "start"] 