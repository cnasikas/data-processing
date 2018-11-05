APP=$1
LOG="$APP.log"
cd "$(dirname "$0")"

cp $APP/exo0 ../bin/
cp $APP/$APP.inputs ../prover_verifier_shared/$APP.inputs
cd ../

echo "$(date) construct proof" | tee -a $LOG
SECONDS=0
./bin/pepper_prover_$APP prove $APP.pkey $APP.inputs $APP.outputs $APP.proof

cd ./utils
./export proof ../prover_verifier_shared/$APP.proof
cd ../
mv ./utils/proof.json ./prover_verifier_shared/$APP.json

echo "$(date) construct proof done, took $SECONDS seconds" | tee -a $LOG
