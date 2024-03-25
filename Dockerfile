FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci

COPY . .

CMD [ "npm", "run", "start:dev" ]