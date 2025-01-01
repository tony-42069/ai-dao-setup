// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IAgentGovernance {
    function createProposal(
        string memory description,
        uint256 value,
        address target,
        bytes memory data
    ) external returns (uint256);

    function voteOnProposal(uint256 proposalId, bool support) external;

    function executeProposal(uint256 proposalId) external;

    function getProposalStatus(uint256 proposalId) external view returns (uint8);

    event ProposalCreated(uint256 indexed proposalId, address indexed creator);
    event Voted(uint256 indexed proposalId, address indexed voter, bool support);
    event ProposalExecuted(uint256 indexed proposalId);

    struct Proposal {
        uint256 id;
        string description;
        string status;
        uint256 votesFor;
        uint256 votesAgainst;
    }
}
