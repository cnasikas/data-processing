import sys
import string
import binascii
import argparse


def is_hex(s):
    hex_digits = set(string.hexdigits)
    # if s is long, then it is faster to check against a set
    return all(c in hex_digits for c in s)


def hex_to_int(hex, arr):
    hex_array = map(''.join, zip(*[iter(hex)]*2))  # hex chars by two

    for hex in hex_array:
        arr.append(int(hex, 16))


def read_file(file, arr):
    with open(file, 'rb') as file:
        for line in file:
            arr.append(line)


def gen_numbers(num, arr):
    arr.append("#!/bin/sh")
    for x in xrange(num):
        arr.append("echo " + str(x))


def write_file(file, arr):
    with open(file, 'wb') as file:
        for el in arr:
            file.write(str(el) + "\n")


def main():
    parser = argparse.ArgumentParser(description='A helper utility for Perrer zkSNARKs')
    group = parser.add_mutually_exclusive_group()
    parser.add_argument('input', help='Input file or hex or total numbers')
    parser.add_argument('output', help='Output file')
    group.add_argument('-b', '--bytes', help='Convert a byte file to hex file', action='store_true')
    group.add_argument('-x', '--hex', help='Convert a hex file to byte file', action='store_true')
    group.add_argument('-n', '--numbers', help='Generate numbers for exo0', action='store_true')
    args = parser.parse_args()

    data = []

    if(args.bytes):
        read_file(args.input, data)
        data = [binascii.hexlify(x) for x in data]

    if(args.hex):
        if(not is_hex(args.input)):
            print('Input not a valid hex')
            sys.exit(1)
        hex_to_int(args.input, data)

    if(args.numbers):
        gen_numbers(int(args.input), data)

    write_file(args.output, data)


if __name__ == '__main__':
    main()
