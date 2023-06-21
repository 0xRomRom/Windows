import { ABI } from "./abi.js";
const NFTCONTRACT = "0xaD2bf4b604054C60a1aD7574C0B731967D12000C";
const closeGalleryButton = document.querySelector(".clo-gallery");
const nftGalleryModal = document.querySelector(".nftgallery-modal");
const nftGallery = document.querySelector(".nftgallery-inner");
const nftOwnerInner = document.querySelector(".nftowner-inner");
const closeOwnerModal = document.querySelector(".clo-innernft");

let nftContractInstance;
let userTokenIDs = [];
let currentlyMinted = 0;

async function getTokenIDs() {
    try {
        window.web3 = new Web3(window.ethereum);
        nftContractInstance = new web3.eth.Contract(ABI, NFTCONTRACT);

        const currentSup = await nftContractInstance.methods
            .CURRENT_SUPPLY()
            .call();
        const currentSupply = parseInt(currentSup);
        currentlyMinted = currentSupply;

        for (let i = 1; i < currentSupply + 1; i++) {
            userTokenIDs.push(i);
        }

    } catch (err) {
        console.error(err);
    }
}

const renderImages = async () => {
    await getTokenIDs();

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

        div.addEventListener('click', () => {
            renderOwnedNFT(Number(token));

        });

        nftGallery.appendChild(div);
    });
};
renderImages();



const renderOwnedNFT = async (id) => {
    const nftImage = document.querySelector(".owner-nft-img");
    nftImage.src = `https://ipfs.io/ipfs/bafybeiakbvi37hhzvmrokwuy5kcdr6n36eerrtteeodj2xc74ymku7tgli/${id}.png`;

    const nftId = document.querySelector(".owner-nft-id");
    nftId.innerHTML = `#${id}`;

    const nftWallet = document.querySelector(".owner-nft-wallet");
    const owner = await nftContractInstance.methods.ownerOf(id).call();
    nftWallet.innerHTML = `Owner: <a href="https://opensea.io/assets/ethereum/0xad2bf4b604054c60a1ad7574c0b731967d12000c/${id}" target="_blank">${owner.slice(0, 13)}</a>`;

    nftOwnerInner.classList.remove("hidden");
};

closeOwnerModal.addEventListener("click", () => {
    nftOwnerInner.classList.add("hidden");
});



//Close gallery
closeGalleryButton.addEventListener("click", () => {
    nftGalleryModal.classList.add("hidden");
});