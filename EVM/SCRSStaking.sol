// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721.sol";

contract SCRSStaking {
    address public SCRSNFT;

    constructor(address _SCRSNFT) {
        SCRSNFT = _SCRSNFT;
    }

    mapping(address => uint) public userStakeCount;

    function NFTsHeld(address _wallet) public view returns (uint) {
        return IERC721(SCRSNFT).balanceOf(_wallet);
    }

    function stakeNFT(uint _amount) public {
        uint NFTsOwned = NFTsHeld(msg.sender);
        require(NFTsOwned >= _amount, "Not enough NFT's to stake");
    }

    function claimTokens() public {}

    function claimNFTS() public {}

    function claimNFTandToken() public {}
}
