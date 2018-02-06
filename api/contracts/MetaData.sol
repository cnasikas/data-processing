pragma solidity ^0.4.2;

/**
 * Contract responsible for handling the metaData
 * In the future will be hash pointers to a db
 */

contract MetaData {
    
    address public owner;
    
    bytes32 message;

	function MetaData (bytes32 _message) {
		owner = msg.sender;
		message = _message;
	}
	
	function get() constant returns (bytes32) {
        return message;
    }
}
