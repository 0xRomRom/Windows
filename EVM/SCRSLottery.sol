// SPDX-License-Identifier: MIT

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721.sol";

pragma solidity ^0.8.0;

contract SCRSLottery is Ownable {
    using SafeERC20 for IERC20;

    IERC20 public SCRSToken;
    IERC721 public SCRSNFT;

    uint public ENTRY_FEE;
    uint public lotteryPot;
    address[] public lotteryEntrants;
    bool public lotteryActive;

    constructor(address _SCRSTokenAddress, address _SCRSNFT) {
        SCRSToken = IERC20(_SCRSTokenAddress);
        ENTRY_FEE = 100000 * 10 ** 18;
        SCRSNFT = IERC721(_SCRSNFT);
    }

    function getEntrantsCount() public view returns (uint) {
        return lotteryEntrants.length;
    }

    function lotteryEntrant(uint _index) public view returns (address) {
        return lotteryEntrants[_index];
    }

    function changeEntryFee(uint _newFeeAmount) public onlyOwner {
        ENTRY_FEE = _newFeeAmount;
    }

    function getContractSCRSBalance() public view returns (uint) {
        return SCRSToken.balanceOf(address(this));
    }

    function withdrawSCRSBalance() public onlyOwner {
        uint balance = SCRSToken.balanceOf(address(this));
        SCRSToken.transfer(msg.sender, balance);
    }

    function fundLotteryPot(uint _amount) public onlyOwner {
        lotteryPot += _amount;
        lotteryActive = true;
        SCRSToken.transfer(address(this), _amount);
    }

    function enterLottery(address _player, uint _entryCount) public payable {
        uint entryCost = _entryCount * ENTRY_FEE;
        uint nftBalance = SCRSNFT.balanceOf(_player);
        uint tokenBalance = SCRSToken.balanceOf(_player);
        
        require(nftBalance > 0, "Only for Sicarius holders!");

        require(tokenBalance >= entryCost, "Not enough $SCRS to participate");
        // require(lotteryActive, "Wait for lottery start");

        uint256 allowance = SCRSToken.allowance(_player, address(this));
        require(allowance >= entryCost, "Check the token allowance");

        lotteryPot += entryCost;

        for(uint i = 0; i < _entryCount; i++) {
            lotteryEntrants.push(_player);
        }

        SCRSToken.transferFrom(_player, address(this), entryCost);
    }
    
    function drawWinner(uint index) public onlyOwner {
        uint randomNumber = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender))) % index;
        address winner = lotteryEntrants[randomNumber];
        SCRSToken.transfer(payable(winner), lotteryPot);
        lotteryPot = 0;
        lotteryEntrants = new address[](0);
        lotteryActive = false;
    }
}
