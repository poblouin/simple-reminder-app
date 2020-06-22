# develop stage
FROM node:lts-slim as develop-stage
WORKDIR /app
COPY package*.json ./
RUN npm ci --silent
COPY . .

# build stage
FROM arm32v7/node:lts-slim as prebuild-stage
WORKDIR /app
COPY package*.json ".env" ".env.production" ./
RUN apt-get update \ 
    && apt-get install -y python make g++ --no-install-recommends \
    && npm ci --silent
COPY . .

FROM prebuild-stage as build-stage
RUN npm run build

# production-stage
FROM  arm32v7/nginx:alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY default.conf /etc/nginx/conf.d
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]