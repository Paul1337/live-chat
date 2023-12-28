FROM node
RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY ./server/dist .
COPY ./server/package*.json .
COPY ./server/static ./static

RUN npm install

EXPOSE 8002
CMD ["node", "./main.js"]
