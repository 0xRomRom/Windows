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
        uint256[] stakedTokenIds;
        uint256 unclaimedRewards;
    }
    mapping(uint => uint) tokenDuration;

    uint256 constant SECONDS_IN_HOUR = 3600;
    uint256 private rewardsPerHour = 100000 * 1e18;

    // Staker address => Staker struct
    mapping(address => Staker) public stakers;

    // Token ID => Staker address
    mapping(uint256 => address) public stakerAddress;

    constructor(IERC721 _nftCollection, IERC20 _rewardsToken) {
        nftCollection = _nftCollection;
        rewardsToken = _rewardsToken;
    }

    function contractERC20Balance() public view returns (uint) {
        return rewardsToken.balanceOf(address(this));
    }

    function stake(uint256[] calldata _tokenIds) external whenNotPaused {
        Staker storage staker = stakers[msg.sender];

        uint256 len = _tokenIds.length;
        for (uint256 i; i < len; ++i) {
            require(
                nftCollection.ownerOf(_tokenIds[i]) == msg.sender,
                "Can't stake tokens you don't own!"
            );

            nftCollection.transferFrom(msg.sender, address(this), _tokenIds[i]);

            staker.stakedTokenIds.push(_tokenIds[i]);
            stakerAddress[_tokenIds[i]] = msg.sender;
        }
    }

    function withdraw(uint256[] calldata _tokenIds) external nonReentrant {
        Staker storage staker = stakers[msg.sender];
        require(staker.stakedTokenIds.length > 0, "You have no tokens staked");

        uint256 lenToWithdraw = _tokenIds.length;
        for (uint256 i; i < lenToWithdraw; ++i) {
            require(stakerAddress[_tokenIds[i]] == msg.sender);

            uint256 lastTokenIndex = staker.stakedTokenIds.length - 1;
            if (index != lastTokenIndex) {
                staker.stakedTokenIds[index] = staker.stakedTokenIds[
                    lastTokenIndex
                ];
            }
            staker.stakedTokenIds.pop();

            delete stakerAddress[_tokenIds[i]];

            nftCollection.transferFrom(address(this), msg.sender, _tokenIds[i]);
        }
    }

    function claimRewards() external {
        Staker storage staker = stakers[msg.sender];

        uint256 rewards = calculateRewards(msg.sender) +
            staker.unclaimedRewards;
        require(rewards > 0, "You have no rewards to claim");

        staker.unclaimedRewards = 0;

        rewardsToken.safeTransfer(msg.sender, rewards);
    }

    function userStakeInfo(
        address _user
    )
        public
        view
        returns (uint256[] memory _stakedTokenIds, uint256 _availableRewards)
    {
        return (stakers[_user].stakedTokenIds, availableRewards(_user));
    }

    function availableRewards(
        address _user
    ) internal view returns (uint256 _rewards) {
        Staker storage staker = stakers[_user];

        if (staker.stakedTokenIds.length == 0) {
            return staker.unclaimedRewards;
        }

        _rewards = staker.unclaimedRewards + calculateRewards(_user);
    }

    function calculateRewards(
        address _staker
    ) public view returns (uint256 _rewards) {
        Staker storage staker = stakers[_staker];
        return (((
            ((block.timestamp - staker.timeOfLastUpdate) *
                staker.stakedTokenIds.length)
        ) * rewardsPerHour) / SECONDS_IN_HOUR);
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }
}
