const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");
const round1 = require("../Wallets");

// const CURRENT_ROOT =
//   "0xac54501931b008d53e0ab4839bc9f0907162c200fddd7e64a1c278e50eff5dd0";
const CURRENT_ROOT =
  "0xa9c7488eb9bd44ec12aed26ff97e62ddebad99a7f17d7809feb348a81650db83";

let currentRootHash;
let currentLeafNodes;

const walletInput = document.querySelector(".validate-wallet");
const hashWalletButton = document.querySelector(".hash-wallet-button");

const walletIsIn = document.querySelector(".wallet-in");
const walletIsOut = document.querySelector(".wallet-out");

hashWalletButton.addEventListener("click", () => {
  //Get current roothash

      // if(walletInput.value.length === 0) {
      //     alert("No wallet found");
      //     return;
      // }

    //   let regex = /[\s,\[\]"]+/g;

    //   let userInput = round1;
    // let filteredArray = userInput.map((str) => str.replace(regex, ""));
    // let finalArray = filteredArray.filter((item) => item.length > 0);

    // const leafNodes = finalArray.map((addr) => keccak256(addr));
    // currentLeafNodes = leafNodes;
    // const tree = new MerkleTree(leafNodes, keccak256, { sort: true });
    // const rootHash = tree.getHexRoot();
    // currentRootHash = rootHash;
    // alert(rootHash)

  // Validate Wallet

  let userInput = walletInput.value;
  let keccakInput = keccak256(userInput);

  const leafNodes = round1.map((addr) => keccak256(addr));
  currentLeafNodes = leafNodes;

  const tree = new MerkleTree(currentLeafNodes, keccak256, { sort: true });
  const proof = tree.getHexProof(keccakInput);

  let outcome = tree.verify(proof, keccakInput, CURRENT_ROOT);

  if (outcome) {
    walletIsIn.classList.remove("hidden");

    setTimeout(() => {
      walletIsIn.classList.add("hidden");
      walletInput.value = "";
    }, 6000);
    return;
  }
  if (!outcome) {
    walletIsOut.classList.remove("hidden");
    setTimeout(() => {
      walletIsOut.classList.add("hidden");
      walletInput.value = "";
    }, 6000);
  }
});
