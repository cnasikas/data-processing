FROM node:8.12.0

RUN apt-get update -y && \
    apt-get upgrade -y && \
    apt-get install sudo -y && \
    apt-get install apt-utils -y && \
    apt-get install curl -y && \
    apt-get install vim -y

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

RUN yarn install
RUN yarn build

CMD yarn serve
