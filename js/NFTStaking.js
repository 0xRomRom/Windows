import {ABI} from "./abi.js";


let nftContractInstance;

async function getTokenIDs(wallet) {
    const CONTRACT = "0xaD2bf4b604054C60a1aD7574C0B731967D12000C";
    let ownerIndexes = [];
  try {
    const web3 = new Web3(
      "https://eth-sepolia.g.alchemy.com/v2/Jk8zckMhO9UxxVBktHc288V6s6UCweAo"
    );

    nftContractInstance = new web3.eth.Contract(NFT_ABI, CONTRACT);

    const currentSupply = await nftContractInstance.methods
      .CURRENT_SUPPLY()
      .call();

    for (let i = 1; i < currentSupply + 1; i++) {
      let res = await nftContractInstance.methods.ownerOf(i.toString()).call();

      if (res.toString() === wallet) {
        ownerIndexes.push(i);
      }
    }
    return ownerIndexes;
  } catch (err) {
    console.error(err);
  }
}

