pragma solidity ^0.4.11;


contract Requests {

    address public owner;

    struct Request {
        bytes32 addr;
        bool proof;
    }

    mapping(address => Request) public requests;

    event RequestProcess(address indexed reqAddr, bytes32 dataAddr);

    function Requests () public {
        owner = msg.sender;
    }

    function requestForProcess(address reqAddr, bytes32 dataAddr) public {

        requests[reqAddr] = Request({
            addr: dataAddr,
            proof: false
        });

        RequestProcess(reqAddr, dataAddr);
    }

    function getRequestDataAddr(address reqAddr) public constant returns (bytes32) {
        return requests[reqAddr].addr;
    }
}
