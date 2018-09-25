#!/bin/bash

cd "$(dirname "$0")"

git submodule init
git submodule update

yarn install

cd lib/util
yarn install

cd ../dataset-manager
yarn install

cd ../blockchain
yarn install

cd ../db
yarn install

cd ../total-crypto
yarn install

cd ../../cli
yarn install

cd ../api
yarn install

cd ../dapp
yarn install

cd ../processor
yarn install

cd ../controller
yarn install

cd ../explorer
yarn install
