import { ABI } from "./abi.js";
import { STAKING_ABI } from "./stakingAbi.js";

const connectMetamask = document.querySelector('.connect-meta-stake');
const approvalButton = document.querySelector('.approval-btn');
const tab1 = document.querySelector(".tab1");
const tab2 = document.querySelector(".tab2");
const tab3 = document.querySelector(".tab3");
const stakerWalletText = document.querySelector(".staker-wallet");
const stakerStakedCountText = document.querySelector(".staker-staked-count");
const stakerUnstakedCountText = document.querySelector(".staked-unstaked-count");
const stakerUnclaimedCountText = document.querySelector(".staked-unclaimed-rewards");
const stakerAccumulatedCountText = document.querySelector(".staker-total-accumulated");
const vaultTotalBalance = document.querySelector(".vault-total-balance");
const totalVaultClaimed = document.querySelector(".total-vault-claimed");
const loadingScreen = document.querySelector(".staker-loading");
const walletNFTwrapper = document.querySelector(".wallet-nfts");
const vaultNFTwrapper = document.querySelector(".vault-nfts");
const totalStakersCountText = document.querySelector(".total-stakers");
const totalNFTsStakedCountText = document.querySelector(".total-nfts-staked");
const stakingDurationText = document.querySelector(".staking-duration");


const STAKINGCONTRACT = "0xB4839cCa1bF4c596D26B4a64137E89A8d366cFE8";
const NFTCONTRACT = "0xe9617CC716642E66dfE9E0fB143C6c1f966b7DBd";


const NFT_ABI = ABI;
const STAKE_ABI = STAKING_ABI;
let staker;
let nftContractInstance;
let stakingContractInstance;
let totalNFTSStakedCurrently;
let totalStakersCount = 0;

let userTokenIDs = [];
let queuedForStaking = [];

let userStakedTokenIDs = [];
let queuedForUnstaking = [];

connectMetamask.addEventListener('click', async () => {
    if (!window.ethereum) {
        alert("No wallet detected.");
        return;
    }

    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);

        await window.ethereum.send("eth_requestAccounts");
        const accounts = await web3.eth.getAccounts();
        staker = accounts[0];
        loadingScreen.classList.remove('hidden');

        //Wallet address
        stakerWalletText.innerHTML = ``
        stakerWalletText.innerHTML = `Wallet: ${staker.slice(0, 15)}...`

        nftContractInstance = new web3.eth.Contract(NFT_ABI, NFTCONTRACT);
        stakingContractInstance = new web3.eth.Contract(STAKE_ABI, STAKINGCONTRACT);


        let addyArray = [];
        const supply = await nftContractInstance.methods.CURRENT_SUPPLY().call();

        //Total NFT staked currently
        for (let i = 1; i < Number(supply) + 1; i++) {
            const totalStaked = await stakingContractInstance.methods.stakerAddress(i).call();
            if ((totalStaked) !== '0x0000000000000000000000000000000000000000') {
                addyArray.push(totalStaked);
                totalNFTSStakedCurrently = addyArray.length;
            }

        }
        totalNFTsStakedCountText.innerHTML = '';
        totalNFTsStakedCountText.innerHTML = `Total NFTs Staked: ${totalNFTSStakedCurrently}`;

        //Total stakers
        addyArray = Array.from(new Set(addyArray));
        totalStakersCountText.innerHTML = '';
        totalStakersCountText.innerHTML = `Total Stakers: ${addyArray.length}`;

        //Stake count
        const amountStaked = await stakingContractInstance.methods
            .stakerTokenIDs(staker)
            .call();
        stakerStakedCountText.innerHTML = '';
        stakerStakedCountText.innerHTML = `Staked NFT Count: ${amountStaked.length}`;

        //Unstaked count
        const unstakedIDs = await getTokenIDs(staker);
        userTokenIDs = unstakedIDs;
        stakerUnstakedCountText.innerHTML = '';
        stakerUnstakedCountText.innerHTML = `Unstaked NFT Count: ${unstakedIDs.length}`;

        //Unclaimed rewards
        stakerUnclaimedRewards();

        //Staker total accumulated
        stakerTotalAccumulated();

        //Staking duration
        const totalAccumulated = await stakingContractInstance.methods.totalClaimed().call();
        const converted = +totalAccumulated.toString().slice(0, -18);
        const percentage = (converted / 2000000000) * 100;
        stakingDurationText.innerHTML = '';
        stakingDurationText.innerHTML = `Staking Duration: ${Math.floor(percentage)}/100%`;


        tab1.classList.add("hidden");

        const approved = await nftContractInstance.methods.isApprovedForAll(staker, STAKINGCONTRACT).call();

        //fetch approved status 
        loadingScreen.classList.add('hidden');
        if (approved) {
            const accounts = await web3.eth.getAccounts();
            staker = accounts[0];
            renderWallet();
            renderVault();
            getVaultBalance();
            getTotalAccumulatedRewards();
            tab3.classList.remove("hidden");
        } else {
            tab2.classList.remove("hidden");
        }

    }
});

