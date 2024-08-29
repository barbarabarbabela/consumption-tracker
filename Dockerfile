FROM node:20-alpine3.20

WORKDIR /usr/src/app

COPY package.json package-lock.json .env ./

COPY ./src ./src

RUN npm install

EXPOSE 3000

CMD npm run start
