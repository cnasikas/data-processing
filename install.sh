#!/bin/bash

cd "$(dirname "$0")"

git submodule init
git submodule update

yarn install

cd lib/util
yarn install
yarn link

cd ../dataset-manager
yarn install
yarn link

cd ../blockchain
yarn install
yarn link
yarn link "data-market-utils"

cd ../db
yarn install
yarn link
yarn link "blockchain"

cd ../sjcl-all
yarn link

cd ../total-crypto
yarn install
yarn link
yarn link "sjcl-all"
yarn link "data-market-utils"

cd ../../cli
yarn install
yarn link "sjcl-all"
yarn link "blockchain"
yarn link "total-crypto"
yarn link "data-market-utils"
yarn link "data-market-db"
yarn link "dataset-manager"

cd ../api
yarn install
yarn link "blockchain"
yarn link "total-crypto"
yarn link "data-market-utils"
yarn link "data-market-db"
yarn link "dataset-manager"

cd ../dapp
yarn install
yarn link "blockchain"

cd ../processor
yarn install
yarn link "blockchain"
yarn link "total-crypto"
yarn link "data-market-utils"
yarn link "data-market-db"
yarn link "dataset-manager"

cd ../controller
yarn install
yarn link "blockchain"
yarn link "total-crypto"
yarn link "data-market-utils"
yarn link "data-market-db"
yarn link "dataset-manager"

cd ../explorer
yarn install
yarn link "blockchain"
yarn link "total-crypto"
yarn link "data-market-utils"
yarn link "data-market-db"
