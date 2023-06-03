// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721.sol";

contract SCRSStaking {
    struct StakedNFT {
        address owner;
        uint256 nftId;
        uint256 stakeStartTime;
    }

    mapping(address => uint256[]) public stakedNFTs;
    mapping(uint256 => StakedNFT) public nftStakeInfo;

    event NFTMassStaked(address staker, uint[] tokenIDs, uint timestamp);

    //SCRS NFT Contract
    address public SCRSNFT;
    //SCRS ERC20 Token
    address public SCRSTOKEN;

    constructor(address _SCRSNFT, address _SCRSTOKEN) {
        SCRSNFT = _SCRSNFT;
        SCRSTOKEN = _SCRSTOKEN;
    }

    function NFTsHeld(address _wallet) public view returns (uint) {
        return IERC721(SCRSNFT).balanceOf(_wallet);
    }

    function batchStakeNFTs(uint _amount, uint[] _ids) public {
        require(_amount > 0, "Try staking 0 NFTs elsewhere");
        require(NFTsHeld(msg.sender) >= _amount, "Not enough NFT's to stake");

        for (uint256 i = 0; i < _amount; i++) {
            stakedNFTs[msg.sender].push(_ids[i]);
            nftStakeInfo[_ids[i]] = StakedNFT(
                msg.sender,
                _ids[i],
                block.timestamp
            );
            approve(address(this), _ids[i]);
            transferFrom(msg.sender, address(this), _ids[i]);
        }
        emit NFTMassStaked(msg.sender, _ids, block.timestamp);
    }

    function claimTokens() public {}

    function claimNFTS() public {}

    function claimNFTandToken() public {}
}
