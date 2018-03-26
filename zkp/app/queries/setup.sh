#!/bin/bash

APP=$1
LOG="$APP.log"
cd "$(dirname "$0")"

echo "Start $APP setup!" | tee -a $LOG

echo "$(date) copy logic" | tee -a $LOG
cp $APP/$APP.c ../apps/
cp $APP/$APP.h ../apps/

cd ../
echo "$(date) verifier setup" | tee -a $LOG
SECONDS=0
./pepper_compile_and_setup_V.sh $APP $APP.vkey $APP.pkey
echo "$(date) verifier setup done, took $SECONDS seconds" | tee -a $LOG

echo "$(date) prover setup" | tee -a $LOG
SECONDS=0
./pepper_compile_and_setup_P.sh $APP
echo "$(date) prover setup done, took $SECONDS seconds" | tee -a $LOG
