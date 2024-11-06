FROM node:alpine

WORKDIR /usr/app

COPY ./package.json ./
RUN npm install

# Installer l'outil de benchmarking Apache et les dépendances
RUN apk add --no-cache apache2-utils

# Installe le module Redis si nécessaire
RUN npm install redis

COPY ./ ./

CMD ["node", "index.js"]
