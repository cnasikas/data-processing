pragma solidity ^0.4.24;


contract BaseDataStoreInterface {

    function getDataSetInfo(bytes32 _dataSetID) public view returns(
        bytes32 name,
        string location,
        bytes32 category,
        bytes32 metaHash,
        address controller
    );

    function getRequestInfo(bytes32 _requestID) public view returns(
        bytes32 dataSetID,
        bytes32 algorithmID,
        string pubKey,
        address processor,
        string proof,
        string out
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
