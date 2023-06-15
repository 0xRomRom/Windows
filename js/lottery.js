import { LOTTERY_ABI } from "./lotteryAbi.js";
import { TOKENABI } from "./tokenAbi.js";

const metamaskBox = document.querySelector(".lottery-metamask-box");
const lotteryBox = document.querySelector(".lottery-inner");
const connectLotteryMetamask = document.querySelector(".lott-metamask-connect");
const playerWalletText = document.querySelector(".lott-wallet");
const lotteryTokenCount = document.querySelector(".lott-tokencount");
const lotteryApprovedCount = document.querySelector(".lott-approved-count");
const lotteryPlayerCount = document.querySelector(".lott-player-entrycount");
const lotteryTotalPlayerCount = document.querySelector(".lott-total-players");
const lotteryTotalEntries = document.querySelector(".lott-total-entries");


const ticketCount = document.querySelector(".ticket-count");
const incrementTicketCount = document.querySelector(".inc-ticket");
const decrementTicketCount = document.querySelector(".dec-ticket");
const approveLottery = document.querySelector(".approve-lottery");
const approvedTokens = document.querySelector(".approved-tokens");
const enterLottery = document.querySelector(".entr");

//Contracts
const LOTTERYCONTRACT = "0x1C0C54E01C5A32f471360eD5AfE638Bc130E8730";
const SCRSTOKENCONTRACT = "0xaD2bf4b604054C60a1aD7574C0B731967D12000C";

const SCRSABI = TOKENABI;
const LOTT_ABI = LOTTERY_ABI;
let scrsTokenContractInstance;
let lotteryContractInstance;

//Player
let player;
let ticketCounter = 0;
let scrsTokenCount = 0;
let scrsApprovedCount = 0;
let playerEntryCount = 0;
let totalPlayerCount = 0;

incrementTicketCount.addEventListener("click", () => {
    ticketCounter++;
    ticketCount.innerHTML = "";
    ticketCount.innerHTML = ticketCounter;
    approvedTokens.innerHTML = `${ticketCounter > 9 ? (ticketCounter / 10).toLocaleString() + "M" : (ticketCounter * 100).toLocaleString() + "K"}`;
});

decrementTicketCount.addEventListener("click", () => {
    if (ticketCounter === 0) return;
    ticketCounter--;
    ticketCount.innerHTML = "";
    ticketCount.innerHTML = ticketCounter;
    approvedTokens.innerHTML = `${ticketCounter > 9 ? (ticketCounter / 10).toLocaleString() + "M" : (ticketCounter * 100).toLocaleString() + "K"}`;
});

approveLottery.addEventListener("click", async () => {
    if (ticketCounter === 0) return;
    const nftBalance = await scrsTokenContractInstance.methods.balanceOf(player);
    if (Number(nftBalance) < 1) {
        alert("Buy a Sicarius to participate!");
        return;
    }

    await lotteryContractInstance.methods.enterLottery(player)



});

enterLottery.addEventListener("click", () => { });

connectLotteryMetamask.addEventListener("click", async () => {
    if (!window.ethereum) {
        alert("Install Metamask to continue. Visit https://metamask.io");
        return;
    }

    // SCRSTOKENCONTRACT = new web3.eth.Contract(SCRSABI, SCRSTOKENCONTRACT);
    // LOTTERYCONTRACT = new web3.eth.Contract(LOTT_ABI, LOTTERYCONTRACT);

    //Setup Web3 & Player
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.send("eth_requestAccounts");
    const accounts = await web3.eth.getAccounts();
    player = accounts[0];
    playerWalletText.innerHTML = `Wallet:<br> ${player.slice(0, 8)}...`

    //Player SCRS Token Balance
    // scrsTokenCount = await SCRSTOKENCONTRACT.methods.balanceOf(player);
    // lotteryTokenCount.innerHTML = `$SCRS Balance: <br>${scrsTokenCount.toLocaleString()}`;


    //Player SCRS Approved Balance
    // scrsApprovedCount = await SCRSTOKENCONTRACT.methods.allowance(player, LOTTERYCONTRACT);
    // lotteryApprovedCount.innerHTML = `$SCRS Approved: <br>${scrsApprovedCount.toLocaleString()};

    //Player entrycount
    // totalPlayerCount = await LOTTERYCONTRACT.methods.getEntrantsCount().call();

    // for (let i = 0; i < Number(totalPlayerCount); i++) {
    //     let currentPlayer = await LOTTERYCONTRACT.methods.lotteryEntrant(i);

    //     if (currentPlayer === player) {
    //         playerEntryCount++;
    //     }
    // }

    // lotteryPlayerCount.innerHTML = `Entry Count: <br>${Number(playerEntryCount)}`;

    //Total player count
    // totalPlayerCount = await LOTTERYCONTRACT.methods.getEntrantsCount().call();
    // lotteryTotalPlayerCount.innerHTML = `Total Players:<br>${Number(totalPlayerCount)}`;

    //Game total entries
    // lotteryTotalEntries.innerHTML = `Total Entries:<br>${Number(totalPlayerCount)}`;




    metamaskBox.classList.add("hidden");
    lotteryBox.classList.remove("hidden");
});