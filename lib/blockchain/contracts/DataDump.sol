pragma solidity ^0.4.11;


contract DataDump {

    function postData(bytes hash) public {
        DataDumped(hash);
    }

    event DataDumped(bytes dataHash);
}
