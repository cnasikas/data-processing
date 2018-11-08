APP=$1
HASH=$2
LOG="$APP.log"
cd "$(dirname "$0")"

cd ../ # zkp/pequin/pepper

./bin/pepper_verifier_$APP gen_input $APP.inputs $HASH

cd ./apps # zkp/pequin/pepper/apps

cp $APP/exo0 ../bin/
cd ../ # zkp/pequin/pepper

echo "$(date) construct proof" | tee -a $LOG
SECONDS=0
./bin/pepper_prover_$APP prove $APP.pkey $APP.inputs $APP.outputs $APP.proof

cd ../../utils # zkp/utils
./export proof ../pequin/pepper/prover_verifier_shared/$APP.proof
cd ../ # zkp
mv ./utils/proof.json ./pequin/pepper/prover_verifier_shared/$APP.json

echo "$(date) construct proof done, took $SECONDS seconds" | tee -a $LOG
