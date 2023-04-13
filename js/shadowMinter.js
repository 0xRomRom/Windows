import ABI from "./abi.js";

import keccak256 from "keccak256";

const mintButton = document.querySelector(".mint-button");
const connectMetamask = document.querySelector(".connect-metamask");
const connectUserWallet = document.querySelector(".connected-wallet");
const modal1 = document.querySelector(".minter-inner-1");
const modal2 = document.querySelector(".minter-inner-2");
const modal3 = document.querySelector(".minter-inner-3");
const bytes32Text = document.querySelector(".bytes32-text");
const currentlyMintedCount = document.querySelector(".currently-minted");

const CONTRACT = "0xfa881a246e7D23fb6049922A2284F4aD22A37869";

let account;
let contractInstance;
let currMintCount;
window.onload = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    contractInstance = new web3.eth.Contract(ABI, CONTRACT);

    const currentlyMinted = await contractInstance.methods
      .CURRENT_SUPPLY()
      .call();

    currentlyMintedCount.innerHTML = `[${currentlyMinted}/2222]`;
  }
};

const updateCircSupply = async () => {
  setInterval(async () => {
    const currentlyMinted = await contractInstance.methods
      .CURRENT_SUPPLY()
      .call();
    currMintCount = currentlyMinted;
    currentlyMintedCount.innerHTML = `[${currentlyMinted}/2222]`;
  }, 2000);
};

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
    connectUserWallet.innerHTML = "Wallet ID: " + account.slice(0, 25) + `...`;
    bytes32Text.innerHTML =
      `Bytes32: ` + keccak256(account).toString("hex").slice(0, 26) + `...`;

    //Handle UI updates
    incrementStatusBar(11);
    updateStatusText(statussesArray2);
    mintButton.disabled = true;
    mintButton.classList.remove("win-stl");

    //Disable mint UI when user has already minted
    let value;
    value = await contractInstance.methods.userMintedCount(account).call();
    console.log(value);

    if (+value === 2) {
      incrementMintCount.disabled = true;
      mintButton.disabled = true;
      mintButton.classList.remove("win-stl");
    }

    setTimeout(() => {
      if (+value === 0) {
        mintButton.disabled = false;
        mintButton.classList.add("win-stl");
      }

      if (+value === 1) {
        mintButton.disabled = false;
        mintButton.classList.add("win-stl");
      }
      if (+value === 2) {
        incrementMintCount.disabled = true;
        mintButton.disabled = true;
        mintButton.classList.remove("win-stl");
      }
      //###
      // mintButton.disabled = true;
      // mintButton.classList.remove("win-stl");
    }, 6000);

    //Call current circ supply interval fetcher
    updateCircSupply();
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
const statussesArray3 = [
  "Program: Launching terminal",
  "Program: Launching terminal.",
  "Program: Launching terminal..",
  "Program: Launching terminal...",
  "Program: Launching terminal....",
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
const ethMintPrice = 0.01337; //ETH
const ethMintWeiPrice = +(BigInt("13370000000000000")).toString().slice(0);
let usdPricePerNft = 0;

const ethPriceFetcher = async () => {
  const fetcher = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`
  );
  const result = await fetcher.json();
  ethPrice = +result.ethereum.usd.toFixed(0);
  usdPricePerNft = ethPrice / 74.8; // <=
  totalMintPrice.innerHTML = `Total: ${ethMintPrice * mintCount} ETH ( ${(
    usdPricePerNft * mintCount
  ).toFixed(2)}$ USD )`;
  nftMintPrice.innerHTML = `Mint Price: ${ethMintPrice * mintCount} ETH ( ${(
    usdPricePerNft * mintCount
  ).toFixed(2)}$ USD )`;
};
ethPriceFetcher();

// Mint config
const nftMintPrice = document.querySelector(".nft-mint-price");
const mintCountText = document.querySelector(".mint-counter");
const totalMintPrice = document.querySelector(".total-mint-price");
const incrementMintCount = document.querySelector(".plus");
const decrementMintCount = document.querySelector(".min");

incrementMintCount.addEventListener("click", () => {
  if (mintCount === 2) return;
  mintCount++;
  decrementMintCount.disabled = false;
  mintCountText.innerHTML = `Mint: ` + mintCount;
  if (mintCount === 2) {
    incrementMintCount.disabled = true;
  }
  totalMintPrice.innerHTML = `Total: ${ethMintPrice * mintCount} ETH ( ${(
    usdPricePerNft * mintCount
  ).toFixed(2)}$ USD )`;
});

decrementMintCount.addEventListener("click", () => {
  if (mintCount === 1) return;
  mintCount--;
  mintCountText.innerHTML = `Mint: ` + mintCount;
  if (mintCount === 1) {
    decrementMintCount.disabled = true;
  }
  if (mintCount < 2) {
    incrementMintCount.disabled = false;
  }
  totalMintPrice.innerHTML = `Total: ${ethMintPrice * mintCount} ETH ( ${(
    usdPricePerNft * mintCount
  ).toFixed(2)}$ USD )`;
});

// Mint

const terminalMenuBar = document.querySelector(".act-terminal");
const terminalModall = document.querySelector(".terminal-modal");

const shadowBars = document.querySelector(".act-shadow");
const shadowMinterModals = document.querySelector(".shadow-minter-modal");
const terminalOutputs = document.querySelector(".terminal-output");
const terminalInputs = document.querySelector(".terminal-input");
const redirectSocialsBox = document.querySelector(".redirect-socials");
const statusText2 = document.querySelector(".status-text2");

let error = false;


const rotateSpinner = () => {
  let index = 0;

  const rotater = setInterval(() => {
    if (index === 8) {
      index = 0;
    }
    statusText2.innerHTML = `Program: Minting ${spinElements[index]}`;
    index++;
    if (error) {
      clearInterval(rotater);
      statusText2.innerHTML = `Program: Failed To Mint`;
    }
  }, 100);
};

const spinElements = ["|", "/", "-", "\\", "|", "/", "-", "\\", "|"];

mintButton.addEventListener("click", async () => {
  error = false;
  programStatusText.classList.add("hidden");
  statusText2.classList.remove("hidden");

  if (currMintCount === 2222) {
    alert("Mint concluded. Visit OpenSea to purchase a Sicarius!");
    return;
  }
  rotateSpinner();

  try {
    await contractInstance.methods.mint(mintCount).send({
      from: account,
      value: (ethMintWeiPrice * mintCount).toString(),
      gas: 300000,
    });
  } catch (err) {
    error = true;
  }

  if (error) {
    return;
  }

  error = false;
  programStatusText.classList.remove("hidden");
  programStatusText.innerHTML = "Program: Launching Terminal";
  statusText2.classList.add("hidden");

  modal2.classList.add("hidden");
  modal3.classList.remove("hidden");

  incrementStatusBar(11);
  updateStatusText(statussesArray3);

  setTimeout(() => {
    shadowMinterModals.classList.add("hidden");
    shadowBars.classList.add("hidden");
    shadowMinterModals.classList.remove("enlarged");
  }, 6000);

  setTimeout(() => {
    terminalMenuBar.classList.remove("hidden");
    terminalModall.classList.remove("hidden");
    terminalInputs.focus();
  }, 7500);

  setTimeout(() => {
    const output = document.createElement("div");
    output.style.color = "green";
    output.innerHTML =
      "==========================================" +
      "<br>" +
      "Congratulations on becoming one of the" +
      "<br>" +
      "early few holders of Sicarius." +
      "<br>" +
      "This journey just got started so buckle up" +
      "<br>" +
      "and get ready to join the community!" +
      "<br>" +
      "==========================================";
    terminalOutputs.insertAdjacentElement("beforeend", output);
  }, 8500);

  setTimeout(() => {
    redirectSocialsBox.classList.remove("hidden");
  }, 14000);

  let currentlyMinted = await contractInstance.methods.CURRENT_SUPPLY().call();

  let queryString = "";

  if (mintCount === 1) {
    queryString = `https://twitter.com/intent/tweet?text=I%20just%20minted%20Sicarius%20%23${+currentlyMinted}%20LFG!%20%40Sicarius`;
  }
  if (mintCount === 2) {
    queryString = `https://twitter.com/intent/tweet?text=I%20just%20minted%20Sicarius%20%23${
      +currentlyMinted - 1
    }%20%26%20%23${+currentlyMinted}%20LFG!%20%40Sicarius`;
  }

  setTimeout(() => {
    redirectSocialsBox.classList.add("hidden");
    window.location.href = queryString;
  }, 20000);
});
