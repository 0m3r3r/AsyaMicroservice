#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM node:14.16.0

WORKDIR /webui
COPY package.json /var/www/package.json
COPY yarn.lock /var/www/yarn.lock


RUN apt-get update || : && apt-get install python -y && apt-get install git
RUN python --version
#RUN apk add --no-cache git openssh
RUN git config --global url."https://".insteadOf git://

#ENV PYTHONUNBUFFERED=1
#RUN apk add --no-cache --virtual .gyp python3 make g++ py3-pip && ln -sf /usr/bin/python3 /usr/bin/python
#RUN which python
#RUN python3 -m ensurepip
#RUN pip3 install --no-cache --upgrade pip setuptools


RUN yarn install

COPY . /webui

ENV CI=true
ENV PORT=3000


ARG DOCKER_ENV
ENV NODE_ENV=development


EXPOSE ${PORT}
RUN npm rebuild node-sass

CMD ["yarn","start"]