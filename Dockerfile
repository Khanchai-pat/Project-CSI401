FROM node:20.18-alpine
WORKDIR /app

COPY package*.json ./
COPY . . 

RUN yran

ENV PORT=9999
# ENV mongocloud="mongodb+srv://jirawatchn:x0SQAtgnGJqvgpMo@ecmscluster.3s7b3.mongodb.net/ECMS?retryWrites=true&w=majority&appName=ecmsCluster"
# EXPOSE 9999

CMD ["yarn", "nodemon"]