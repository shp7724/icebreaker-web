FROM node:21-alpine as build
WORKDIR /usr/src/app
COPY package.json ./
RUN yarn
COPY ./ ./
RUN yarn build

FROM nginx
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d