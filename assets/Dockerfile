ARG IMAGE_VERSION=20

FROM node:20-alpine as install-stage
ENV CI=1
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --production --ignore-optional

FROM install-stage as build-stage
ENV NODE_OPTIONS=--max_old_space_size=4096
RUN yarn install
COPY . .
RUN yarn build 

FROM node:20-slim as app-stage
ENV NODE_ENV=prod  \
    TZ=Asia/Shanghai
WORKDIR /usr/src/app
COPY --from=build-stage /app/node_modules ./node_modules 
COPY --from=build-stage /app/out ./out
COPY --from=build-stage /app/next.config.js ./
COPY --from=build-stage /app/public ./public
COPY ./package.json ./

EXPOSE 3000
ENV NODE_OPTIONS=--max_old_space_size=4096
CMD [ "yarn", "start" ]