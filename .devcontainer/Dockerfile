FROM mcr.microsoft.com/devcontainers/typescript-node:16

WORKDIR /usr/src/app

# copy all files
COPY package.json yarn.lock

# install dependencies
RUN yarn install
