FROM ubuntu:latest
WORKDIR /home/nccsc/
RUN apt-get update && apt-get install -y gnupg2
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys E1DD270288B4E6030699E45FA1715D88E1DF1F24
RUN apt-get install -y apt-transport-https ca-certificates curl software-properties-common
RUN apt-get install -y curl
ENV NODE_VERSION=14.17.0
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"
RUN node --version
RUN npm --version
WORKDIR /home/nccsc/
COPY . .
RUN npm -g install create-react-app



#RUN create-react-app ncc-frontend
#WORKDIR /home/nccsc/ncc-frontend
#ENTRYPOINT ["npm","start"]
