FROM node:16.15.1 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod
