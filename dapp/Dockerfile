FROM nginx:alpine

RUN sudo apt-get update && \
    sudo apt-get upgrade && \
    sudo apt-get install curl
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

RUN yarn install
RUN yarn build
