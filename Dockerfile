FROM node:10.15.3-alpine
WORKDIR /app
ADD . /app
COPY . .
RUN npm install
EXPOSE 5000
CMD npm start
