// import contractABI from "./abi.js";

const { min } = require("bn.js");
const keccak256 = require("keccak256");

const connectMetamask = document.querySelector(".connect-metamask");
const connectUserWallet = document.querySelector(".connected-wallet");
const modal1 = document.querySelector(".minter-inner-1");
const modal2 = document.querySelector(".minter-inner-2");
const bytes32Text = document.querySelector(".bytes32-text");

let account;
let contractInstance;
// const ABI = contractABI;
const CONTRACT = "0xac084F5db68ee0Ba80AeCA734DA9AFD128F864d7";

const connectToMetamask = async () => {
  //Check if metamask is installed
  if (!window.ethereum) {
    alert("Install Metamask to continue. Visit https://metamask.io");
    return;
  }

  if (window.ethereum) {
    //Request current user

    await window.ethereum.send("eth_requestAccounts");

    //Initialize web3 class
    window.web3 = new Web3(window.ethereum);

    //Get array of accounts
    const accounts = await web3.eth.getAccounts();

    //Select first account
    account = accounts[0];

    //Display user wallet
    modal1.classList.add("hidden");
    modal2.classList.remove("hidden");
    connectUserWallet.innerHTML = "Wallet ID: " + account.slice(0, 22) + `...`;
    bytes32Text.innerHTML =
      `Bytes32: ` + keccak256(account).toString("hex").slice(0, 23) + `...`;

    incrementStatusBar(11);
    updateStatusText(statussesArray2);

    //Instantiate contract instance
    // contractInstance = new web3.eth.Contract(ABI, CONTRACT);
  }
};
connectMetamask.addEventListener("click", connectToMetamask);

//Progress bar
let shadowFirstTimeOpened = false;
const shadowMinterDeskIcon = document.querySelector(".shadow-minter");
shadowMinterDeskIcon.addEventListener("dblclick", () => {
  if (!shadowFirstTimeOpened) {
    connectMetamask.disabled = true;
    connectMetamask.style.cursor = "default";
    shadowFirstTimeOpened = true;
    incrementStatusBar(11);
    updateStatusText(statussesArray1);
    setTimeout(() => {
      connectMetamask.disabled = false;
      connectMetamask.style.cursor = "pointer";
    }, 5000);
  }
});

const statusBar = document.querySelector(".status-bar");
const incrementStatusBar = (bars) => {
  let added = 0;
  const statusIncrementer = setInterval(() => {
    statusBar.innerHTML += `<div class="stat-block"></div>`;
    added++;
    if (added === bars) {
      clearInterval(statusIncrementer);
    }
  }, 500);
};

const statussesArray1 = [
  "Program: Parsing",
  "Program: Fetching",
  "Program: Encoding Parameters",
  "Program: Authenticating",
];
const statussesArray2 = [
  "Program: Initializing Web3",
  "Program: Hashing Bytes32",
  "Program: Asynchronous Configuration",
  "Program: Asynchronous Configuration",
  "Program: Prepairing Mint Client",
];

const programStatusText = document.querySelector(".status-text");
const updateStatusText = (arrays) => {
  let arrLen = arrays.length;
  let added = 0;
  const textUpdater = setInterval(() => {
    programStatusText.textContent = arrays[added];
    added++;
    if (added === arrLen) {
      clearInterval(textUpdater);
    }
  }, 1000);
};


// Get ETH price
let mintCount = 1;
let ethPrice = 0;
const ethMintPrice = 0.001; //ETH
let usdPricePerNft = 0;

const ethPriceFetcher = async () => {
    const fetcher = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`);
    const result = await fetcher.json();
    ethPrice = +result.ethereum.usd.toFixed(0);
    usdPricePerNft = ethPrice / 100;
    totalMintPrice.innerHTML = `Total: ${ethMintPrice * mintCount} ETH ( ${usdPricePerNft * mintCount}$USD )`;
    nftMintPrice.innerHTML = `Mint Price: ${ethMintPrice * mintCount} ETH ( ${usdPricePerNft * mintCount}$USD )`;
};
ethPriceFetcher();

// Mint config


const nftMintPrice = document.querySelector(".nft-mint-price");
const mintCountText = document.querySelector(".mint-counter");
const totalMintPrice = document.querySelector(".total-mint-price");
const incrementMintCount = document.querySelector(".plus");
const decrementMintCount = document.querySelector(".min");

incrementMintCount.addEventListener("click", () => {
  if (mintCount === 3) return;
  mintCount++;
  decrementMintCount.disabled = false;
  mintCountText.innerHTML = `Mint: ` + mintCount;
  if (mintCount === 3) {
    incrementMintCount.disabled = true;
  }
  totalMintPrice.innerHTML = `Total: ${ethMintPrice * mintCount} ETH ( ${(usdPricePerNft * mintCount).toFixed(2)}$USD )`;
});

decrementMintCount.addEventListener("click", () => {
  if (mintCount === 1) return;
  mintCount--;
  mintCountText.innerHTML = `Mint: ` + mintCount;
  if (mintCount === 1) {
    decrementMintCount.disabled = true;
  }
  if (mintCount < 3) {
    incrementMintCount.disabled = false;
  }
  totalMintPrice.innerHTML = `Total: ${ethMintPrice * mintCount} ETH ( ${(usdPricePerNft * mintCount).toFixed(2)}$USD )`;
});
