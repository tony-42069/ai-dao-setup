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
        // Mint initial supply according to master plan:
        // 51% founder, 29% brand development, 20% future stakeholders
        uint256 totalSupply = 100_000_000 * 10**decimals();
        _mint(msg.sender, (totalSupply * 51) / 100); // Founder allocation (51%)
        _mint(address(this), (totalSupply * 29) / 100); // Brand development (29%)
        _mint(treasury(), (totalSupply * 20) / 100); // Future stakeholders (20%)
    }

    function treasury() public view returns (address) {
        // TODO: Replace with actual treasury contract address
        return address(this);
    }

    // Multi-sig AI Agent Management
    uint256 public constant REQUIRED_SIGNATURES = 2;
    mapping(address => uint256) public agentApprovals;
    mapping(bytes32 => bool) public pendingApprovals;

    function proposeAIAgent(address agent, bool isRegistration) external onlyOwner {
        bytes32 proposalId = keccak256(abi.encodePacked(agent, isRegistration));
        require(!pendingApprovals[proposalId], "Proposal already exists");
        pendingApprovals[proposalId] = true;
        agentApprovals[agent] = 1;
    }

    function approveAIAgent(address agent, bool isRegistration) external onlyOwner {
        bytes32 proposalId = keccak256(abi.encodePacked(agent, isRegistration));
        require(pendingApprovals[proposalId], "No pending proposal");
        agentApprovals[agent] += 1;

        if (agentApprovals[agent] >= REQUIRED_SIGNATURES) {
            if (isRegistration) {
                isAIAgent[agent] = true;
                emit AIAgentRegistered(agent);
            } else {
                isAIAgent[agent] = false;
                emit AIAgentRemoved(agent);
            }
            delete pendingApprovals[proposalId];
            delete agentApprovals[agent];
        }
    }

    // Enhanced Governance with Decision Pipeline
    struct Decision {
        bytes32 id;
        address agent;
        DecisionType decisionType;
        bytes data;
        uint256 timestamp;
        bool executed;
        mapping(address => bool) approvals;
        uint256 approvalCount;
    }

    enum DecisionType { FINANCIAL, TECHNICAL, OPERATIONAL, STRATEGIC }
    
    mapping(bytes32 => Decision) public decisions;
    
    event DecisionProposed(bytes32 indexed id, address indexed agent, DecisionType decisionType);
    event DecisionExecuted(bytes32 indexed id);
    
    function proposeDecision(
        DecisionType decisionType,
        bytes calldata data
    ) external returns (bytes32) {
        require(isAIAgent[msg.sender], "Only AI agents can propose decisions");
        
        bytes32 decisionId = keccak256(abi.encodePacked(
            msg.sender,
            decisionType,
            data,
            block.timestamp
        ));
        
        Decision storage decision = decisions[decisionId];
        decision.id = decisionId;
        decision.agent = msg.sender;
        decision.decisionType = decisionType;
        decision.data = data;
        decision.timestamp = block.timestamp;
        
        emit DecisionProposed(decisionId, msg.sender, decisionType);
        return decisionId;
    }

    function approveDecision(bytes32 decisionId) external {
        require(isAIAgent[msg.sender], "Only AI agents can approve decisions");
        Decision storage decision = decisions[decisionId];
        require(!decision.executed, "Decision already executed");
        require(!decision.approvals[msg.sender], "Already approved");
        
        decision.approvals[msg.sender] = true;
        decision.approvalCount++;
    }

    function executeDecision(bytes32 decisionId) external {
        Decision storage decision = decisions[decisionId];
        require(!decision.executed, "Decision already executed");
        require(decision.approvalCount >= REQUIRED_SIGNATURES, "Insufficient approvals");
        
        decision.executed = true;
        emit DecisionExecuted(decisionId);
        
        // Execute decision based on type
        if (decision.decisionType == DecisionType.FINANCIAL) {
            _executeFinancialDecision(decision.data);
        } else if (decision.decisionType == DecisionType.TECHNICAL) {
            _executeTechnicalDecision(decision.data);
        }
        // Add other decision type executions as needed
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
