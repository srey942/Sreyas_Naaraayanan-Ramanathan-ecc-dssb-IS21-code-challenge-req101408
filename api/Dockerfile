# Base image
FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm ci

COPY . .

# Bundle app source
EXPOSE 3000

# Start the server using the production build
CMD [ "npm", "run", "dev" ]
