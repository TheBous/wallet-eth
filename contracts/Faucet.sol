// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

// Our first contract is a faucet!
contract Faucet {
    // Accept any incoming amount
    receive() external payable {}

    // Give out ether to anyone who asks
    function withdraw(uint256 withdraw_amount) public {
        // Limit withdrawal amount
        require(withdraw_amount <= 100000000000000000);

        // Send the amount to the address that requested it
        payable(msg.sender).transfer(withdraw_amount);
    }
}
