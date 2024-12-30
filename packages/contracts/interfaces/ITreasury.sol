// SPDX-License-Identifier: MIT
<<<<<<< HEAD
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
=======
pragma solidity ^0.8.19;

interface ITreasury {
    function deposit(uint256 amount) external;

    function withdraw(uint256 amount, address recipient) external;

    function allocateFunds(uint256 amount, address target) external;

    function getBalance() external view returns (uint256);

    function getAvailableFunds() external view returns (uint256);

    event FundsDeposited(address indexed from, uint256 amount);
    event FundsWithdrawn(address indexed to, uint256 amount);
    event FundsAllocated(address indexed target, uint256 amount);
>>>>>>> f47de8e77f02dd3d1876a7302e11a0777644b54b
}
