import sys
import string


def is_hex(s):
    hex_digits = set(string.hexdigits)
    # if s is long, then it is faster to check against a set
    return all(c in hex_digits for c in s)


def hex_to_int(hex):
    hex_array = map(''.join, zip(*[iter(hex)]*2))  # hex chars by two
    int_array = []

    for hex in hex_array:
        int_array.append(int(hex, 16))

    return int_array


def save_to_file(arr, file):
    with open(file, 'w') as file:
        for el in arr:
            file.write("%s\n" % el)


def main():
    if(len(sys.argv) != 3):
        print("Usage " + sys.argv[0] + " <hex> <file>")
        sys.exit(1)

    if(is_hex(sys.argv[1]) and len(sys.argv[1]) == 64):
        save_to_file(hex_to_int(sys.argv[1]), sys.argv[2])
    else:
        print("Input is not a vadid sha256 hex")
        sys.exit(1)


if __name__ == '__main__':
    main()
