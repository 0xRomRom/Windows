import { LOTTERY_ABI } from "./lotteryAbi.js";
import { TOKENABI } from "./tokenAbi.js";
import { ABI } from "./abi.js";



// const metamaskBox = document.querySelector(".lottery-metamask-box");
// const lotteryBox = document.querySelector(".lottery-inner");
// const connectLotteryMetamask = document.querySelector(".lott-metamask-connect");
// const playerWalletText = document.querySelector(".lott-wallet");
// const lotteryTokenCount = document.querySelector(".lott-tokencount");
// const lotteryApprovedCount = document.querySelector(".lott-approved-count");
// const lotteryPlayerEntryCount = document.querySelector(".lott-player-entrycount");
// const lotteryTotalPlayerCount = document.querySelector(".lott-total-players");
// const lotteryTotalEntries = document.querySelector(".lott-total-entries");
// const lotteryProbabilityText = document.querySelector(".lott-probability");
// const lotteryWinPotText = document.querySelector(".lottery-winpot");
// const lotteryLoadingText = document.querySelector(".lottery-loading");


// const ticketCount = document.querySelector(".ticket-count");
// const incrementTicketCount = document.querySelector(".inc-ticket");
// const decrementTicketCount = document.querySelector(".dec-ticket");
// const approveLottery = document.querySelector(".approve-lottery");
// const approvedTokens = document.querySelector(".approved-tokens");
// const enterLottery = document.querySelector(".entr");

// //Contracts
// let LOTTERYCONTRACT = "0x55AF39042cc0E39bA527CfB2b4D56fF393130b55";
// let SCRSTOKENCONTRACT = "0xd37C7Ba263D0b9CF64CcF35eFe50e93741e900f9";

// const SCRSABI = TOKENABI;
// const LOTT_ABI = LOTTERY_ABI;
// let scrsTokenContractInstance;
// let lotteryContractInstance;

// //Player
// let player;
// let ticketCounter = 0;
// let scrsTokenCount = 0;
// let scrsApprovedCount = 0;
// let playerEntryCount = 0;
// let totalPlayerCount = 0;
// let lotteryProbability = 0;
// let lotteryWinPot = 0;

// incrementTicketCount.addEventListener("click", () => {
//     ticketCounter++;
//     ticketCount.innerHTML = "";
//     ticketCount.innerHTML = ticketCounter;
//     approvedTokens.innerHTML = `${ticketCounter > 9 ? (ticketCounter / 10).toLocaleString() + "M" : (ticketCounter * 100).toLocaleString() + "K"}`;
// });

// decrementTicketCount.addEventListener("click", () => {
//     if (ticketCounter === 0) return;
//     ticketCounter--;
//     ticketCount.innerHTML = "";
//     ticketCount.innerHTML = ticketCounter;
//     approvedTokens.innerHTML = `${ticketCounter > 9 ? (ticketCounter / 10).toLocaleString() + "M" : (ticketCounter * 100).toLocaleString() + "K"}`;
// });


// approveLottery.addEventListener("click", async () => {
//     if (ticketCounter === 0) return;
//     try {
//         const nftBalance = await scrsTokenContractInstance.methods.balanceOf(player);
//         if (Number(nftBalance) < 1) {
//             alert("Buy a Sicarius to participate!");
//             return;
//         }

//         const entryPrice = 100000 * ticketCounter;
//         const finalNum = entryPrice.toString() + "000000000000000000";

//         loadingScreen(`Approving: ${Number(finalNum / 1E18).toLocaleString()} $SCRS...`);
//         await scrsTokenContractInstance.methods.increaseAllowance(LOTTERYCONTRACT, finalNum).send({ from: player });
//         loadingScreen("Approval Successful. Updating UI.");
//         await updateUI();
//         endLoadingScreen();
//     } catch (err) {
//         console.error(err);
//         endLoadingScreen();
//     }
// });

// enterLottery.addEventListener("click", async () => {
//     if (ticketCounter === 0) return;
//     try {
//         const balance = Math.round(Number(scrsTokenCount));
//         if (balance < ticketCounter * 100000) return;
//         if (Number(scrsApprovedCount) / 1E18 < ticketCounter * 100000) return;

//         loadingScreen("Entering Lottery...");
//         await lotteryContractInstance.methods.enterLottery(player, ticketCounter).send({ from: player });
//         loadingScreen("Successful entry. Updating UI.");
//         await updateUI();
//         endLoadingScreen();
//         updateMarquee();
//     } catch (err) {
//         endLoadingScreen();
//         console.error(err);
//     }
// });

// const rotateSpinner = () => {
//     let index = 0;

//     const rotater = setInterval(() => {
//         if (index === 8) {
//             index = 0;
//         }
//         connectLotteryMetamask.innerHTML = spinElements[index];
//         index++;
//         if (connectError) {
//             clearInterval(rotater);
//         }
//     }, 100);
// };

// const spinElements = ["|", "/", "-", "\\", "|", "/", "-", "\\", "|"];


// let connectError = false;
// connectLotteryMetamask.addEventListener("click", async () => {
//     try {
//         connectError = false;
//         if (!window.ethereum) {
//             alert("Install Metamask to continue. Visit https://metamask.io");
//             return;
//         }
//         connectLotteryMetamask.disabled = true;
//         rotateSpinner();
//         //Setup Web3 & Player
//         window.web3 = new Web3(window.ethereum);
//         await window.ethereum.send("eth_requestAccounts");
//         const accounts = await web3.eth.getAccounts();
//         scrsTokenContractInstance = new web3.eth.Contract(SCRSABI, SCRSTOKENCONTRACT);
//         lotteryContractInstance = new web3.eth.Contract(LOTT_ABI, LOTTERYCONTRACT);

