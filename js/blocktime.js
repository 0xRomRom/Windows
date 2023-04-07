// Setup: npm install @alch/alchemy-sdk
const { Network, Alchemy } = require("alchemy-sdk");

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const API_KEY = process.env.ALCHEMY_KEY;
const settings = {
  apiKey: API_KEY, // Replace with your Alchemy API Key.
  network: Network.ETH_MAINNET, // Replace with your network.
};

const alchemy = new Alchemy(settings);

const blockTimestampText = document.querySelector('.block-timestamp');

async function fetchTimeStamp () {
  const latestBlock = await alchemy.core.getBlockNumber();
  blockTimestampText.innerHTML = `Block Timestamp: ` + latestBlock + ` (since Vitalik)`;
}
fetchTimeStamp();