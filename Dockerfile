FROM ubuntu:20.04
RUN apt-get update
WORKDIR /tmp
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_16.x -o nodesource_setup.sh
RUN bash nodesource_setup.sh
RUN apt-get update
RUN apt-get install -y nodejs
RUN apt install -y nginx
WORKDIR /var/www/html/ncc/
RUN export NODE_OPTIONS=--openssl-legacy-provider
RUN node -v
# RUN apt-get install -y npm
RUN npm install -g npm@6.14.18
# RUN npm install -g npm
RUN node -v
RUN npm install btoa
RUN apt-get install -y vim
RUN npm install -g serve
EXPOSE 8282
COPY . .
RUN npm install --legacy-peer-deps
COPY oncoprint.bundle.js node_modules/oncoprintjs/dist/

# for production
RUN npm run build
COPY nginx.conf /etc/nginx/sites-enabled/default
WORKDIR /var/www/html/ncc/build/

RUN mkdir k-core
RUN mv static/ k-core/  
RUN mv favicon.ico k-core/
RUN mv manifest.json k-core/
EXPOSE 80
RUN service nginx start


# docker run -it -v /mnt/d/React-WorkSpace/nccsc-frontend:/home/nccsc-frontend  -p 3002:8282  nccsc-frontend:0.1 bash 





# New code
# Use an appropriate base image with Node.js 16 for the builder stage
FROM node:16.12-alpine as builder

# Set the working directory
WORKDIR /app

# Copy package files to the container
COPY package.json .
COPY package-lock.json .

# Install 'btoa' package using npm
RUN npm install btoa

# Install 'vim' using apk (Alpine package manager)
RUN apk update && apk add --no-cache vim

# Install 'serve' globally using npm
RUN npm install -g serve

# Clean npm cache
RUN npm cache clean --force

# Install project dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application files
COPY . .

# Copy the oncoprint bundle.js into the specified folder
COPY oncoprint.bundle.js node_modules/oncoprintjs/dist/

# Build the application
RUN npm run build

# Use Nginx as the web server for the second stage
FROM nginx:1.23-alpine

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Set the working directory
WORKDIR /usr/share/nginx/html

# Copy built files from the builder stage to the nginx server directory
COPY --from=builder /app/build .

# Create the 'k-core' directory and move necessary files
RUN mkdir k-core \
    && mv static/ k-core/ \
    && mv favicon.ico k-core/ \
    && mv manifest.json k-core/

# Expose port 80
EXPOSE 80

# inside container to start nginx command just type
# nginx