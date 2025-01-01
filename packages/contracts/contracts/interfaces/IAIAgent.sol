// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IAIAgent {
    struct Decision {
        string action;
        bytes data;
    }
    
    struct Result {
        bool success;
        string message;
    }

    function makeDecision(bytes calldata context) external returns (Decision memory);
    function executeAction(Decision calldata action) external returns (Result memory);
}
