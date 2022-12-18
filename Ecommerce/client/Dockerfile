FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

RUN mkdir -p /usr/src/proto

# Bundle app source
COPY ./proto/orders_service.proto /usr/src/proto 
COPY . .

EXPOSE 3000
CMD [ "node", "src/client.js"]