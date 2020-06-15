# develop stage
FROM --platform=$BUILDPLATFORM node:lts-slim as develop-stage
WORKDIR /app
COPY package*.json ./
RUN apt-get update \ 
    && apt-get install -y python make g++ --no-install-recommends \
    && npm ci --silent
COPY . .

# build stage
FROM develop-stage as build-stage
RUN npm run build

# production stage
FROM  nginx:alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]