#define HEX_LEN 64
#define TOTAL_DATA 5

struct In {
  uint32_t digest;
};

struct Out {
  int valid;
  uint32_t average;
};
