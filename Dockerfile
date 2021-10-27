FROM node:latest as builder
COPY package.json .
#COPY yarn.lock .
#RUN npm install -g npm@7.7.6
RUN npm install -g npm@7.11.1
RUN npm install --legacy-peer-deps
RUN npm install btoa
COPY . .
COPY oncoprint.bundle.js ~/node_modules/oncoprintjs/dist/
RUN npm run build
FROM nginx:1.15.2-alpine
RUN rm -rf /etc/nginx/conf.d
#COPY nginx.conf /etc/nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /build /usr/share/nginx/html/
WORKDIR /usr/share/nginx/html
EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]
#CMD ["/bin/sh", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]
CMD ["nginx", "-g", "daemon off;"]
