FROM node:stretch

WORKDIR /Challenge-API-Nodejs-Users

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "start" ]