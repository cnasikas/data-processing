pragma solidity ^0.4.2;

/**
 * Contract responsible for handling the data
 */

contract Data {
    
    address public owner;
    
    uint[] storedData;

	function Data (uint[] x) {
		owner = msg.sender;
		storedData = x;
	}
	
	function get() constant returns (uint[]) {
        return storedData;
    }
}
