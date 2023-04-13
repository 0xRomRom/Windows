// Setup: npm install @alch/alchemy-sdk
const { Network, Alchemy } = require("alchemy-sdk");

const API_KEY = process.env.ALCHEMY_KEY;
const settings = {
  apiKey: API_KEY, // 
  network: Network.ETH_MAINNET,  
};

const alchemy = new Alchemy(settings);

const blockTimestampText = document.querySelector('.block-timestamp');

async function fetchTimeStamp () {
  const latestBlock = await alchemy.core.getBlockNumber();
  blockTimestampText.innerHTML = `Block Timestamp: ` + latestBlock + ` (since Vitalik)`;
}
fetchTimeStamp();