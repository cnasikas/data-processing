pragma solidity ^0.4.11;


contract Evaluation {
    bytes public data;
    bytes public hash;

    struct Data {
        bytes hashPointer;
    }

    mapping (address => Data) public dataStore;

    event StoreLog(bytes _data);

    function storeData(bytes _data) public {
        data = _data;
    }

    function storeHash(bytes _hash) public {
        hash = _hash;
    }

    function storeEvent(bytes _data) public {
        emit StoreLog(_data);
    }

    function storeToHashMap(bytes _hash) public {

        dataStore[msg.sender] = Data({
            hashPointer: _hash
        });
    }
}
