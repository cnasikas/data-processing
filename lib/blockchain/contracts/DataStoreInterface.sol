pragma solidity ^0.4.18;


contract DataStoreInterface {

    function registerDataSet(
        bytes32 _id,
        string name,
        string location,
        string category,
        string hashMeta,
        address _dataOwner
    ) public returns (bool success);

    function registerProvider(address _providerAddress, bytes32 name, string pubKey) public returns (bool success);
    function requestProcessing(bytes32 _dataSetID, address _subscriber) public returns (bool success);

    /*********** Events ************/

    event NewDataSet(bytes32 _id, string name, string location, string category, string hashMeta, address owner);
    event NewProvider(address _providerAddress, bytes32 name);
    event NewRequest(bytes32 _dataSetID, address _provider, address _subscriber);
}