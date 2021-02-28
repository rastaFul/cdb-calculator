FROM node:lts-alpine3.12

WORKDIR /

COPY package.json ./
RUN yarn install
ADD . .

RUN apk add --update tzdata
ENV TZ=America/Sao_Paulo
RUN rm -rf /var/cache/apk/*

RUN npm run build


EXPOSE 3000

CMD ["yarn", "run","start"]
