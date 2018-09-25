#!/bin/bash

cd "$(dirname "$0")"

cd lib/blockchain
yarn build

cd ../../api
yarn build

cd ../dapp
yarn build

cd ../controller
yarn build

cd ../processor
yarn build
