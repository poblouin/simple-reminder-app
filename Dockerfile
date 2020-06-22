# develop stage
FROM node:lts-slim as develop-stage
WORKDIR /app
COPY package*.json ./
RUN npm ci --silent
COPY . .

# builder
FROM arm32v7/node:lts-slim as builder
WORKDIR /app
COPY package*.json ./
RUN apt-get update \ 
    && apt-get install -y python make g++ --no-install-recommends \
    && npm ci --silent

FROM arm32v7/node:lts-slim as build-stage
WORKDIR /app
COPY package*.json ".env" ".env.production" ./
COPY --from=builder /app/node_modules .
COPY . .

# production-stage
FROM  arm32v7/nginx:alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY default.conf /etc/nginx/conf.d
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]