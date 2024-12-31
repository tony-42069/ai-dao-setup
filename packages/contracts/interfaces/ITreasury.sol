// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface ITreasury {
    struct TreasuryState {
        uint256 totalFunds;
        uint256 allocatedFunds;
        uint256 availableFunds;
        uint256 lastUpdated;
        Investment[] investmentPortfolio;
    }

    struct Investment {
        string asset;
        uint256 amount;
        uint256 value;
    }

    function getState() external view returns (TreasuryState memory);
    function getInvestmentOptions() external view returns (Investment[] memory);
    function deposit(uint256 amount) external;
    function withdraw(uint256 amount, address recipient) external;
    function allocateFunds(uint256 amount, address target) external;

    event FundsDeposited(address indexed from, uint256 amount);
    event FundsWithdrawn(address indexed to, uint256 amount);
    event FundsAllocated(address indexed target, uint256 amount);
}
