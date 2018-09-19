pragma solidity ^0.4.24;

import "./zeppelin-solidity/Ownable.sol";
import "./BaseDataStoreInterface.sol";


contract BaseDataStore is BaseDataStoreInterface, Ownable {

    uint256 public totalDataSets;
    uint256 public totalControllers;
    uint256 public totalRequests;
    uint256 public totalProcessors;

    struct DataSet {
        bytes32 name;
        string location;
        bytes32 category;
        address controller;
        bool isDataSet;
    }

    struct Controller {
        bytes32 name;
        string pubKey;
        bool isController;
    }

    struct Request {
        bytes32 dataSetID;
        address requestor;
        bool hasProof;
        bool processed;
        bytes32 algorithmID;
        string pubKey;
        bool isRequest;
        address processor;
        string proof;
        string out;
    }

    struct Processor {
        bytes32 name;
        string pubKey;
        bool isProcessor;
    }

    mapping(address => Controller) public controllers;
    mapping (bytes32 => DataSet) public dataStore;
    mapping (bytes32 => Request) public requests;
    mapping (address => Processor) public processors;

    constructor() public {
        totalDataSets = 0;
        totalControllers = 0;
        totalRequests = 0;
        totalProcessors = 0;
    }

    /* modifiers */
    modifier uniqueDataSet(bytes32 _dataSetID) {
        require(_dataSetID.length > 0, "Empty dataset id is not allowed");
        require(!dataStore[_dataSetID].isDataSet, "Dataset already declared");
        _;
    }

    modifier dataSetExist(bytes32 _dataSetID) {
        require(_dataSetID.length > 0, "Empty dataset id is not allowed");
        require(dataStore[_dataSetID].isDataSet, "Dataset not found");
        _;
    }

    modifier requestExist(bytes32 _requestID) {
        require(_requestID.length > 0, "Empty request id is not allowed");
        require(requests[_requestID].isRequest, "Request not found");
        _;
    }

    modifier processorExist(address _processorAddress) {
        require(processors[_processorAddress].isProcessor, "Processor not found");
        _;
    }

    modifier controllerExist(address _controllerAddress) {
        require(controllers[_controllerAddress].isController, "Controller not found");
        _;
    }

    modifier onlyController(address _controllerAddress) {
        require(controllers[_controllerAddress].isController, "Controller not found");
        require(_controllerAddress == msg.sender, "Only a trusted controller is allowed");
        _;
    }

    modifier isValidAddress(address _address) {
        require(_address != address(0), "Invalid address");
        _;
    }

    modifier isTheProcessorOfRequest(address _processor, bytes32 _requestID) {
        require(requests[_requestID].processor == _processor, "Invalid processor");
        _;
    }

    function getDataSetInfo(bytes32 _dataSetID)
    public
    view
    dataSetExist(_dataSetID)
    returns(bytes32, string, bytes32, address) {
        return (
            dataStore[_dataSetID].name,
            dataStore[_dataSetID].location,
            dataStore[_dataSetID].category,
            dataStore[_dataSetID].controller
        );
    }

    function getRequestInfo(bytes32 _requestID)
    public
    view
    requestExist(_requestID)
    returns(bytes32, bytes32, string, address, string, string) {
        return (
            requests[_requestID].dataSetID,
            requests[_requestID].algorithmID,
            requests[_requestID].pubKey,
            requests[_requestID].processor,
            requests[_requestID].proof,
            requests[_requestID].out
        );
    }

    function getController(address _controller)
    public
    view
    controllerExist(_controller)
    returns(bytes32, string) {
        return (controllers[_controller].name, controllers[_controller].pubKey);
    }

    function getProcessor(address _processor)
    public
    view
    processorExist(_processor)
    returns(bytes32, string) {
        return (processors[_processor].name, processors[_processor].pubKey);
    }
}
