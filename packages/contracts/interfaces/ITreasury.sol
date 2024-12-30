// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ITreasury {
    struct TreasuryState {
        uint256 totalFunds;
        uint256 allocatedFunds;
        uint256 availableFunds;
    }

    struct InvestmentOption {
        string name;
        uint256 value;
    }

    function getState() external view returns (TreasuryState memory);
    function getInvestmentOptions() external view returns (InvestmentOption[] memory);
}
