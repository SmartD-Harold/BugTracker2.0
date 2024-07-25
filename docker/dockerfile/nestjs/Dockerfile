# cd / (project root)
# docker build -t bug_tracker/backend-nestjs -f docker/dockerfile/nestjs/Dockerfile .
# https://github.com/Vivify-Ideas/nestjs-boilerplate/blob/master/Dockerfile

FROM node:lts-alpine as build-stage

RUN npm i -g pnpm

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .

RUN pnpm build
RUN pnpm prune --prod

FROM node:lts-alpine as deploy-stage

WORKDIR /app
COPY --from=build-stage /app/node_modules ./node_modules
COPY --from=build-stage /app/package*.json ./
COPY --from=build-stage /app/dist/ ./dist/

ENV NODE_ENV production
EXPOSE 3000

#CMD [ "node", "dist/src/main.js" ]
CMD [ "npm", "run", "start:prod" ]

