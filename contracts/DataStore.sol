pragma solidity ^0.4.2;

/**
 * Contract responsible for handling the metaData
 * In the future will be hash pointers to a db
 */

contract DataStore {
    
    address public owner;

    mapping (address => string) public dataStore;

	function DataStore () {
		owner = msg.sender
	}

	function publishData(address userAddr, string dataHash) {
    	dataStore[userAddr] = dataHash;
	}
	
	function getData(address userAddr) constant returns (string) {
        return dataStore[userAddr];
    }
}
