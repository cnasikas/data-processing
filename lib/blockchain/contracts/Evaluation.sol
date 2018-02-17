pragma solidity ^0.4.11;


contract Evaluation {
    bytes public data;

    function storeData(bytes _data) public {
        data = _data;
    }
}
