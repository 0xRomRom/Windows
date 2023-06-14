import { ABI } from "./abi.js";
import { STAKING_ABI } from "./stakingAbi.js";

const ticketCount = document.querySelector(".ticket-count");
const incrementTicketCount = document.querySelector(".inc-ticket");
const decrementTicketCount = document.querySelector(".dec-ticket");
const approveLottery = document.querySelector(".approve-lottery");
const approvedTokens = document.querySelector(".approved-tokens");
const enterLottery = document.querySelector(".entr");

const STAKINGCONTRACT = "0x1C0C54E01C5A32f471360eD5AfE638Bc130E8730";
const NFTCONTRACT = "0xaD2bf4b604054C60a1aD7574C0B731967D12000C";


const NFT_ABI = ABI;
const STAKE_ABI = STAKING_ABI;
let nftContractInstance;
let stakingContractInstance;
let staker;
let ticketCounter = 0;

incrementTicketCount.addEventListener("click", () => {
    ticketCounter++;
    ticketCount.innerHTML = "";
    ticketCount.innerHTML = ticketCounter;

    //Approve
    const approved = ticketCounter * 100000;

    approvedTokens.innerHTML = `${ticketCounter > 9 ? (ticketCounter / 10).toLocaleString() + "M" : (ticketCounter * 100).toLocaleString() + "K"}`;
});
decrementTicketCount.addEventListener("click", () => {
    if (ticketCounter === 0) return;
    ticketCounter--;
    ticketCount.innerHTML = "";
    ticketCount.innerHTML = ticketCounter;

    //Approve
    const approved = ticketCounter * 100000;

    approvedTokens.innerHTML = `${ticketCounter > 9 ? (ticketCounter / 10).toLocaleString() + "M" : (ticketCounter * 100).toLocaleString() + "K"}`;

});

approveLottery.addEventListener("click", () => {
    if (ticketCounter === 0) return;
});