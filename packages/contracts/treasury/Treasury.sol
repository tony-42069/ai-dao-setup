// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "../interfaces/ITreasury.sol";
import "../governance/SADLToken.sol";

contract Treasury is Ownable, ITreasury {
    SADLToken public token;
    uint256 public totalFunds;
    uint256 public allocatedFunds;
    uint256 public lastUpdated;
    Investment[] public investmentPortfolio;

    struct Transaction {
        address recipient;
        uint256 amount;
        string description;
        uint256 timestamp;
        bool executed;
    }

    mapping(uint256 => Transaction) public transactions;
    uint256 public transactionCount;

    constructor(address _token) {
        token = SADLToken(_token);
        lastUpdated = block.timestamp;
    }

    function getState() external view override returns (TreasuryState memory) {
        return TreasuryState({
            totalFunds: totalFunds,
            allocatedFunds: allocatedFunds,
            availableFunds: totalFunds - allocatedFunds,
            lastUpdated: lastUpdated,
            investmentPortfolio: investmentPortfolio
        });
    }

    function getInvestmentOptions() external view override returns (Investment[] memory) {
        return investmentPortfolio;
    }

    function deposit(uint256 amount) external override {
        require(token.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        totalFunds += amount;
        lastUpdated = block.timestamp;
        emit FundsDeposited(msg.sender, amount);
    }

    function withdraw(uint256 amount, address recipient) external override onlyOwner {
        require(amount <= totalFunds - allocatedFunds, "Insufficient available funds");
        require(token.transfer(recipient, amount), "Transfer failed");
        totalFunds -= amount;
        lastUpdated = block.timestamp;
        emit FundsWithdrawn(recipient, amount);
    }

    function allocateFunds(uint256 amount, address target) external override onlyOwner {
        require(amount <= totalFunds - allocatedFunds, "Insufficient available funds");
        allocatedFunds += amount;
        lastUpdated = block.timestamp;
        emit FundsAllocated(target, amount);
    }

    function addInvestment(string memory asset, uint256 amount, uint256 value) external onlyOwner {
        investmentPortfolio.push(Investment({
            asset: asset,
            amount: amount,
            value: value
        }));
        lastUpdated = block.timestamp;
    }
}