approvalButton.addEventListener("click", async () => {
    try {
        loadingScreen.classList.remove('hidden');
        const approved = await nftContractInstance.methods.setApprovalForAll(STAKINGCONTRACT, true).send({ from: staker });
        console.log(approved);

        const approval2 = await nftContractInstance.methods.isApprovedForAll(staker, STAKINGCONTRACT).call();
        console.log(`Post request: ${approval2}`);

        if (approval2) {
            loadingScreen.classList.add('hidden');
            const accounts = await web3.eth.getAccounts();
            staker = accounts[0];
            renderWallet();
            tab2.classList.add("hidden");
            tab3.classList.remove("hidden");
        } else {
            return;
        }
    } catch (err) {
        console.error(err);
        // alert('failed')
        loadingScreen.classList.add('hidden');

    }
});

async function getTokenIDs(wallet) {
    let ownerIndexes = [];
    try {
        window.web3 = new Web3(window.ethereum);
        nftContractInstance = new web3.eth.Contract(NFT_ABI, NFTCONTRACT);

        const currentSup = await nftContractInstance.methods
            .CURRENT_SUPPLY()
            .call();
        const currentSupply = parseInt(currentSup);
        for (let i = 1; i < currentSupply + 1; i++) {
            let res = await nftContractInstance.methods.ownerOf(i.toString()).call();

            if (res.toString() === wallet) {
                ownerIndexes.push(i);
            }
        }
        return ownerIndexes;
    } catch (err) {
        console.error(err);
    }
}


const stakerUnclaimedRewards = async () => {
    const unclaimedCount = await stakingContractInstance.methods.calculateRewards(staker).call();
    stakerUnclaimedCountText.innerHTML = '';
    stakerUnclaimedCountText.innerHTML = `Unclaimed Rewards: ${Number(unclaimedCount) > 0 ? unclaimedCount.toString().slice(0, -18) : 0} $SCRS`;
};

const stakerTotalAccumulated = async () => {
    const accumulated = await stakingContractInstance.methods.totalAccumulated(staker).call();
    stakerAccumulatedCountText.innerHTML = '';
    stakerAccumulatedCountText.innerHTML = `Total Accumulated: ${Number(accumulated) > 0 ? accumulated.toString().slice(0, -18) : 0} $SCRS`;
};

const getVaultTokenIDs = async (wallet) => {
    let ownerIndexes = [];
    try {
        window.web3 = new Web3(window.ethereum);
        nftContractInstance = new web3.eth.Contract(NFT_ABI, NFTCONTRACT);

        const currentlyStaked = await nftContractInstance.methods
            .CURRENT_SUPPLY()
            .call();
        const currentSupply = parseInt(currentlyStaked);
        for (let i = 1; i < currentSupply + 1; i++) {
            let res = await stakingContractInstance.methods.stakerAddress(i).call();

            if (res.toString() === wallet) {
                ownerIndexes.push(i);
            }
        }
        return ownerIndexes;
    } catch (err) {
        console.error(err);
    }
}

