cd ./server && npm run build && cd ..
cd ./client && npm run build && cd ..
docker compose down
docker compose up -d --build