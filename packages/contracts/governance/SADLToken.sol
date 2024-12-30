// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SADLToken is ERC20, Ownable {
    constructor() ERC20("Sadellari Token", "SADL") {
        // Initial token distribution
        _mint(msg.sender, 51000000 * 10 ** decimals()); // 51% to founder
        _mint(address(this), 49000000 * 10 ** decimals()); // 49% to treasury
    }

    // Governance functions
    mapping(uint256 => Proposal) public proposals;
    uint256 public proposalCount;
    
    struct Proposal {
        address proposer;
        bytes data;
        uint256 voteStart;
        uint256 voteEnd;
        bool executed;
        mapping(address => bool) votes;
        uint256 yesVotes;
        uint256 noVotes;
    }

    function propose(bytes calldata data) external returns (uint256) {
        require(data.length > 0, "Empty proposal");
        
        proposalCount++;
        Proposal storage newProposal = proposals[proposalCount];
        newProposal.proposer = msg.sender;
        newProposal.data = data;
        newProposal.voteStart = block.timestamp;
        newProposal.voteEnd = block.timestamp + 3 days;
        
        return proposalCount;
    }

    function vote(uint256 proposalId, bool support) external {
        Proposal storage proposal = proposals[proposalId];
        require(block.timestamp >= proposal.voteStart, "Voting not started");
        require(block.timestamp <= proposal.voteEnd, "Voting ended");
        require(!proposal.votes[msg.sender], "Already voted");
        
        proposal.votes[msg.sender] = true;
        if (support) {
            proposal.yesVotes += balanceOf(msg.sender);
        } else {
            proposal.noVotes += balanceOf(msg.sender);
        }
    }

    function execute(uint256 proposalId) external {
        Proposal storage proposal = proposals[proposalId];
        require(block.timestamp > proposal.voteEnd, "Voting in progress");
        require(!proposal.executed, "Already executed");
        require(proposal.yesVotes > proposal.noVotes, "Proposal rejected");
        
        // Execute proposal logic
        proposal.executed = true;
    }
}