const renderWallet = async () => {
    userTokenIDs = await getTokenIDs(staker);
    // userTokenIDs = [1, 2, 3, 4];
    userTokenIDs.map((token) => {
        walletNFTwrapper.innerHTML += `<div class="wallet-nft" data-nft="${token}">
                                        <img src="https://ipfs.io/ipfs/bafybeiakbvi37hhzvmrokwuy5kcdr6n36eerrtteeodj2xc74ymku7tgli/${token}.png" alt="NFT" class="nft-mini">
                                        <span class="nft-id">#${token}</span>
                                        </div>`
    });
};

const renderVault = async () => {
    userStakedTokenIDs = await getVaultTokenIDs(staker);
    // userTokenIDs = [1, 2, 3, 4];
    userStakedTokenIDs.map((token) => {
        vaultNFTwrapper.innerHTML += `<div class="vault-nft" data-nft="${token}">
                                        <img src="https://ipfs.io/ipfs/bafybeiakbvi37hhzvmrokwuy5kcdr6n36eerrtteeodj2xc74ymku7tgli/${token}.png" alt="NFT" class="nft-mini">
                                        <span class="nft-id">#${token}</span>
                                        </div>`
    });
}

const getVaultBalance = async () => {
    try {
        window.web3 = new Web3(window.ethereum);
        nftContractInstance = new web3.eth.Contract(NFT_ABI, NFTCONTRACT);

        const vaultBalance = await stakingContractInstance.methods.contractERC20Balance().call();
        vaultTotalBalance.innerHTML = '';
        vaultTotalBalance.innerHTML = `Current Vault Balance: ${vaultBalance.toLocaleString().slice(0, -24)}`;
    } catch (err) {
        console.error(err);
    }
};

const getTotalAccumulatedRewards = async () => {
    const totalAccumulated = await stakingContractInstance.methods.totalClaimed().call();
    totalVaultClaimed.innerHTML = '';
    totalVaultClaimed.innerHTML = `Total Accumulated Rewards: ${totalAccumulated.toLocaleString().slice(0, -24)}`;
};


//Select wallet NFTs
const walletNFTBox = document.querySelector(".wallet-nfts");
walletNFTBox.addEventListener("click", (e) => {
    const element = e.target.parentNode;
    if (element.dataset.nft === undefined) return;

    //Add to queue array
    queuedForStaking.push(+element.dataset.nft)

    //Toggle styling
    const selectedBool = element.classList.contains('selected');
    if (!selectedBool) {
        element.classList.add("selected");
        return;
    }

    element.classList.remove("selected");
    queuedForStaking = queuedForStaking.filter(num => num !== +element.dataset.nft);
});


//Select vault NFTs
const vaultNFTBox = document.querySelector(".vault-nfts");
vaultNFTBox.addEventListener("click", (e) => {
    const element = e.target.parentNode;
    if (element.dataset.nft === undefined) return;

    //Add to queue array
    queuedForUnstaking.push(+element.dataset.nft)

    //Toggle styling
    const selectedBool = element.classList.contains('selected');
    if (!selectedBool) {
        element.classList.add("selected");
        return;
    }

    element.classList.remove("selected");
    queuedForUnstaking = queuedForUnstaking.filter(num => num !== +element.dataset.nft);
});

// Staking CTAs

const stakeSingle = document.querySelector(".stake-single");
const stakeBatch = document.querySelector(".stake-batch");
const claimRewards = document.querySelector(".claim-rewards");
const unstakeSingle = document.querySelector(".unstake-single");
const unstakeBatch = document.querySelector(".unstake-batch");

stakeSingle.addEventListener("click", () => { });
stakeBatch.addEventListener("click", () => { });

claimRewards.addEventListener("click", async () => {
    await stakingContractInstance.methods.claimRewards().send({ from: staker });
    stakerUnclaimedRewards();
    getTotalAccumulatedRewards();
    stakerTotalAccumulated();
    getVaultBalance();
});

unstakeSingle.addEventListener("click", () => { });
unstakeBatch.addEventListener("click", () => { });