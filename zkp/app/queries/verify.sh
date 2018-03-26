#!/bin/bash

# proof of balance example
APP=$1
LOG="$APP.log"
cd "$(dirname "$0")"
cd ../

echo "$(date) verify proof" | tee -a $LOG
SECONDS=0
./bin/pepper_verifier_$APP verify $APP.vkey $APP.inputs $APP.outputs $APP.proof
echo "$(date) verify proof done, took $SECONDS seconds" | tee -a $LOG
