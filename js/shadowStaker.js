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
const loadingScreen = document.querySelector(".staker-loading");


const STAKINGCONTRACT = "0x302931965577C15C87837225856Aac38199919C0";
const NFTCONTRACT = "0x01915fED0c5B9cb2e10a596fE8a3a541CEA274fE";


const NFT_ABI = ABI;
const STAKE_ABI = STAKING_ABI;
let staker;
let nftContractInstance;
let stakingContractInstance;

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
        stakerWalletText.innerHTML = `Wallet: ${staker}`

        nftContractInstance = new web3.eth.Contract(NFT_ABI, NFTCONTRACT);
        stakingContractInstance = new web3.eth.Contract(STAKE_ABI, STAKINGCONTRACT);

        //Stake count
        const amountStaked = await stakingContractInstance.methods
            .stakerTokenIDs(staker)
            .call();
        console.log(amountStaked)
        stakerStakedCountText.innerHTML = '';
        stakerStakedCountText.innerHTML = `Staked NFT Count: ${amountStaked.length}`;

        //Unstaked count
        const unstakedIDs = await getTokenIDs(staker);
        console.log(unstakedIDs)
        stakerUnstakedCountText.innerHTML = '';
        stakerUnstakedCountText.innerHTML = `Unstaked NFT Count: ${unstakedIDs.length}`;

        //Unclaimed rewards
        const unclaimedCount = await stakingContractInstance.methods.calculateRewards(staker).call();
        stakerUnclaimedCountText.innerHTML = '';
        stakerUnclaimedCountText.innerHTML = `Unclaimed Rewards: ${unclaimedCount}`;

        //Total accumulated
        const accumulated = await stakingContractInstance.methods.totalAccumulated(staker).call();
        stakerAccumulatedCountText.innerHTML = '';
        stakerAccumulatedCountText.innerHTML = `Total Accumulated: ${Number(accumulated)}`;

        tab1.classList.add("hidden");
        // const approved = await stakingContractInstance.methods.checkIfApproved(staker).call();
        // console.log(approved);
        const approved = await nftContractInstance.methods.isApprovedForAll(staker, STAKINGCONTRACT).call();
        console.log(approved);

        //fetch approved status 
        loadingScreen.classList.add('hidden');
        if (approved) {
            tab3.classList.remove("hidden");
        } else {
            tab2.classList.remove("hidden");
        }

    }
});

approvalButton.addEventListener("click", async () => {
    try {
        const approval1 = await nftContractInstance.methods.isApprovedForAll(staker, STAKINGCONTRACT).call();
        console.log(`Pre request: ${approval1}`);

        loadingScreen.classList.remove('hidden');
        const approved = await nftContractInstance.methods.setApprovalForAll(STAKINGCONTRACT, true).send({from: staker});
        console.log(approved);

        const approval2 = await nftContractInstance.methods.isApprovedForAll(staker, STAKINGCONTRACT).call();
        console.log(`Post request: ${approval2}`);

        if (approval2) {
            loadingScreen.classList.add('hidden');
            tab2.classList.add("hidden");
            tab3.classList.remove("hidden");
            return;
        }
        console.log(result);

        //show tab 3

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