#!/bin/bash

cd "$(dirname "$0")"

./install.sh
./build.sh
./link_libraries.sh
