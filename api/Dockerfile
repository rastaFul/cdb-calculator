FROM node:lts-alpine3.12

WORKDIR /

COPY package.json ./
RUN yarn
ADD . .

RUN apk add --update tzdata
ENV TZ=America/Sao_Paulo
RUN rm -rf /var/cache/apk/*

CMD ["yarn", "start"]
