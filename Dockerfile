FROM node:21-alpine as build

ADD package.json .
ADD package-lock.json .

RUN npm install --frozen-lock

COPY . .

RUN npm run build

FROM node:21-alpine

RUN wget -q -t3 'https://packages.doppler.com/public/cli/rsa.8004D9FF50437357.key' -O /etc/apk/keys/cli@doppler-8004D9FF50437357.rsa.pub && \
    echo 'https://packages.doppler.com/public/cli/alpine/any-version/main' | tee -a /etc/apk/repositories && \
    apk add doppler

ADD package.json .
ADD package-lock.json .

RUN npm install --omit=dev --frozen-lock

COPY --from=build ./dist ./dist
COPY ./public ./public

CMD ["doppler", "run", "--", "node", "dist/main.js"]
