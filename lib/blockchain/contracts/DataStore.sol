pragma solidity ^0.4.11;

/**
 * Contract responsible for handling the metaData
 * In the future will be hash pointers to a db
 */

contract DataStore {

    address public owner;

    struct Data {
        string hashPointer;
        string cipher;
    }

    mapping (address => Data) public dataStore;

    function DataStore () public {
        owner = msg.sender;
    }

    function publishData(address userAddr, string hashPointer, string cipher) public {

        dataStore[userAddr] = Data({
            hashPointer: hashPointer,
            cipher: cipher
        });
    }

    function getDataPointer(address userAddr) public constant returns (string) {
        return dataStore[userAddr].hashPointer;
    }

    function getKey(address userAddr) public constant returns (string) {
        return dataStore[userAddr].cipher;
    }
}
