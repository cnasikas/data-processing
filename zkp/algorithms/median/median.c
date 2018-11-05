#include <stdint.h>
#include "median.h"

void compute(struct In* input, struct Out* output){
    uint32_t data[TOTAL_DATA];
    uint32_t median = 0;
    uint32_t temp;
    output->valid = 0;
    int i, j;

    // These must be statically allocated to compile,
    // even though we don't need them.
    uint32_t exo0_input1[1] = {1};
    uint32_t *exo0_inputs[1] = {exo0_input1};
    uint32_t exo0_inputs_lengths[1] = {1};

    exo_compute(exo0_inputs, exo0_inputs_lengths, data, 0);

    /* O(n^2) , change to merge sort */
    for(i = 0; i < TOTAL_DATA; ++i){
        for(j = i + 1; j < TOTAL_DATA; ++j){
            if(data[i] > data[j]){
                temp = data[i];
                data[i] = data[j];
                data[j] = temp;
            }
        }
    }

    if(TOTAL_DATA % 2 == 0){
        median = (data[(TOTAL_DATA - 1) / 2] + data[TOTAL_DATA / 2]) / 2;
    }
    else{
        median = data[TOTAL_DATA / 2];
    }

    if(input->digest == 1){
      output->valid = 1;
    }

    output->median = median;

    return output->valid;
}
