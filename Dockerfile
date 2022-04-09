FROM node:14-slim as build

ADD package.json .
ADD package-lock.json .

RUN npm install --frozen-lock

COPY . .

RUN npm run build

FROM node:14-slim

ADD package.json .
ADD package-lock.json .

RUN npm install --production --frozen-lock

COPY --from=build ./dist ./dist

CMD ["node", "dist/main.js"]
