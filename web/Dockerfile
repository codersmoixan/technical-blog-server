FROM nginx:1.22.0

COPY build /etc/nginx/html
COPY conf /etc/nginx

#FROM node:14-alpine
#
#RUN mkdir /tb_frontend
#WORKDIR /tb_frontend
#
#COPY ./package*.json /tb_frontend
#
#RUN npm install
#
#COPY . /tb_frontend
#
#CMD npm run dev
