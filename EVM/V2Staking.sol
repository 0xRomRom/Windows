// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/security/ReentrancyGuard.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/security/Pausable.sol";

contract SCRSStaking is Ownable, ReentrancyGuard, Pausable {
    using SafeERC20 for IERC20;

    IERC20 public immutable rewardsToken;
    IERC721 public immutable nftCollection;

    struct Staker {
        uint[] stakedTokenIds;
        uint unclaimedRewards;
    }

    // Token ID => Stake timestamp
    mapping(uint => uint) tokenDuration;

    uint constant SECONDS_IN_HOUR = 3600;
    uint private rewardsPerHour = 100000 * 1e18;

    // Staker address => Staker struct
    mapping(address => Staker) public stakers;

    // Token ID => Staker address
    mapping(uint => address) public stakerAddress;

    // Token ID => Array index
    mapping(uint => uint) public tokenIdToArrayIndex;

    constructor(IERC721 _nftCollection, IERC20 _rewardsToken) {
        nftCollection = _nftCollection;
        rewardsToken = _rewardsToken;
    }

    function contractERC20Balance() public view returns (uint) {
        return rewardsToken.balanceOf(address(this));
    }

    function stakeBatch(uint[] calldata _tokenIds) external whenNotPaused {
        require(_tokenIds.length > 0, "Stake more tokens");
        Staker storage staker = stakers[msg.sender];

        uint len = _tokenIds.length;
        for (uint i = 0; i < len; ++i) {
            uint tokenID = _tokenIds[i];
            require(
                nftCollection.ownerOf(tokenID) == msg.sender,
                "Can't stake tokens you don't own!"
            );

            nftCollection.transferFrom(msg.sender, address(this), tokenID);

            staker.stakedTokenIds.push(tokenID);
            stakerAddress[tokenID] = msg.sender;
            tokenDuration[tokenID] = block.timestamp;
        }
    }

    function withdrawBatch(uint[] calldata _tokenIds) external nonReentrant {
        Staker storage staker = stakers[msg.sender];
        require(_tokenIds.length > 0, "No tokens to withdraw");
        require(staker.stakedTokenIds.length > 0, "You have no tokens staked");

        uint len = _tokenIds.length;
        for (uint i = 0; i < len; ++i) {
            uint tokenID = _tokenIds[i];
            require(stakerAddress[tokenID] == msg.sender);

            uint index = tokenIdToArrayIndex[tokenID];
            uint lastTokenIndex = staker.stakedTokenIds.length - 1;
            if (index != lastTokenIndex) {
                staker.stakedTokenIds[index] = staker.stakedTokenIds[
                    lastTokenIndex
                ];
                tokenIdToArrayIndex[staker.stakedTokenIds[index]] = index;
            }
            staker.stakedTokenIds.pop();

            delete stakerAddress[tokenID];

            nftCollection.transferFrom(address(this), msg.sender, tokenID);
        }
    }

    function claimRewards() external {
        Staker storage staker = stakers[msg.sender];
        uint _rewards = calculateRewards(msg.sender);

        require(_rewards > 0, "You have no tokens to claim");

        staker.unclaimedRewards = 0;

        rewardsToken.safeTransfer(msg.sender, _rewards);
    }

    function calculateRewards(address _staker) public view returns (uint) {
        Staker storage staker = stakers[_staker];
        uint _rewards;
        for (uint i = 0; i < staker.stakedTokenIds.length; i++) {
            _rewards +=
                ((tokenDuration[staker.stakedTokenIds[i]] - block.timestamp) *
                    rewardsPerHour) /
                SECONDS_IN_HOUR;
        }
        return _rewards;
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }
}
