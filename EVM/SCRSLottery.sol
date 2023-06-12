// SPDX-License-Identifier: MIT

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";

pragma solidity ^0.8.0;

contract SCRSLottery is Ownable{
 using SafeERC20 for IERC20;

 IERC20 public SCRSToken;
 
 address[] public lotteryParticipants;

 uint public ENTRY_FEE;
 uint public lotteryPot;

 constructor(address _SCRSTokenAddress) {
    SCRSToken = _SCRSTokenAddress;
    ENTRY_FEE = 100000 * 10 ** 18;
 }

 function changeEntryFee(uint _newFeeAmount) public onlyOwner {
    ENTRY_FEE = _newFeeAmount;
 }

 function getContractSCRSBalance() public view returns (uint) {
    return SCRSToken.balanceOf(address(this));
 }

 function fundLotteryPot(uint _amount) public onlyOwner {
    lotteryPot += _amount;
 }

 
}