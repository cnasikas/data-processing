pragma solidity ^0.4.24;

import "./DataStore.sol";
import "./zeppelin-solidity/Ownable.sol";

contract ProofStore is Ownable {

  DataStore private dataStore;
  address public dataStoreAddress;

  struct G1Point {
      uint X;
      uint Y;
  }

  struct G2Point {
      uint[2] X;
      uint[2] Y;
  }

  struct Proof {
      G1Point A;
      G1Point A_p;
      G2Point B;
      G1Point B_p;
      G1Point C;
      G1Point C_p;
      G1Point K;
      G1Point H;
      string output;
      uint256[] publicInput;
      bool hasProof;
  }

  uint256 totalProofs = 0;

  mapping (bytes32 => Proof) public proofs;

  event NewProof(bytes32 _requestID);

  constructor (address _datastoreAddress) public {
    dataStoreAddress = _datastoreAddress;
    dataStore = DataStore(_datastoreAddress);
  }

  modifier onlyTheProcessorOfTheRequest(bytes32 _requestID) {
      require(msg.sender == dataStore.getRequestProcessor(_requestID), "Sender is not the assigned processor of the request");
      _;
  }

  function changeDataStore(address _datastoreAddress)
  public
  onlyOwner
  returns (bool)
  {
    dataStoreAddress = _datastoreAddress;
    dataStore = DataStore(_datastoreAddress);
    return true;
  }

  function addProof(
    bytes32 _requestID,
    uint[2] a,
    uint[2] a_p,
    uint[2][2] b,
    uint[2] b_p,
    uint[2] c,
    uint[2] c_p,
    uint[2] h,
    uint[2] k,
    string output,
    uint256[] publicInput
  )
  public
  onlyTheProcessorOfTheRequest(_requestID)
  {
      Proof memory proof;
      proof.A = G1Point(a[0], a[1]);
      proof.A_p = G1Point(a_p[0], a_p[1]);
      proof.B = G2Point([b[0][0], b[0][1]], [b[1][0], b[1][1]]);
      proof.B_p = G1Point(b_p[0], b_p[1]);
      proof.C = G1Point(c[0], c[1]);
      proof.C_p = G1Point(c_p[0], c_p[1]);
      proof.H = G1Point(h[0], h[1]);
      proof.K = G1Point(k[0], k[1]);
      proof.output = output;
      proof.publicInput = publicInput;
      proof.hasProof = true;

      proofs[_requestID] = proof;
      totalProofs++;

      emit NewProof(_requestID);
  }

  function getProof(bytes32 _requestID)
  public
  view
  returns(uint[2], uint[2], uint[2][2], uint[2], uint[2], uint[2], uint[2], uint[2]) {
      Proof memory proof = proofs[_requestID];
      return (
          [proof.A.X, proof.A.Y],
          [proof.A_p.X, proof.A_p.Y],
          [proof.B.X, proof.B.Y],
          [proof.B_p.X, proof.B_p.Y],
          [proof.C.X, proof.C.Y],
          [proof.C_p.X, proof.C_p.Y],
          [proof.H.X, proof.H.Y],
          [proof.K.X, proof.K.Y]
      );
  }

  function getOutput(bytes32 _requestID)
  public
  view
  returns(string) {
    return proofs[_requestID].output;
  }

  function getPublicInput(bytes32 _requestID)
  public
  view
  returns(uint256[]) {
    return proofs[_requestID].publicInput;
  }

  function hasProof(bytes32 _requestID) public view returns (bool) {
    return proofs[_requestID].hasProof;
  }
}
