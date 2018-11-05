#!/bin/bash

# proof of balance example
APP=$1
LOG="$APP.log"
cd "$(dirname "$0")"
cd ../

echo "$(date) verify proof" | tee -a $LOG
SECONDS=0
ts=$(date +%s%N);
./bin/pepper_verifier_$APP verify $APP.vkey $APP.inputs $APP.outputs $APP.proof
tt=$((($(date +%s%N) - $ts)/1000000));
echo "$(date) verify proof done, took $tt milliseconds" | tee -a $LOG
