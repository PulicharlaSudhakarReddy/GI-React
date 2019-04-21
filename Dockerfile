FROM node:10.15.3-alpine
WORKDIR /app
COPY . .
RUN npm --verbose install
EXPOSE 5000
CMD npm start
