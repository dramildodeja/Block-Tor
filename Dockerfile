FROM node:6.10
MAINTAINER RD17 "dodeja_dramil@hotmail.com"

ENV TZ=America/Phoenix
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app

CMD node dist --port=${port}
EXPOSE 8080