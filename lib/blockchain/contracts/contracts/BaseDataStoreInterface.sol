pragma solidity ^0.4.24;


contract BaseDataStoreInterface {

    function getDataSetInfo(bytes32 _dataSetID) public view returns(
        bytes32 name,
        string location,
        bytes32 category,
        string metadata,
        address controller
    );

    function getRequestInfo(bytes32 _requestID) public view returns(
        bytes32 dataSetID,
        bytes32 algorithmID,
        string pubKey,
        address requestor
    );

    function getRequestProcessingInfo(bytes32 _requestID) public view returns(
        address processor,
        bool processed,
        uint[] publicInput
    );

    function getController(address _controller) public view returns(
        bytes32 name,
        string pubKey
    );

    function getProcessor(address _processor)
    public
    view
    returns(
        bytes32 name,
        string pubKey
    );
}
