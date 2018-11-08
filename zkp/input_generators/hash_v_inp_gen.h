#include <iostream>
#include <string>
#include <vector>
#include <sstream>
#include <limits.h>
#include <unistd.h>
#include "helpers.h"

void sum_input_gen (mpq_t * input_q, int num_inputs, char *argv[]) {

    std::vector<int> bytearray;
    std::string hash = argv[3];

    hex_to_bytearray(hash, bytearray);

    for (int i = 0; i < bytearray.size(); i++) {
        mpq_set_ui(input_q[i],  bytearray[i], 1);
    }
}
