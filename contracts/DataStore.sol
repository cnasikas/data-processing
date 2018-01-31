pragma solidity ^0.4.11;

/**
 * Contract responsible for handling the metaData
 * In the future will be hash pointers to a db
 */

contract DataStore {

    address public owner;

    mapping (address => string) public dataStore;

    function DataStore () public {
        owner = msg.sender;
    }

    function publishData(address userAddr, string dataHash) public {
        dataStore[userAddr] = dataHash;
    }

    function getData(address userAddr) public constant returns (string) {
        return dataStore[userAddr];
    }
}
