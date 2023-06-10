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


const STAKINGCONTRACT = "0xB996E38B21d7Ba9376BfD6D830C4F8b976DE119f";
const NFTCONTRACT = "0xDe4e543bDF19Cb2F9bec2d102cCA9DB567963c95";


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

        // window.web3 = new Web3(
        //     "https://eth-sepolia.g.alchemy.com/v2/Jk8zckMhO9UxxVBktHc288V6s6UCweAo"
        // );

        

        await window.ethereum.send("eth_requestAccounts");
        const accounts = await web3.eth.getAccounts();
        staker = accounts[0];

        console.log('Wallet retrieved');
        
        //Wallet address
        stakerWalletText.innerHTML = ``
        stakerWalletText.innerHTML = `Wallet: ${staker}`
        
        nftContractInstance = new web3.eth.Contract(NFT_ABI, NFTCONTRACT);
        stakingContractInstance = new web3.eth.Contract(STAKE_ABI, STAKINGCONTRACT);
        console.log(nftContractInstance);
        console.log(stakingContractInstance);
        
        console.log('Starting NFT');
        //NFT Contract

        //Stake count
        const amountStaked = await stakingContractInstance.methods
            .stakerTokenIDs(staker)
            .call();
        console.log(amountStaked)
        stakerStakedCountText.innerHTML = '';
        stakerStakedCountText.innerHTML = `Staked NFT Count: ${amountStaked.length}`;

        console.log("Finished NFT");
        console.log("Starting Unstaked count");


        //Unstaked count
        const unstakedIDs = await getTokenIDs(staker);
        console.log(unstakedIDs)
        stakerUnstakedCountText.innerHTML = '';
        stakerUnstakedCountText.innerHTML = `Unstaked NFT Count: ${unstakedIDs.length}`;

        console.log("Unstaked count finished");
        console.log("Starting unclaimed count");

        //Unclaimed rewards
        const unclaimedCount = await stakingContractInstance.methods.calculateRewards(staker).call();
        stakerUnclaimedCountText.innerHTML = '';
        stakerUnclaimedCountText.innerHTML = `Unclaimed Rewards: ${unclaimedCount}`;


        //Total accumulated

        const accumulated = await stakingContractInstance.methods.totalAccumulated(staker).call();
        stakerAccumulatedCountText.innerHTML = '';
        stakerAccumulatedCountText.innerHTML = `Total Accumulated: ${Number(accumulated)}`;


        // const curr_supp = await nftContractInstance.methods
        // .CURRENT_SUPPLY()
        // .call();

        tab1.classList.add("hidden");


        const approved = stakingContractInstance.methods.checkIfApproved(staker).call();


        //fetch approved status 

        // if approved open tab 3
        // if not approved open tab 2
        if (approved) {
            tab3.classList.remove("hidden");
        } else {
            tab2.classList.remove("hidden");
        }

    }
});

approvalButton.addEventListener("click", async () => {

    //Approve contract

    const approved = await nftContractInstance.methods.setApprovalForAll(STAKINGCONTRACT, true);

    //show tab 3
    if (approved) {
        tab2.classList.add("hidden");
        tab3.classList.remove("hidden");
    }
});



async function getTokenIDs(wallet) {
    const CONTRACT = "0xDe4e543bDF19Cb2F9bec2d102cCA9DB567963c95";
    let ownerIndexes = [];
    try {
        // const web3 = new Web3(
        //     "https://eth-sepolia.g.alchemy.com/v2/Jk8zckMhO9UxxVBktHc288V6s6UCweAo"
        // );
        console.log("Starting getTokenIds")
        window.web3 = new Web3(window.ethereum);

        nftContractInstance = new web3.eth.Contract(NFT_ABI, CONTRACT);

        console.log("Got contract instance");
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