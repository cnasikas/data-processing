#!/bin/bash

ABS_PATH="$(dirname $(readlink -f $0))"
cd "$(dirname "$0")"

cd zkp/pequin

./install_debian_ubuntu.sh

cd ..

export LIBSNARK=$ABS_PATH/zkp/pequin/thirdparty/libsnark
make utils
