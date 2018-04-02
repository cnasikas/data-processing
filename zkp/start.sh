#!/bin/bash

cd "$(dirname "$0")"
docker run -it --volume=$(pwd)/app/queries:/zkp/pepper/queries zkp /bin/bash
