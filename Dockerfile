FROM node:16-alpine3.12

WORKDIR app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3000

ENTRYPOINT ["npm", "start"]
