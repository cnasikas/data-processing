pragma solidity ^0.4.24;

/* Based on: https://github.com/enigmampc/ */

import "./DataStoreInterface.sol";
import "./BaseDataStore.sol";


contract DataStore is BaseDataStore, DataStoreInterface {

    function registerDataSet(
        bytes32 hash,
        bytes32 name,
        string location,
        bytes32 category,
        bytes32 metaHash
    )
    public
    uniqueDataSet(hash)
    // TODO: Restrict only to registered controllers
    // onlyController(msg.sender)
    returns (bool)
    {
        dataStore[hash] = DataSet({
            name: name,
            category: category,
            location: location,
            metaHash: metaHash,
            controller: msg.sender,
            isDataSet: true
        });

        totalDataSets++;
        emit NewDataSet(hash, name, location, category, metaHash, msg.sender);
        return true;
    }

    function registerController(address _controllerAddress, bytes32 name, string pubKey)
    public
    onlyOwner
    // TODO: Check if already registed
    isValidAddress(_controllerAddress)
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
    // TODO: Check if already registed
    isValidAddress(_processorAddress)
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
    isValidAddress(msg.sender)
    returns (bool)
    {
        bytes32 _requestID = keccak256(abi.encodePacked(_dataSetID, msg.sender));
        requests[_requestID] = Request({
            dataSetID: _dataSetID,
            requestor: msg.sender,
            hasProof: false,
            processed: false,
            algorithmID: algorithmID,
            pubKey: pubKey,
            isRequest: true
        });

        totalRequests++;
        emit NewRequest(_requestID, _dataSetID, msg.sender, algorithmID, pubKey);
        return true;
    }

    function notifyProcessor(address _processorAddress, bytes32 _requestID, string encryptedKey)
    public
    isValidAddress(msg.sender)
    requestExist(_requestID)
    returns (bool)
    {
        emit Process(_processorAddress, _requestID, encryptedKey);
        return true;
    }
}
