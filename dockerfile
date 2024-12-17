# Etapa de build
FROM node:18-alpine AS builder

# Definindo o diretório de trabalho
WORKDIR /app

# Copiando os arquivos de configuração e as dependências
COPY package*.json ./
COPY yarn.lock ./

# Instalando as dependências
RUN yarn install

# Copiando o código da aplicação
COPY . .

# Build da aplicação
RUN yarn build

# Etapa de produção
FROM nginx:alpine

# Copiando os arquivos estáticos gerados pelo Vite para o Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expondo a porta 80 para o servidor Nginx
EXPOSE 80

# Iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
