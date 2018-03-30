cd "$(dirname "$0")"
APP=$1

./clean.sh
printf "\n\n==========================================\n\n"
./setup.sh $APP
printf "\n\n==========================================\n\n"
./prove.sh $APP
printf "\n\n==========================================\n\n"
./verify.sh $APP
printf "\n\n==========================================\n\n"

ls -lh ../proving_material/
printf "\n\n==========================================\n\n"
ls -lh ../verification_material/
printf "\n\n==========================================\n\n"
ls -la ../prover_verifier_shared/
