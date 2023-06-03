
// Get user NFT owner IDs


// const Web3 = require("web3");
// const { ABI } = require("./abi");

// const CONTRACT = "0x8B9749E8c1134104ecda7af93Ed7290D321B185D";
// const USER_ADDY = "0xcCbde33b68dd30A2596718981F39771D27e57626";

// let contractInstance;
// let ownerIndexes = [];

// async function run() {
//   try {
//     const web3 = new Web3(
//       "https://eth-sepolia.g.alchemy.com/v2/Jk8zckMhO9UxxVBktHc288V6s6UCweAo"
//     );

//     contractInstance = new web3.eth.Contract(ABI, CONTRACT);

//     const currentSupply = await contractInstance.methods
//       .CURRENT_SUPPLY()
//       .call();

//     for (let i = 1; i < currentSupply + 1; i++) {
//       let res = await contractInstance.methods.ownerOf(i.toString()).call();

//       if (res.toString() === USER_ADDY) {
//         ownerIndexes.push(i);
//       }
//     }
//   } catch (err) {
//     // console.error(err);
//   }
// }
// run().then(() => {
//   console.log(`Owner Indexes: ${ownerIndexes}`);
// });
