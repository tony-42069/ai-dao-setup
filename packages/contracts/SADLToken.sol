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

    // Governance functions to be added
    function propose(bytes calldata data) external returns (uint256) {
        // Proposal logic
    }

    function vote(uint256 proposalId, bool support) external {
        // Voting logic
    }

    function execute(uint256 proposalId) external {
        // Execution logic
    }
}
