pragma solidity ^0.4.11;

contract DataDump {

    function postData(address recipient, string hash) {
        DataDumped(recipient, hash);
    }
    
    event DataDumped(address indexed recipient, string dataHash);
}