# syntax=docker/dockerfile:1

########################  build  #######################
FROM node:22-alpine AS build
WORKDIR /app

# @pedrolucaslopes/dotlog-ui vem do GitHub Packages, que exige token ate para
# instalar. O .npmrc versionado so diz ONDE buscar e le o token do ambiente. O
# token entra como secret do BuildKit: existe durante este RUN e nao fica em
# camada nenhuma. ARG e ENV ficariam gravados na imagem.
COPY package.json package-lock.json .npmrc ./
RUN --mount=type=secret,id=NODE_AUTH_TOKEN,env=NODE_AUTH_TOKEN npm ci

COPY . .
# `npm run build` roda type-check (vue-tsc), check:locales e vite build.
RUN npm run build

#######################  runtime  ######################
# nginx-unprivileged ja escuta em 8080 e roda como usuario nao-root.
FROM nginxinc/nginx-unprivileged:1.30-alpine AS runtime

COPY --chown=nginx:nginx nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build --chown=nginx:nginx /app/dist /usr/share/nginx/html
EXPOSE 8080
