FROM node:10.15.3
# To make it a non root user: chown -R node:node /home/node/app
RUN mkdir -p /app/server
WORKDIR /app/server
COPY package*.json ./
#USER node
RUN npm install
# Bundle app source
COPY . /app/server
EXPOSE 5000
CMD npm start