//         player = accounts[0];
//         playerWalletText.innerHTML = `Wallet:<br> ${player.slice(0, 8)}...`

//         //Lottery Win Pot
//         await getLotteryWinPot();

//         //Player SCRS Token Balance
//         await getPlayerSCRSBalance();

//         // Player SCRS Approved Balance
//         await getPlayerApprovedBalance();

//         //Total entries count
//         await getTotalEntrants();

//         //Player entry count
//         await getPlayerEntryCount();

//         //Total players count
//         await getTotalPlayer();

//         // //Player Probability
//         await getPlayerProbability();

//         //Pot in USD
//         await getPotInUSD();

//         //Entryprice in USD
//         await getEntryPriceInUSD();

//         //Update marquee text
//         updateMarquee();

//         connectLotteryMetamask.disabled = false;
//         metamaskBox.classList.add("hidden");
//         lotteryBox.classList.remove("hidden");

//         //Stops button spinner
//         connectError = true;

//         setInterval(async () => {
//             await updateUI();
//         }, 10000);

//     } catch (err) {
//         console.error(err);
//         connectError = true;
//         connectLotteryMetamask.disabled = false;
//         setTimeout(() => {
//             connectLotteryMetamask.innerHTML = "Connect Metamask";
//         }, 300);
//     }
// });

// const getLotteryWinPot = async () => {
//     lotteryWinPot = await lotteryContractInstance.methods.lotteryPot().call();
//     let convertedPot = Number(lotteryWinPot) / 1E18;
//     lotteryWinPotText.innerHTML = `Enter for a chance at:<br> ${Number(convertedPot).toLocaleString()} $SCRS`;
// };

// const getPlayerSCRSBalance = async () => {
//     let fetchBalance = await scrsTokenContractInstance.methods.balanceOf(player).call();
//     scrsTokenCount = Number(fetchBalance) / 1E18;
//     lotteryTokenCount.innerHTML = `$SCRS Balance: <br>${Number(scrsTokenCount).toLocaleString()}`;
// };

// const getPlayerApprovedBalance = async () => {
//     scrsApprovedCount = await scrsTokenContractInstance.methods.allowance(player, LOTTERYCONTRACT).call();
//     let scrsCount = Number(scrsApprovedCount);
//     lotteryApprovedCount.innerHTML = `$SCRS Approved: <br>${Number(scrsCount / 1E18).toLocaleString()}`;
// };

// const getTotalEntrants = async () => {
//     totalPlayerCount = await lotteryContractInstance.methods.getEntrantsCount().call();
//     lotteryTotalEntries.innerHTML = `Total Entries:<br>${totalPlayerCount}`;
// };

// const getTotalPlayer = async () => {
//     let players = [];
//     for (let i = 0; i < Number(totalPlayerCount); i++) {
//         let entrant = await lotteryContractInstance.methods.lotteryEntrant(i).call();
//         players.push(entrant);
//     }
//     let filteredPlayers = Array.from(new Set(players));
//     lotteryTotalPlayerCount.innerHTML = `Total Players:<br>${filteredPlayers.length}`;
// };

// const getPlayerEntryCount = async () => {
//     let entrants = [];
//     for (let i = 0; i < Number(totalPlayerCount); i++) {
//         let entrant = await lotteryContractInstance.methods.lotteryEntrant(i).call();
//         if (entrant === player) {
//             entrants.push(entrant);
//         }
//     }
//     playerEntryCount = entrants.length;
//     lotteryPlayerEntryCount.innerHTML = `Total Entries:<br>${entrants.length > 0 ? entrants.length : 0}`;
// };

// const getPlayerProbability = async () => {
//     let playerArr = [];
//     for (let i = 0; i < Number(totalPlayerCount); i++) {
//         let entrant = await lotteryContractInstance.methods.lotteryEntrant(i).call();
//         playerArr.push(entrant);
//     }

//     lotteryProbability = ((playerEntryCount / (Number(totalPlayerCount)) * 1000) / 10).toString().slice(0, 5);
//     lotteryProbabilityText.innerHTML = `Probability:<br> ${lotteryProbability > 0 ? lotteryProbability : 0}%`;
// };

// const updateMarquee = () => {
//     const marqueeBar = document.querySelector(".animated-bar");
//     marqueeBar.innerHTML = `<marquee class="marquee" behavior="scroll" direction="left">
//     <span class="purp">$$$ </span>Sicarius Lottery <span class="purp">$$$</span> Weekly Stake: <span
//     class="greeny">${(Number(lotteryWinPot) / 1E18).toLocaleString()}</span> SCRS<span class="purp"> $$$</span> Entry is only 100K <span
//     class="purp">$</span>SCRS<span class="purp"> $$$</span></marquee>`;
// };

// const getPotInUSD = async () => {

// };

// const getEntryPriceInUSD = async () => {

// };

// const updateUI = async () => {
//     await getLotteryWinPot();
//     await getPlayerSCRSBalance();
//     await getPlayerApprovedBalance();
//     await getTotalEntrants();
//     await getPlayerEntryCount();
//     await getTotalPlayer();
//     await getPlayerProbability();
//     await getPotInUSD();
//     await getEntryPriceInUSD();
// };


// const loadingScreen = (message) => {
//     lotteryLoadingText.classList.remove("hidden");
//     lotteryLoadingText.innerHTML = message;
// };

// const endLoadingScreen = () => {
//     lotteryLoadingText.classList.add("hidden");
// };