pragma solidity ^0.4.11;


contract Requests {

    address public owner;

    struct Request {
        string addr;
        bool proof;
    }

    mapping(address => Request) public requests;

    event RequestProcess(address indexed reqAddr, string dataAddr);

    function Requests () public {
        owner = msg.sender;
    }

    function requestForProcess(address reqAddr, string dataAddr) public {

        requests[reqAddr] = Request({
            addr: dataAddr,
            proof: false
        });

        RequestProcess(reqAddr, dataAddr);
    }

    function getRequestDataAddr(address reqAddr) public constant returns (string) {
        return requests[reqAddr].addr;
    }
}
