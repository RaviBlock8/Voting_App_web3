pragma solidity ^0.6.0;

contract Vote {
    mapping(uint256 => uint256) public voteCount;
    mapping(address => bool) public registered;
    mapping(uint256 => bool) public candidates;
    event VoteSubmitted(uint256 id, uint256 voteCount);
    uint256 public totalCandidates;
    uint256 public totalVotes;
    address private owner;
    bool started;

    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "is not an owner");
        _;
    }

    modifier isRegistered {
        require(registered[msg.sender] == true, "user is not registered");
        _;
    }

    modifier isCandidate(uint256 id) {
        require(candidates[id] == true, "is not an candidate");
        _;
    }

    modifier isStarted {
        require(started, "elections not started");
        _;
    }

    function register() public {
        require(registered[msg.sender] != true, "User is already registered");
        registered[msg.sender] = true;
    }

    function addCandidate(uint256 id) public onlyOwner {
        candidates[id] = true;
        totalCandidates += 1;
    }

    function startElections() public onlyOwner {
        started = true;
    }

    function castVote(uint256 candidateId)
        public
        isRegistered
        isCandidate(candidateId)
        isStarted
    {
        voteCount[candidateId] += 1;
        totalVotes += 1;
    }
}
