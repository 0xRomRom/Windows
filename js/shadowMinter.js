// import contractABI from "./abi.js";

const keccak256 = require("keccak256");

const connectMetamask = document.querySelector(".connect-metamask");
const connectUserWallet = document.querySelector(".connected-wallet");
const modal1 = document.querySelector(".minter-inner-1");
const modal2 = document.querySelector(".minter-inner-2");
const modal3 = document.querySelector(".minter-inner-3");
const bytes32Text = document.querySelector(".bytes32-text");

let account;
let contractInstance;
const ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "flipSaleState",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_baseUri",
        type: "string",
      },
    ],
    name: "setBaseUri",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawAll",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseExtension",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseUri",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "CURRENT_SUPPLY",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isSaleActive",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MINT_PRICE",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TOTAL_SUPPLY",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "userMintedCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
const CONTRACT = "0x84C6fA9Dafd19E7b7860690df2f1f7426270c78D";

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

    incrementStatusBar(11);
    updateStatusText(statussesArray2);
    setTimeout(() => {
      mintButton.disabled = false;
    }, 5500);
    // Instantiate contract instance
    contractInstance = new web3.eth.Contract(ABI, CONTRACT);
    console.log(contractInstance);

    let value;
    value = await contractInstance.methods.userMintedCount(account).call();
    console.log(value);
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
const ethMintPrice = 0.022; //ETH
let usdPricePerNft = 0;

const ethPriceFetcher = async () => {
  const fetcher = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`
  );
  const result = await fetcher.json();
  ethPrice = +result.ethereum.usd.toFixed(0);
  usdPricePerNft = ethPrice / 45.5; // <=
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
const mintButton = document.querySelector(".mint-button");
const terminalMenuBar = document.querySelector(".act-terminal");
const terminalModall = document.querySelector(".terminal-modal");

const shadowBars = document.querySelector(".act-shadow");
const shadowMinterModals = document.querySelector(".shadow-minter-modal");
const terminalOutputs = document.querySelector(".terminal-output");
const terminalInputs = document.querySelector(".terminal-input");
const redirectSocialsBox = document.querySelector(".redirect-socials");

mintButton.addEventListener("click", async () => {
  let currentlyMinted;
  currentlyMinted = await contractInstance.methods.CURRENT_SUPPLY().call();
  if (+currentlyMinted === 2222) {
    alert("Mint concluded. Visit OpenSea to purchase a Sicarius!");
  }

  try {
    await contractInstance.methods.mint(mintCount).send({
      from: account,
      value: (1000000000000000 * mintCount).toString(),
      gas: 300000,
    });
  } catch (err) {
    console.log(err);
  }

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
      "= Congratulations on becoming one of the =" +
      `<br>` +
      "= early few holders of Sicarius. =" +
      `<br>` +
      `= This journey just got started so buckle up =` +
      `<br>` +
      "= and get ready to join the community! =";
    terminalOutputs.insertAdjacentElement("beforeend", output);
  }, 8500);

  setTimeout(() => {
    redirectSocialsBox.classList.remove("hidden");
  }, 14000);

  setTimeout(() => {
    redirectSocialsBox.classList.add("hidden");
    window.location.href =
      "https://twitter.com/intent/tweet?text=I+just+minted+Sicarius+%23311+LFG!+%40Sicarius";
  }, 20000);
});
