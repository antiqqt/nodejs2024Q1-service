### Builder
FROM node:lts-alpine as builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm i

COPY . .

RUN npm run build

### Runner
FROM node:lts-alpine as runner

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/doc ./doc
COPY package*.json ./

RUN npm i

CMD [ "node", "dist/main"]
