import sys
import binascii


def read_bytes(file, arr):
    with open(file, 'rb') as file:
        for line in file:
            arr.append(binascii.hexlify(line))


def write_file(file, arr):
    with open(file, 'wb') as file:
        for el in arr:
            file.write(el)


def main():
    if(len(sys.argv) != 2):
        print("Usage " + sys.argv[0] + " <file>")
        sys.exit(1)

    data = []
    read_bytes(sys.argv[1], data)
    data = [binascii.unhexlify(x) for x in data]
    write_file('test.proof', data)


if __name__ == '__main__':
    main()
