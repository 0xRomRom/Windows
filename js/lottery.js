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
const lotteryProbabilityText = document.querySelector(".lott-probability");
const lotteryWinPotText = document.querySelector(".lottery-winpot");


const ticketCount = document.querySelector(".ticket-count");
const incrementTicketCount = document.querySelector(".inc-ticket");
const decrementTicketCount = document.querySelector(".dec-ticket");
const approveLottery = document.querySelector(".approve-lottery");
const approvedTokens = document.querySelector(".approved-tokens");
const enterLottery = document.querySelector(".entr");

//Contracts
let LOTTERYCONTRACT = "0xBb38d2bb8195b0F491157908Fd84678366ADffbA";
let SCRSTOKENCONTRACT = "0x5AdC95C2143E459DbF538ba74411be12cB5E8CaE";

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
let lotteryProbability = 0;
let lotteryWinPot = 0;

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

});

enterLottery.addEventListener("click", async () => {
    console.log("Entering");
    try {
        console.log(player);
        console.log(lotteryContractInstance)
        await lotteryContractInstance.methods.enterLottery(player, ticketCounter).send({ from: player });
    } catch (err) {
        console.log(err);
    }
});

connectLotteryMetamask.addEventListener("click", async () => {
    try {

        if (!window.ethereum) {
            alert("Install Metamask to continue. Visit https://metamask.io");
            return;
        }

        //Setup Web3 & Player
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.send("eth_requestAccounts");
        const accounts = await web3.eth.getAccounts();
        scrsTokenContractInstance = new web3.eth.Contract(SCRSABI, SCRSTOKENCONTRACT);
        lotteryContractInstance = new web3.eth.Contract(LOTT_ABI, LOTTERYCONTRACT);

        player = accounts[0];
        playerWalletText.innerHTML = `Wallet:<br> ${player.slice(0, 8)}...`

        //Lottery Win Pot
        lotteryWinPot = await lotteryContractInstance.methods.lotteryPot().call();
        let convertedPot = Number(lotteryWinPot) / 1E18;
        lotteryWinPotText.innerHTML = `Enter for a chance at:<br> ${Number(convertedPot).toLocaleString()} $SCRS`

        //Player SCRS Token Balance
        let fetchBalance = await scrsTokenContractInstance.methods.balanceOf(player).call();
        scrsTokenCount = Number(fetchBalance) / 1E18;
        lotteryTokenCount.innerHTML = `$SCRS Balance: <br>${Number(scrsTokenCount).toLocaleString()}`;

        // Player SCRS Approved Balance
        scrsApprovedCount = await scrsTokenContractInstance.methods.allowance(player, LOTTERYCONTRACT).call();
        let approvedSCRS = Number(scrsApprovedCount) / 1E18;
        lotteryApprovedCount.innerHTML = `$SCRS Approved: <br>${(Number(approvedSCRS)).toLocaleString()}`;

        //Total players count
        totalPlayerCount = await lotteryContractInstance.methods.getEntrantsCount().call();

        let playerEntryArray = [];
        for (let i = 0; i < Number(totalPlayerCount); i++) {
            let currentPlayer = await lotteryContractInstance.methods.lotteryEntrant(i).call();
            playerEntryArray.push(currentPlayer);
        }
        let filteredTotalPlayers = Array.from(new Set(playerEntryArray));

        playerEntryCount = filteredTotalPlayers.length;
        lotteryTotalPlayerCount.innerHTML = `Entry Count: <br>${Number(playerEntryCount)}`;


        //Player entry count

        //Total entrants count
        totalPlayerCount = await lotteryContractInstance.methods.getEntrantsCount().call();
        lotteryTotalPlayerCount.innerHTML = `Total Players:<br>${Number(totalPlayerCount)}`;


        // //Game total entries
        // let entrants = [];
        // for (let i = 0; i < Number(totalPlayerCount); i++) {
        //     let entrant = await lotteryContractInstance.methods.lotteryEntrant(i).call();
        //     entrants.push(entrant);
        // }
        // let filteredEntrants = Array.from(new Set(entrants));
        // lotteryTotalEntries.innerHTML = `Total Entries:<br>${Number(filteredEntrants).length > 0 ? Number(filteredEntrants).length : 0}`;

        // //Player Probability
        // lotteryProbability = Number(totalPlayerCount) / Number(playerEntryCount);
        // lotteryProbabilityText.innerHTML = `Probability:<br> ${Number(lotteryProbability) > 0 ? Number(lotteryProbability).toString().slice(0, 5) : 0}%`;

        //Pot in USD


        //Entryprice in USD

        metamaskBox.classList.add("hidden");
        lotteryBox.classList.remove("hidden");

    } catch (err) {
        console.log(err);
    }
});