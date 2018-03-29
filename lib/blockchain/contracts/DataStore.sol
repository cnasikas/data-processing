pragma solidity ^0.4.18;

/* Based on: https://github.com/enigmampc/ */

import "./DataStoreInterface.sol";
import "./BaseDataStore.sol";


contract DataStore is BaseDataStore, DataStoreInterface {

    function registerDataSet(
        bytes32 _id,
        string name,
        string location,
        string category,
        string hashMeta,
        address _dataOwner,
        string digest
    )
    public
    uniqueDataSet(_id) // providerExist (?)
    returns (bool success)
    {
        require(_dataOwner != address(0));
        dataStore[_id] = DataSet({
            _id: _id,
            name: name,
            category: category,
            location: location,
            hashMeta: hashMeta,
            owner: _dataOwner,
            isDataSet: true,
            digest: digest
        });

        totalData++;
        NewDataSet(_id, name, location, category, hashMeta, _dataOwner, digest);
        success = true;
    }

    function registerProvider(address _providerAddress, bytes32 name, string pubKey)
    public
    onlyOwner
    returns (bool success)
    {
        require(_providerAddress != address(0));
        providers[_providerAddress] = Provider({
            owner: _providerAddress,
            name: name,
            isProvider: true,
            pubKey: pubKey
        });

        totalProviders++;
        NewProvider(_providerAddress, name);
        success = true;
    }

    function registerProcessor(address _processorAddress, bytes32 name, string pubKey)
    public
    onlyOwner
    returns (bool success)
    {
        require(_processorAddress != address(0));
        processors[_processorAddress] = Processor({
            owner: _processorAddress,
            name: name,
            isProcessor: true,
            pubKey: pubKey
        });

        totalProcessors++;
        NewProcessor(_processorAddress, name, pubKey);
        success = true;
    }

    function requestProcessing(bytes32 _dataSetID, address _subscriber, bytes32 queryID, string pubKey)
    public
    dataSetExist(_dataSetID)
    returns (bool success)
    {
        require(msg.sender != address(0));

        requests[_subscriber] = Request({
            dataSetID: _dataSetID,
            subscriber: _subscriber,
            provider: dataStore[_dataSetID].owner,
            hasProof: false,
            processed: false,
            queryID: queryID,
            pubKey: pubKey,
            isRequest: true
        });

        totalRequests++;
        NewRequest(_dataSetID, dataStore[_dataSetID].owner, _subscriber, queryID, pubKey);
        success = true;
    }

    function notifyProcessor(address _providerAddress, address _subscriber, string cipher)
    public
    returns (bool success)
    {
        Process(_providerAddress, _subscriber, cipher);
        success = true;
    }
}
