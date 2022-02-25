FROM node:16.7.0

LABEL maintainer="TheBous thebous1993@gmail.com"

COPY package*.json /tmp/dapp/
RUN cd /tmp/dapp && npm i

COPY . /usr/src/dapp
RUN cp -a /tmp/dapp/node_modules /usr/src/dapp

WORKDIR /usr/src/dapp
