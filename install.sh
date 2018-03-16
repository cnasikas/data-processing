#!/bin/bash

cd "$(dirname "$0")"

yarn install
cd lib/blockchain
yarn install
yarn link

cd ../sjcl-all
yarn link

cd ../total-crypto
yarn install
yarn link
yarn link "sjcl-all"

cd ../util
yarn install
yarn link

cd ../../cli
yarn install
yarn link "sjcl-all"
yarn link "blockchain"
yarn link "total-crypto"
yarn link "data-market-utils"

cd ../api
yarn install
yarn link "blockchain"
yarn link "total-crypto"
yarn link "data-market-utils"

cd ../dapp
yarn install

cd ../processor
yarn install
yarn link "blockchain"
yarn link "total-crypto"
yarn link "data-market-utils"

cd ../controller
yarn install
yarn link "blockchain"
yarn link "total-crypto"
yarn link "data-market-utils"
