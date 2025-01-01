// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

/**
 * @title SADL Token
 * @dev Implementation of the SADL governance token for Sadellari Enterprises DAO
 * The first-ever token enabling AI agent governance rights
 */
contract SADLToken is ERC20, Ownable, Pausable {
    // State variables
    mapping(address => bool) public isAIAgent;
    mapping(uint256 => Proposal) public proposals;
    uint256 public proposalCount;
    
    struct Proposal {
        uint256 id;
        address proposer;
        string description;
        uint256 forVotes;
        uint256 againstVotes;
        bool executed;
        bool isAIProposal;
        mapping(address => bool) hasVoted;
    }

    event ProposalCreated(uint256 indexed id, address proposer, string description, bool isAIProposal);
    event VoteCast(uint256 indexed proposalId, address voter, bool support, uint256 weight);
    event AIAgentRegistered(address indexed agent);
    event AIAgentRemoved(address indexed agent);

    constructor() ERC20("Sadellari DAO", "SADL") {
        // Mint initial supply
        // 51% to founder, 49% to treasury
        _mint(msg.sender, 51_000_000 * 10**decimals()); // Founder allocation
        _mint(address(this), 49_000_000 * 10**decimals()); // Treasury allocation
    }

    // AI Agent Management
    function registerAIAgent(address agent) external onlyOwner {
        isAIAgent[agent] = true;
        emit AIAgentRegistered(agent);
    }

    function removeAIAgent(address agent) external onlyOwner {
        isAIAgent[agent] = false;
        emit AIAgentRemoved(agent);
    }

    // Governance
    function createProposal(string memory description) external returns (uint256) {
        require(balanceOf(msg.sender) > 0 || isAIAgent[msg.sender], "SADL: Must be token holder or AI agent");
        
        uint256 proposalId = proposalCount++;
        Proposal storage proposal = proposals[proposalId];
        proposal.id = proposalId;
        proposal.proposer = msg.sender;
        proposal.description = description;
        proposal.isAIProposal = isAIAgent[msg.sender];

        emit ProposalCreated(proposalId, msg.sender, description, isAIAgent[msg.sender]);
        return proposalId;
    }

    function castVote(uint256 proposalId, bool support) external {
        require(balanceOf(msg.sender) > 0 || isAIAgent[msg.sender], "SADL: Must be token holder or AI agent");
        Proposal storage proposal = proposals[proposalId];
        require(!proposal.hasVoted[msg.sender], "SADL: Already voted");
        require(!proposal.executed, "SADL: Proposal already executed");

        proposal.hasVoted[msg.sender] = true;
        uint256 weight = isAIAgent[msg.sender] ? 1 : balanceOf(msg.sender);

        if (support) {
            proposal.forVotes += weight;
        } else {
            proposal.againstVotes += weight;
        }

        emit VoteCast(proposalId, msg.sender, support, weight);
    }

    // Treasury Management
    function executeProposal(uint256 proposalId) external onlyOwner {
        Proposal storage proposal = proposals[proposalId];
        require(!proposal.executed, "SADL: Already executed");
        require(proposal.forVotes > proposal.againstVotes, "SADL: Proposal rejected");
        
        proposal.executed = true;
        // Additional execution logic can be added here
    }

    // Override transfer functions to ensure governance integrity
    function transfer(address to, uint256 amount) public override whenNotPaused returns (bool) {
        require(amount <= balanceOf(msg.sender), "SADL: Transfer amount exceeds balance");
        return super.transfer(to, amount);
    }

    function transferFrom(address from, address to, uint256 amount) public override whenNotPaused returns (bool) {
        require(amount <= balanceOf(from), "SADL: Transfer amount exceeds balance");
        return super.transferFrom(from, to, amount);
    }

    // Emergency Functions
    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }
}
