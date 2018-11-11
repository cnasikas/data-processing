#!/bin/bash

cd "$(dirname "$0")"

cd lib/util
yarn build

cd ../blockchain
yarn build

cd ../../api
yarn build

cd ../dapp
yarn build

cd ../controller
yarn build

cd ../processor
yarn build
