FROM node:stretch

WORKDIR /api-node-challenge

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "start" ]