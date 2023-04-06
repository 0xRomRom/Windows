// Setup: npm install @alch/alchemy-sdk
const { Network, Alchemy } = require("alchemy-sdk");


// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: "izsCSpke5Nv4g2Z0NLBVTK7owlLRbyrb", // Replace with your Alchemy API Key.
  network: Network.ETH_MAINNET, // Replace with your network.
};

const alchemy = new Alchemy(settings);

const blockTimestampText = document.querySelector('.block-timestamp');


async function fetchTimeStamp () {
  const latestBlock = await alchemy.core.getBlockNumber();
  console.log("The latest block number is", latestBlock);
  blockTimestampText.innerHTML = `Block Timestamp:` + latestBlock;
}

fetchTimeStamp();