FROM node:14.16.1 as build-step
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build
FROM nginx:1.17.1-alpine
EXPOSE 3000
COPY --from=build-step /app/build /usr/share/nginx/html

