pragma solidity ^0.4.24;

import "./zeppelin-solidity/Ownable.sol";
import "./BaseDataStoreInterface.sol";


contract BaseDataStore is Ownable {

    uint256 public totalDataSets;
    uint256 public totalControllers;
    uint256 public totalRequests;
    uint256 public totalProcessors;

    struct ProcessorCyclicList {
      address current;
      address head;
      address tail;
    }

    struct DataSet {
        bytes32 name;
        string location;
        bytes32 category;
        string metadata;
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
        bytes32 algorithmID;
        string pubKey;
        address processor;
        uint[] publicInput;
        bool isRequest;
    }

    struct Processor {
        bytes32 name;
        string pubKey;
        bool isProcessor;
        address nextProcessor;
    }

    mapping(address => Controller) public controllers;
    mapping (bytes32 => DataSet) public dataStore;
    mapping (bytes32 => Request) public requests;
    mapping (address => Processor) public processors;

    ProcessorCyclicList public prList;

    constructor() public {
        totalDataSets = 0;
        totalControllers = 0;
        totalRequests = 0;
        totalProcessors = 0;
        prList.current = address(0);
        prList.head = address(0);
        prList.tail = address(0);
    }

    /* modifiers */
    modifier isValidDataset(bytes32 _dataSetID) {
        require(_dataSetID != 0, "Empty dataset id is not allowed");
        _;
    }

    modifier dataSetExist(bytes32 _dataSetID) {
        require(dataStore[_dataSetID].isDataSet, "Dataset not found");
        _;
    }

    modifier uniqueDataset(bytes32 _dataSetID) {
        require(dataStore[_dataSetID].isDataSet == false, "Dataset already exists");
        _;
    }

    modifier requestExist(bytes32 _requestID) {
        require(_requestID != 0, "Empty request id is not allowed");
        require(requests[_requestID].isRequest, "Request not found");
        _;
    }

    modifier uniqueRequest(bytes32 _dataSetID, address requestor, bytes32 algorithmID) {
      bytes32 _requestID = keccak256(abi.encodePacked(_dataSetID, requestor, algorithmID));
      require(requests[_requestID].isRequest == false, "Request already exists");
      _;
    }

    modifier hasProof(bytes32 _requestID) {
      require(requests[_requestID].hasProof, "Proof not found");
      _;
    }

    modifier onlyOwnerOfDataset(address _controllerAddress, bytes32 _requestID) {
      bytes32 _dataSetID = requests[_requestID].dataSetID;
      require(dataStore[_dataSetID].controller == _controllerAddress, "Sender is not the controller of the dataset");
      _;
    }

    modifier processorExist(address _processorAddress) {
        require(processors[_processorAddress].isProcessor, "Processor not found");
        _;
    }

    modifier onlyUnregisteredProcessor(address _processorAddress) {
        require(processors[_processorAddress].isProcessor == false, "Processor already registered");
        _;
    }

    modifier controllerExist(address _controllerAddress) {
        require(controllers[_controllerAddress].isController, "Controller not found");
        _;
    }

    modifier onlyUnregisteredController(address _controllerAddress) {
        require(controllers[_controllerAddress].isController == false, "Controller already registered");
        _;
    }

    modifier onlyController(address _controllerAddress) {
        require(controllers[_controllerAddress].isController, "Unregistered controllers cannot register a dataset");
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
    returns(bytes32, string, bytes32, string, address) {
        return (
            dataStore[_dataSetID].name,
            dataStore[_dataSetID].location,
            dataStore[_dataSetID].category,
            dataStore[_dataSetID].metadata,
            dataStore[_dataSetID].controller
        );
    }

    function getRequestInfo(bytes32 _requestID)
    public
    view
    requestExist(_requestID)
    returns(bytes32, bytes32, string, address) {
        return (
            requests[_requestID].dataSetID,
            requests[_requestID].algorithmID,
            requests[_requestID].pubKey,
            requests[_requestID].requestor
        );
    }

    function getRequestProcessingInfo(bytes32 _requestID)
    public
    view
    requestExist(_requestID)
    returns(address, bool, uint[]) {
        return (
            requests[_requestID].processor,
            requests[_requestID].hasProof,
            requests[_requestID].publicInput
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

    function addProcessorToList (address processor) internal {
      if (totalProcessors == 0) {
        prList.current = processor;
        prList.head = processor;
        prList.tail = processor;
        return;
      }

      address currentTail = prList.tail;
      processors[currentTail].nextProcessor = processor;
      prList.tail = processor;
    }

    function getNextInLineProcessor()
    internal
    returns(address processor) {
      address current = prList.current;
      prList.current = processors[current].nextProcessor;
      return current;
    }

    function getCurrentProcessor() public view returns(address processor) {
      return prList.current;
    }
}
