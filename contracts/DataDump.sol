pragma solidity ^0.4.11;

contract DataDump {

    address public owner;

    event DataDumped(address indexed recipient, string dataHash);

    function DataDump () {
  		owner = msg.sender;
  	}

    function postData(address recipient, string hash) {
        DataDumped(recipient, hash);
    }
}
