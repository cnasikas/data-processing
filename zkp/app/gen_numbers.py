import sys
import string
import argparse


def gen_random_nums(num, file):
    with open(file, 'w') as file:
        file.write("#!/bin/sh\n")
        for x in xrange(num):
            file.write("echo " + str(x) + "\n")


def main():
    if(len(sys.argv) != 3):
        print("Usage " + sys.argv[0] + "<num> <file>")
        sys.exit(1)
    gen_random_nums(int(sys.argv[1]), sys.argv[2])


if __name__ == '__main__':
    main()
