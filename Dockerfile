FROM ubuntu:20.04
RUN apt-get update
WORKDIR /tmp
RUN apt-get install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs
RUN apt-get update
RUN apt install -y nginx
WORKDIR /var/www/html/ncc/
RUN export NODE_OPTIONS=--openssl-legacy-provider
RUN npm install -g npm
RUN npm install btoa
RUN apt-get install -y vim
RUN npm install -g serve
COPY . .
RUN npm install
COPY oncoprint.bundle.js node_modules/oncoprintjs/dist/
RUN npm run build
COPY nginx.conf /etc/nginx/sites-enabled/default
WORKDIR /var/www/html/ncc/build/
RUN mkdir core
RUN mv static/ core/
RUN mv favicon.ico core/
RUN mv manifest.json core/
EXPOSE 80
RUN service nginx start



