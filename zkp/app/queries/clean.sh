cd "$(dirname "$0")"
rm *.log
cd ..
rm -rf ./bin/*
rm -rf ./prover_verifier_shared/*

echo "Cleaned!"
