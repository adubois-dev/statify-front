FROM node:20-alpine AS build

WORKDIR /app

#Copy package.json
COPY package.json package-lock.json ./


#Copy other files and folder to working directory
COPY . .

#Install dependencies
RUN npm install

# Serve Application using Nginx Server

#FROM nginx:alpine
#
#COPY --from=build /app/dist/angular-15-jwt-auth/ /usr/share/nginx/html
#
#EXPOSE 80
EXPOSE 8081
CMD ["./node_modules/.bin/ng","serve","--disable-host-check","--host", "0.0.0.0","--port","8081"]
