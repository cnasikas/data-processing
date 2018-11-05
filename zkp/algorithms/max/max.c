#include <stdint.h>
#include "max.h"

void compute(struct In* input, struct Out* output){
    uint32_t data[TOTAL_DATA];
    uint32_t max = 0;
    output->valid = 0;
    int i;

    // These must be statically allocated to compile,
    // even though we don't need them.
    uint32_t exo0_input1[1] = {1};
    uint32_t *exo0_inputs[1] = {exo0_input1};
    uint32_t exo0_inputs_lengths[1] = {1};

    exo_compute(exo0_inputs, exo0_inputs_lengths, data, 0);

    for (i = 0; i < TOTAL_DATA; ++i) {
      if(data[i] > max) {
        max = data[i];
      }
    }

    if(input->digest == 1){
      output->valid = 1;
    }

    output->max = max;

    return output->valid;
}
