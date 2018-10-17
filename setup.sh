#!/bin/bash

cd "$(dirname "$0")"

./install.sh
./link_libraries.sh

yarn compile

./build.sh
