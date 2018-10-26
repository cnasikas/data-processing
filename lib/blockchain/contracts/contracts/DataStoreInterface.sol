pragma solidity ^0.4.24;


contract DataStoreInterface {

    function registerDataSet(
        bytes32 hash,
        bytes32 name,
        string location,
        bytes32 category,
        string metadata
    ) public returns (bool success);

    function registerController(address _controllerAddress, bytes32 name, string pubKey) public returns (bool success);
    function registerProcessor(address _processorAddress, bytes32 name, string pubKey) public returns (bool success);
    function requestProcessing(bytes32 _dataSetID, bytes32 algorithmID, string pubKey) public returns (bool success);
    function notifyProcessor(address _processorAddress, bytes32 _requestID, string encryptedKey) public returns (bool success);

    /*********** Events ************/

    event NewDataSet(bytes32 hash, bytes32 name, string location, bytes32 category, string metadata, address controller);
    event NewController(address _controllerAddress, bytes32 name, string pubKey);
    event NewProcessor(address _processorAddress, bytes32 name, string pubKey);
    event NewRequest(bytes32 _requestID, bytes32 _dataSetID, address _requestor, bytes32 algorithmID, string pubKey);
    event Process(address _processorAddress, bytes32 _requestID, string encryptedKey);
}
