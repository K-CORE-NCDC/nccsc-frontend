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
RUN npm install -g npm
RUN node -v
RUN npm install btoa
RUN apt-get install -y vim
RUN npm install -g serve
COPY . .
RUN npm install
COPY oncoprint.bundle.js node_modules/oncoprintjs/dist/

#for production
RUN npm run build
COPY nginx.conf /etc/nginx/sites-enabled/default
WORKDIR /var/www/html/ncc/build/

RUN mkdir k-core
RUN mv static/ k-core/
RUN mv favicon.ico k-core/
RUN mv manifest.json k-core/
EXPOSE 80
RUN service nginx start








