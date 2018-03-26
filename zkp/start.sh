#!/bin/bash

docker run -it --volume=$1:/zkp/pepper/queries zkp /bin/bash
