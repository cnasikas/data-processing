pragma solidity ^0.4.11;


contract Evaluation {
    bytes public data;
    bytes public hash;

    event StoreLog(bytes _data);

    function storeData(bytes _data) public {
        data = _data;
    }

    function storeHash(bytes _hash) public {
        hash = _hash;
    }

    function storeEvent(bytes _data) public {
        StoreLog(_data);
    }
}
