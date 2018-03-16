pragma solidity ^0.4.18;

/* Based on: https://github.com/enigmampc/ */

import "./zeppelin-solidity/Ownable.sol";
import "./BaseDataStoreInterface.sol";


contract BaseDataStore is BaseDataStoreInterface, Ownable {

    uint public totalData;
    uint public totalProviders;
    uint public totalRequests;
    uint public totalProcessors;

    struct DataSet {
        bytes32 _id;
        string name;
        string location;
        string category;
        string hashMeta;
        address owner;
        bool isDataSet;
    }

    struct Provider {
        address owner;
        bytes32 name;
        string pubKey;
        bool isProvider;
    }

    struct Request {
        bytes32 dataSetID;
        address subscriber;
        address provider;
        bool hasProof;
        bool processed;
        bytes32 queryID;
    }

    struct Processor {
        address owner;
        bytes32 name;
        string pubKey;
        bool isProcessor;
    }

    mapping(address => Provider) public providers;
    mapping (bytes32 => DataSet) public dataStore;
    mapping (address => Request) public requests;
    mapping (address => Processor) public processors;

    mapping(address => DataSet[]) public providerDataSets;

    function BaseDataStore () public {
        totalData = 0;
        totalProviders = 0;
        totalRequests = 0;
        totalProcessors = 0;
    }

    function getDataSetInfo(bytes32 _dataSetID)
    public
    view
    dataSetExist(_dataSetID)
    returns(
        string name,
        string location,
        string category,
        address owner,
        string hashMeta
    ) {
        owner = dataStore[_dataSetID].owner;
        name = dataStore[_dataSetID].name;
        location = dataStore[_dataSetID].location;
        category = dataStore[_dataSetID].category;
        hashMeta = dataStore[_dataSetID].hashMeta;
    }

    function getRequestInfo(address _subscriber)
    public
    view
    requestExist(_subscriber)
    returns(
        bytes32 dataSetID,
        address provider,
        bool hasProof,
        bool processed,
        bytes32 queryID,
        string pubKey
    ) {
        dataSetID = requests[_subscriber].dataSetID;
        provider = requests[_subscriber].provider;
        hasProof = requests[_subscriber].hasProof;
        processed = requests[_subscriber].processed;
        queryID = requests[_subscriber].queryID;
        pubKey = requests[_subscriber].pubKey;
    }

    function getDataProviderInfo(address _dataProviderAddress)
    public
    view
    returns(
        address owner,
        bytes32 name,
        string pubKey
    ) {
        owner = providers[_dataProviderAddress].owner;
        name = providers[_dataProviderAddress].name;
        pubKey = providers[_dataProviderAddress].pubKey;
    }

    function getDataProcessorInfo(address _dataProcessorAddress)
    public
    view
    dataProcessorExist(_dataProcessorAddress)
    returns(
        address owner,
        bytes32 name,
        string pubKey
    ) {
        owner = processors[_dataProcessorAddress].owner;
        name = processors[_dataProcessorAddress].name;
        pubKey = processors[_dataProcessorAddress].pubKey;
    }

    /* modifiers */
    modifier uniqueDataSet(bytes32 _dataSetID) {
        require(_dataSetID.length > 0);
        require(!dataStore[_dataSetID].isDataSet);
        _;
    }

    modifier dataSetExist(bytes32 _dataSetID) {
        require(_dataSetID.length > 0);
        require(dataStore[_dataSetID].isDataSet);
        _;
    }

    modifier requestExist(address _subscriber) {
        require(requests[_subscriber].isRequest);
        _;
    }

    modifier dataProcessorExist(address _processorAddress) {
        require(processors[_processorAddress].isProcessor);
        _;
    }

    modifier onlyDataProvider(address _providerAddress) {
        require(providers[_providerAddress].isProvider);
        require(providers[_providerAddress].owner == msg.sender);
        _;
    }
}
