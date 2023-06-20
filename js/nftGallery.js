import { ABI } from "./abi.js";
const NFTCONTRACT = "0xaD2bf4b604054C60a1aD7574C0B731967D12000C";

let nftContractInstance;
let userTokenIDs = [];
let userWalletIDs = [];

async function getTokenIDs() {

    try {
        window.web3 = new Web3(window.ethereum);
        nftContractInstance = new web3.eth.Contract(ABI, NFTCONTRACT);

        const currentSup = await nftContractInstance.methods
            .CURRENT_SUPPLY()
            .call();
        const currentSupply = parseInt(currentSup);

        for (let i = 1; i < currentSupply + 1; i++) {
            userTokenIDs.push(i);
        }

        // for (let i = 1; i < currentSupply + 1; i++) {
        //     let userWallet = await nftContractInstance.methods.ownerOf(i).call();
        //     console.log(userWallet)
        //     userWalletIDs.push(userWallet);
        // }

    } catch (err) {
        console.error(err);
    }
}

const renderImages = async () => {
    await getTokenIDs();
    const nftGallery = document.querySelector(".nftgallery-inner");

    nftGallery.innerHTML = '';
    userTokenIDs.map((token) => {
        const div = document.createElement('div');
        div.classList.add('gallery-nft');
        div.setAttribute('data-nft', token);

        const img = document.createElement('img');
        img.src = `https://ipfs.io/ipfs/bafybeiakbvi37hhzvmrokwuy5kcdr6n36eerrtteeodj2xc74ymku7tgli/${token}.png`;
        img.alt = 'NFT';
        img.classList.add('nft-mini');

        const span = document.createElement('span');
        span.classList.add('nft-id');
        span.textContent = `#${token}`;

        div.appendChild(img);
        div.appendChild(span);

        // Add event listener to the div element
        div.addEventListener('click', () => {
            // Perform the desired action or handle the event here
            console.log(`Clicked NFT: ${token}`);
        });

        nftGallery.appendChild(div);
    });
};




const galleryNFTItem = document.querySelector(".gallery-nft");

// galleryNFTItem.addEventListener("click", () => {
//     alert('hi')
// });


renderImages();