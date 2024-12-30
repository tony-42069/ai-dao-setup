// SPDX-License-Identifier: MIT
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
}
