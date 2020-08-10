FROM node:lts

WORKDIR /usr/src/owl-frontend

COPY package*.json ./

RUN npm install

COPY . .
