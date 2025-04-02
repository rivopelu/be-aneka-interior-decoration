FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM node:22-alpine AS production

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY --from=build /app/dist ./dist

EXPOSE 9090

CMD ["node", "dist/app.js"]