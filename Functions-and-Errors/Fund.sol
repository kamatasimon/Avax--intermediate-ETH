// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;


contract Fund {
    // Mapping to keep track of the asset balances of each address.
    mapping(address => uint) public balances;

    // Event declarations for logging activities.

    event Deposit(address indexed user, uint amount);

    event Withdrawal(address indexed user, uint amount);

    function deposit() public payable {
        // Check that the asset sent is above a minimum threshold.
        require(msg.value > 0.01 ether , "Minimum deposit is 0.01");

        // Update the sender's balance and emit the Deposit event.
        balances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    function withdraw(uint _amount) public {
        // Check that the sender has enough balance to withdraw.
        require(balances[msg.sender] >= _amount, "Insufficient balance");

        // Attempt to send Ether and ensure the transaction succeeds.
        (bool sent, ) = msg.sender.call{value: _amount}("");
        require(sent, "Failed to send");

        // Update the sender's balance and emit the Withdrawal event.
        // The assert statement is used to verify contract's balance never goes negative.
        balances[msg.sender] -= _amount;
        assert(address(this).balance >= 0);

        emit Withdrawal(msg.sender, _amount);
    }

   
    function getContractBalance() public view returns (uint) {
        return address(this).balance;
    }

    function customFunction(uint _value) public pure {
        // Custom logic that reverts the transaction if the value is zero.
        if (_value == 0) {
            revert("Value cannot be zero");
        }
    }
}
