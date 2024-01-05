FROM node
RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY ./server/dist ./src
COPY ./server/.env .
COPY ./server/package*.json .
COPY ./server/static ./static
RUN mkdir secrets

RUN npm install
RUN npm install -g cross-env

EXPOSE 8002
CMD ["cross-env", "MODE=production", "node", "./src/main.js"]
