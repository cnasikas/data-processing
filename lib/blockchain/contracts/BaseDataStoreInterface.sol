pragma solidity ^0.4.18;

/* Based on: https://github.com/enigmampc/ */

contract BaseDataStoreInterface {

    function getDataSetInfo(bytes32 _dataSetID) public view returns(
        string name,
        string location,
        string category,
        address owner,
        string hashMeta
    );

    function getDataProviderInfo(address provider) public view returns(
        address owner,
        bytes32 name,
        string pubKey
    );

    function getDataProcessorInfo(address _dataProcessorAddress)
    public
    view
    returns(
        address owner,
        bytes32 name,
        string pubKey
    );
}
