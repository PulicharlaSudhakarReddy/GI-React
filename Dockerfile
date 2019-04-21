FROM node:10.15.3-alpine
WORKDIR /app
COPY . .
EXPOSE 5000
CMD npm start
