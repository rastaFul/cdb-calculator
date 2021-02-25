FROM node:lts-alpine3.12

WORKDIR /src

COPY package.json /src
RUN yarn install
ADD . .

RUN apk add --update tzdata
ENV TZ=America/Sao_Paulo
RUN rm -rf /var/cache/apk/*

CMD ["yarn", "start"]
