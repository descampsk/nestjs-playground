FROM node:20-slim as build

ADD package.json .
ADD package-lock.json .

RUN npm install --frozen-lock

COPY . .

RUN npm run build

FROM node:20-slim

ADD package.json .
ADD package-lock.json .

RUN npm install --production --frozen-lock

COPY --from=build ./dist ./dist

EXPOSE 3000

CMD ["node", "dist/main.js"]
