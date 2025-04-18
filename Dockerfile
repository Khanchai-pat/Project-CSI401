FROM node:20.18-alpine
WORKDIR /app

COPY . . 

RUN yarn

EXPOSE 9999

CMD ["yarn", "nodemon"]