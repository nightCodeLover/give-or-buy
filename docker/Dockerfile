FROM node:26-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY nest-cli.json tsconfig*.json ./

COPY src ./src

RUN npm run build


FROM node:26-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev && npm cache clean --force

COPY --from=build /app/dist ./dist

USER node

CMD ["node", "dist/main.js"]


