// SPDX-License-Identifier: MIT

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";

pragma solidity ^0.8.0;

contract SCRSLottery is Ownable {
    using SafeERC20 for IERC20;

    IERC20 public SCRSToken;


    uint public ENTRY_FEE;
    uint public lotteryPot;
    address[] public lotteryEntrants;
    bool public lotteryActive;

    constructor(address _SCRSTokenAddress) {
        SCRSToken = IERC20(_SCRSTokenAddress);
        ENTRY_FEE = 100000 * 10 ** 18;
        lotteryActive = true;
    }

    function getEntrantsCount() public view returns (uint) {
        return lotteryEntrants.length;
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

    function enterLottery(address _player, uint _entryCount) public payable {
        uint entryCost = _entryCount * ENTRY_FEE;
        require(SCRSToken.balanceOf(_player) >= entryCost, "Not enough $SCRS tokens to participate");
        require(lotteryActive, "Wait for lottery start");

        lotteryPot += entryCost;

        for(uint i = 0; i < _entryCount; i++) {
            lotteryEntrants.push(_player);
        }

        SCRSToken.safeTransferFrom(_player, address(this), entryCost);
    }
    
    function drawWinner(uint index) public onlyOwner {
        uint randomNumber = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender))) % index;
        address winner = lotteryEntrants[randomNumber];
        SCRSToken.transfer(winner, lotteryPot);
        lotteryPot = 0;
        lotteryEntrants = new address[](0);

    }
}
