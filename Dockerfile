FROM nikolaik/python-nodejs:python3.10-nodejs16-alpine
RUN apk update
RUN apk add make gcc g++
RUN npm install -g truffle
RUN mkdir -p /var/app
WORKDIR /var/app
