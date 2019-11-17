FROM node:10-alpine

WORKDIR /user/app
COPY package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE ${APP_PORT}
CMD ["yarn", "dev"]