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

    // 0x6F668f639054020DB54bD2395Bc933539F2f1eD4
    IERC20 public immutable rewardsToken;
    IERC721 public immutable nftCollection;

    struct Staker {
        uint[] stakedTokenIds;
        uint unclaimedRewards;
        uint totalAccumulated;
    }

    uint constant SECONDS_IN_HOUR = 3600;
    uint public rewardsPerHour = 100 * 1e18;

    // Token ID => Stake timestamp
    mapping(uint => uint) public tokenDuration;

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

    function checkIfApproved(address _address) public view returns (bool) {
        return nftCollection.isApprovedForAll(_address, address(this));
    }

    function stakerTokenIDs() public view returns (uint[] memory) {
        Staker storage staker = stakers[msg.sender];

        uint len = staker.stakedTokenIds.length;
        uint[] memory tokenIDs = new uint[](len);
        for (uint i = 0; i < len; i++) {
            tokenIDs[i] = staker.stakedTokenIds[i];
        }
        return tokenIDs;
    }

    function nftStakeCount(_staker) public view returns (uint) {
        Staker storage staker = stakers[_staker];
        return staker.stakedTokenIds.length;
    }

    function totalAccumulated(_staker) public view returns (uint) {
        Staker storage staker = stakers[_staker];
        return staker.totalAccumulated;
    }

    function stakeSingle(uint _tokenID) public whenNotPaused {
        require(_tokenID > 0, "Invalid token");
        require(nftCollection.ownerOf(_tokenID) == msg.sender, "Can't stake tokens you don't own!");
        Staker storage staker = stakers[msg.sender];

        nftCollection.transferFrom(msg.sender, address(this), _tokenID);

        staker.stakedTokenIds.push(_tokenID);
        uint index = staker.stakedTokenIds.length - 1;
        tokenIdToArrayIndex[_tokenID] = index;

        stakerAddress[_tokenID] = msg.sender;
        tokenDuration[_tokenID] = block.timestamp;
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

            staker.stakedTokenIds.push(tokenID);

            uint index = staker.stakedTokenIds.length - 1;
            tokenIdToArrayIndex[tokenID] = index;
            stakerAddress[tokenID] = msg.sender;
            tokenDuration[tokenID] = block.timestamp;

            nftCollection.transferFrom(msg.sender, address(this), tokenID);
        }
    }

    function withdrawSingle(uint _tokenID)public {
        Staker storage staker = stakers[msg.sender];
        require(_tokenID > 0, "No tokens to withdraw");
        require(staker.stakedTokenIds.length > 0, "You have no tokens staked");
        require(stakerAddress[_tokenID] == msg.sender);

        uint index = tokenIdToArrayIndex[_tokenID];

        staker.unclaimedRewards += ((block.timestamp - tokenDuration[_tokenID] ) *
                    rewardsPerHour) /
                SECONDS_IN_HOUR;
 
            uint lastTokenIndex = staker.stakedTokenIds.length - 1;
            if (index != lastTokenIndex) {
                staker.stakedTokenIds[index] = staker.stakedTokenIds[
                    lastTokenIndex
                ];
                tokenIdToArrayIndex[staker.stakedTokenIds[index]] = index;
            }
            staker.stakedTokenIds.pop();
            delete tokenIdToArrayIndex[_tokenID];
            delete stakerAddress[_tokenID];
            nftCollection.transferFrom(address(this), msg.sender, _tokenID);
            rewardsToken.safeTransfer(msg.sender, staker.unclaimedRewards);
            staker.totalAccumulated += staker.unclaimedRewards;
            staker.unclaimedRewards = 0;
    }

    function withdrawBatch(uint[] calldata _tokenIds) external nonReentrant {
        Staker storage staker = stakers[msg.sender];
        require(_tokenIds.length > 0, "No tokens to withdraw");
        require(staker.stakedTokenIds.length > 0, "You have no tokens staked");

        claimRewards();
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
            delete tokenIdToArrayIndex[tokenID];
            delete stakerAddress[tokenID];

            nftCollection.transferFrom(address(this), msg.sender, tokenID);
        }
    }

    function claimRewards() public {
        Staker storage staker = stakers[msg.sender];
        uint _rewards = calculateRewards(msg.sender);
        require(_rewards > 0, "You have no tokens to claim");

        uint len = staker.stakedTokenIds.length;
        for(uint i = 0; i < len; i++) {
            tokenDuration[staker.stakedTokenIds[i]] = block.timestamp;
        }

        rewardsToken.safeTransfer(msg.sender, _rewards);
        staker.totalAccumulated += _rewards;
        staker.unclaimedRewards = 0;
    }

    function calculateRewards(address _staker) public view returns (uint) {
        Staker storage staker = stakers[_staker];
        uint _rewards;
        for (uint i = 0; i < staker.stakedTokenIds.length; i++) {
            _rewards +=             //Maps to stake timestamp
                ((block.timestamp - tokenDuration[staker.stakedTokenIds[i]] ) *
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
