FROM node:alpine as build
# patch build image
#patch
RUN apk update
RUN apk upgrade
RUN apk add --no-cache \
    autoconf \
    automake \
    bash \
    g++ \
    libc6-compat \
    libjpeg-turbo-dev \
    libpng-dev \
    make \
    nasm

COPY ./ /project
WORKDIR /project
RUN yarn; npm run webpack:prod

FROM nginx:alpine

# Patch runtime image
RUN apk update
RUN apk upgrade

RUN rm -rf /usr/share/nginx/html
COPY docker/skeleton.conf /etc/nginx/conf.d/
COPY --from=build /project/target/resources/main/public /usr/share/nginx/html
