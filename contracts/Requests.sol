pragma solidity ^0.4.11;

contract Requests {

    address public owner;

    struct Request {
      address addr;
      bool proof;
    }

    mapping(address => Request) public requests;

    event RequestProcess(address indexed reqAddr, address indexed dataAddr);

    function Requests () {
  		owner = msg.sender;
  	}

    function requestForProcess(address reqAddr, address dataAddr) {

      requests[reqAddr] = Request({
        addr: dataAddr,
        proof: false
      });

      RequestProcess(reqAddr, dataAddr);
    }

    function getRequestDataAddr(address reqAddr) constant returns (address) {
          return requests[reqAddr].addr;
    }
}
