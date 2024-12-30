// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "../governance/SADLToken.sol";

contract Treasury is Ownable {
    SADLToken public token;
    uint256 public totalFunds;
    uint256 public lastAudit;

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
        lastAudit = block.timestamp;
    }

    function deposit(uint256 amount) external {
        require(token.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        totalFunds += amount;
    }

    function proposeTransaction(
        address recipient,
        uint256 amount,
        string memory description
    ) external onlyOwner returns (uint256) {
        require(amount <= totalFunds, "Insufficient funds");
        
        transactionCount++;
        transactions[transactionCount] = Transaction({
            recipient: recipient,
            amount: amount,
            description: description,
            timestamp: block.timestamp,
            executed: false
        });
        
        return transactionCount;
    }

    function executeTransaction(uint256 transactionId) external onlyOwner {
        Transaction storage transaction = transactions[transactionId];
        require(!transaction.executed, "Already executed");
        
        require(token.transfer(transaction.recipient, transaction.amount), "Transfer failed");
        transaction.executed = true;
        totalFunds -= transaction.amount;
    }

    function audit() external onlyOwner {
        lastAudit = block.timestamp;
    }
}
