FROM node
RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY ./server/dist ./src
COPY ./server/.env .
COPY ./server/package*.json .
COPY ./server/static ./static
RUN mkdir secrets

RUN npm install

EXPOSE 8002
CMD ["node", "./src/main.js"]
