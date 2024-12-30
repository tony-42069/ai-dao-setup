// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IDecision {
    function executeDecision(
        uint256 decisionId,
        address target,
        bytes memory data
    ) external returns (bool);

    function getDecisionStatus(uint256 decisionId) external view returns (uint8);

    function validateDecision(uint256 decisionId) external view returns (bool);

    event DecisionExecuted(uint256 indexed decisionId, address indexed executor);
    event DecisionValidated(uint256 indexed decisionId);
}
