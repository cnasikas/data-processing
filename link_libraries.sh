#!/bin/bash

cd "$(dirname "$0")"

cd lib/util
yarn link

cd ../dataset-manager
yarn link
yarn link "data-market-utils"

cd ../blockchain
yarn link
yarn link "data-market-utils"

cd ../db
yarn link
yarn link "blockchain"
yarn link "data-market-utils"

cd ../sjcl-all
yarn link

cd ../total-crypto
yarn link
yarn link "sjcl-all"
yarn link "data-market-utils"

cd ../../cli
yarn link "sjcl-all"
yarn link "blockchain"
yarn link "total-crypto"
yarn link "data-market-utils"
yarn link "data-market-db"
yarn link "dataset-manager"

cd ../api
yarn link "blockchain"
yarn link "total-crypto"
yarn link "data-market-utils"
yarn link "data-market-db"
yarn link "dataset-manager"

cd ../dapp
yarn link "blockchain"

cd ../processor
yarn link "blockchain"
yarn link "total-crypto"
yarn link "data-market-utils"
yarn link "data-market-db"
yarn link "dataset-manager"

cd ../controller
yarn link "blockchain"
yarn link "total-crypto"
yarn link "data-market-utils"
yarn link "data-market-db"
yarn link "dataset-manager"

cd ../explorer
yarn link "blockchain"
yarn link "total-crypto"
yarn link "data-market-utils"
yarn link "data-market-db"
