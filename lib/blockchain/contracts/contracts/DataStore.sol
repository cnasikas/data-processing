pragma solidity ^0.4.24;

/* Based on: https://github.com/enigmampc/ */

import "./DataStoreInterface.sol";
import "./BaseDataStore.sol";


contract DataStore is BaseDataStore {

    /*********** Events ************/

    event NewDataSet(bytes32 hash, bytes32 name, string location, bytes32 category, string metadata, address controller);
    event NewController(address _controllerAddress, bytes32 name, string pubKey);
    event NewProcessor(address _processorAddress, bytes32 name, string pubKey);
    event NewRequest(bytes32 _requestID, bytes32 _dataSetID, address _requestor, bytes32 algorithmID, string pubKey);
    event Process(address _processorAddress, bytes32 _requestID, string encryptedKey);

    function registerDataSet(
        bytes32 hash,
        bytes32 name,
        string location,
        bytes32 category,
        string metadata
    )
    public
    isValidDataset(hash)
    uniqueDataset(hash)
    onlyController(msg.sender)
    returns (bool)
    {
        dataStore[hash] = DataSet({
            name: name,
            category: category,
            location: location,
            metadata: metadata,
            controller: msg.sender,
            isDataSet: true
        });

        totalDataSets++;
        emit NewDataSet(hash, name, location, category, metadata, msg.sender);
        return true;
    }

    function registerController(address _controllerAddress, bytes32 name, string pubKey)
    public
    onlyOwner
    isValidAddress(_controllerAddress)
    onlyUnregisteredController(_controllerAddress)
    returns (bool)
    {
        controllers[_controllerAddress] = Controller({
            name: name,
            pubKey: pubKey,
            isController: true
        });

        totalControllers++;
        emit NewController(_controllerAddress, name, pubKey);
        return true;
    }

    function registerProcessor(address _processorAddress, bytes32 name, string pubKey)
    public
    onlyOwner
    isValidAddress(_processorAddress)
    onlyUnregisteredProcessor(_processorAddress)
    returns (bool)
    {
        processors[_processorAddress] = Processor({
            name: name,
            pubKey: pubKey,
            isProcessor: true
        });

        totalProcessors++;
        emit NewProcessor(_processorAddress, name, pubKey);
        return true;
    }

    function requestProcessing(bytes32 _dataSetID, bytes32 algorithmID, string pubKey)
    public
    dataSetExist(_dataSetID)
    uniqueRequest(_dataSetID, msg.sender, algorithmID)
    returns (bool)
    {
        bytes32 _requestID = keccak256(abi.encodePacked(_dataSetID, msg.sender, algorithmID));
        requests[_requestID].dataSetID = _dataSetID;
        requests[_requestID].requestor = msg.sender;
        requests[_requestID].algorithmID = algorithmID;
        requests[_requestID].pubKey = pubKey;
        requests[_requestID].isRequest = true;

        totalRequests++;
        emit NewRequest(_requestID, _dataSetID, msg.sender, algorithmID, pubKey);
        return true;
    }

    function notifyProcessor(address _processorAddress, bytes32 _requestID, string encryptedKey)
    public
    isValidAddress(msg.sender)
    requestExist(_requestID)
    onlyOwnerOfDataset(msg.sender, _requestID)
    returns (bool)
    {
        requests[_requestID].processor = _processorAddress;
        emit Process(_processorAddress, _requestID, encryptedKey);
        return true;
    }
}
