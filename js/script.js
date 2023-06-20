import { ABI } from "./abi.js";
const NFT_ABI = ABI;
const programsHover = document.querySelector(".d1");
const documentsHover = document.querySelector(".d2");
const mintInfoHover = document.querySelector(".d3");
const socialsHover = document.querySelector(".d4");

const programsDropMenu = document.querySelector(".drop-1");
const documentsDropMenu = document.querySelector(".drop-2");
const mintInfoMenu = document.querySelector(".drop-3");
const socialsMenu = document.querySelector(".drop-4");

const startButton = document.querySelector(".start-button");
const startMenuList = document.querySelector(".menu-list");
const mainProgram = document.querySelector(".main-program");

//Toggle menu list
startButton.addEventListener("click", () => {
  startMenuList.classList.toggle("hidden");
  startButton.classList.toggle("clicked");
});

//Open Team
const menuTeam = document.querySelector(".menu-team");
const closeTeam = document.querySelector(".clo-team");
const teamModal = document.querySelector(".team-modal");

closeTeam.addEventListener("click", () => {
  teamModal.classList.add("hidden");
});

menuTeam.addEventListener("click", () => {
  startMenuList.classList.toggle("hidden");
  teamModal.classList.remove("hidden");
  startButton.classList.toggle("clicked");
  documentsDropMenu.classList.add("hidden");
});

//Open Contract
const menuContract = document.querySelector(".menu-contract");
const closeContract = document.querySelector(".clo-contract");
const contractModal = document.querySelector(".contract-modal");

closeContract.addEventListener("click", () => {
  contractModal.classList.add("hidden");
});

menuContract.addEventListener("click", () => {
  startMenuList.classList.toggle("hidden");
  contractModal.classList.remove("hidden");
  startButton.classList.toggle("clicked");
  documentsDropMenu.classList.add("hidden");
});

//Open whitelist
const menuWhitelist = document.querySelector(".menu-whitelist");
const closeWhitelist = document.querySelector(".clo-whitelist");
const whitelistModal = document.querySelector(".whitelist-modal");

closeWhitelist.addEventListener("click", () => {
  whitelistModal.classList.add("hidden");
});

menuWhitelist.addEventListener("click", () => {
  startMenuList.classList.toggle("hidden");
  whitelistModal.classList.remove("hidden");
  startButton.classList.toggle("clicked");
  mintInfoMenu.classList.add("hidden");
});

//Open faq
const menuFAQ = document.querySelector(".menu-faq");
const closeFAQ = document.querySelector(".clo-faq");
const faqModal = document.querySelector(".faq-modal");

closeFAQ.addEventListener("click", () => {
  faqModal.classList.add("hidden");
});

menuFAQ.addEventListener("click", () => {
  startMenuList.classList.toggle("hidden");
  faqModal.classList.remove("hidden");
  startButton.classList.toggle("clicked");
  mintInfoMenu.classList.add("hidden");
});

//Open gallery
const menuGallery = document.querySelector(".menu-gallery");
const closeGallery = document.querySelector(".clo-gallery");
const galleryModal = document.querySelector(".gallery-modal");

closeGallery.addEventListener("click", () => {
  galleryModal.classList.add("hidden");
});

menuGallery.addEventListener("click", () => {
  startMenuList.classList.toggle("hidden");
  galleryModal.classList.remove("hidden");
  startButton.classList.toggle("clicked");
  programsDropMenu.classList.add("hidden");
});

//Open rarity chart
const menuRarity = document.querySelector(".menu-rarity");
const closeRarity = document.querySelector(".clo-rarity");
const rarityModal = document.querySelector(".rarity-modal");

closeRarity.addEventListener("click", () => {
  rarityModal.classList.add("hidden");
});

menuRarity.addEventListener("click", () => {
  startMenuList.classList.toggle("hidden");
  rarityModal.classList.remove("hidden");
  startButton.classList.toggle("clicked");
  programsDropMenu.classList.add("hidden");
});

mainProgram.addEventListener("click", (e) => {
  const t = e.target.classList[0];
  if (t === "start-button") return;
  if (t === "start-img") return;
  if (
    t !== "nav-item-title" ||
    t !== "nav-item" ||
    t !== "u" ||
    t !== "nav-icon" ||
    t !== "fa-play" ||
    t !== "start-img" ||
    t !== "start-button"
  ) {
    startMenuList.classList.add("hidden");
    startButton.classList.remove("clicked");
    programsDropMenu.classList.add("hidden");
    documentsDropMenu.classList.add("hidden");
    mintInfoMenu.classList.add("hidden");
    socialsMenu.classList.add("hidden");
  }
});

const stakerModals = document.querySelector(".staker-modal");
const stakerIconDesk = document.querySelector(".desk-staker");
const closeStaker = document.querySelector(".clo-staker");

const lotteryModals = document.querySelector(".lottery-modal");
const lotteryIconDesk = document.querySelector(".lottery-icon");
const closeLottery = document.querySelector(".clo-lottery");

const trashCanModals = document.querySelector(".recycle-modal");
const trashIconDesk = document.querySelector(".trash-icon");
const closeTrashCan = document.querySelector(".clo-trash");

const shadowMinterModal = document.querySelector(".shadow-minter-modal");
const shadowMinterDesk = document.querySelector(".shadow-minter");
const closeShadowMinter = document.querySelector(".clo-shadow");

const terminalModals = document.querySelector(".terminal-modal");
const terminalDesk = document.querySelector(".desk-terminal");
const closeTerminal = document.querySelector(".clo-terminal");

const crierModals = document.querySelector(".crier-modal");
const crierDesk = document.querySelector(".desk-crier");
const closeCrier = document.querySelector(".clo-crier");

const openSeaIconDesk = document.querySelector(".desk-opensea");

const startmenuRun = document.querySelector(".run");


let stakerActive = false;
const stakeBar = document.querySelector(".act-staker");
// Open staker modal
stakerIconDesk.addEventListener("dblclick", async () => {
  if (!stakerActive) {
    stakerModals.classList.remove("hidden");
    stakeBar.classList.remove("hidden");
    stakerActive = true;
  }

  //////
  const stakersToGo = document.querySelector(".staker-unlocks");
  let nftContractInstance;
  const NFTCONTRACT = "0xaD2bf4b604054C60a1aD7574C0B731967D12000C";
  window.web3 = new Web3(window.ethereum);
  nftContractInstance = new web3.eth.Contract(NFT_ABI, NFTCONTRACT);
  const currentSup = await nftContractInstance.methods
    .CURRENT_SUPPLY()
    .call();
  const currentSupply = parseInt(currentSup);
  stakersToGo.innerHTML = '';
  stakersToGo.innerHTML = `Unlocks after ${1111 - currentSupply} more mints...`;


});

// Close staker modal
closeStaker.addEventListener("click", () => {
  stakerModals.classList.add("hidden");
  stakerModals.classList.remove("enlarged");
  stakeBar.classList.add("hidden");
  stakerActive = false;
});


//Lottery 
let lotteryActive = false;
const lotteryBar = document.querySelector(".act-lottery");
// Open recycle bin modal
lotteryIconDesk.addEventListener("dblclick", async () => {
  if (!lotteryActive) {
    lotteryModals.classList.remove("hidden");
    lotteryBar.classList.remove("hidden");
    lotteryActive = true;
  }


  ///
  const NFTCONTRACT = "0xaD2bf4b604054C60a1aD7574C0B731967D12000C";
  const lotteryUnlocks = document.querySelector(".lottery-unlocks");
  window.web3 = new Web3(window.ethereum);
  let nftContractInstance = new web3.eth.Contract(ABI, NFTCONTRACT);
  const currentSup = await nftContractInstance.methods
    .CURRENT_SUPPLY()
    .call();
  const currentSupply = parseInt(currentSup);
  lotteryUnlocks.innerHTML = '';
  lotteryUnlocks.innerHTML = `Unlocks after ${1111 - currentSupply} more mints...`;
});

// Close lottery modal
closeLottery.addEventListener("click", () => {
  lotteryModals.classList.add("hidden");
  lotteryModals.classList.remove("enlarged");
  lotteryBar.classList.add("hidden");
  lotteryActive = false;
});


let binActive = false;
const trashBar = document.querySelector(".act-bin");
// Open recycle bin modal
trashIconDesk.addEventListener("dblclick", () => {
  if (!binActive) {
    trashCanModals.classList.remove("hidden");
    trashBar.classList.remove("hidden");
    binActive = true;
  }
});

// Close recycle bin modal
closeTrashCan.addEventListener("click", () => {
  trashCanModals.classList.add("hidden");
  trashCanModals.classList.remove("enlarged");
  trashBar.classList.add("hidden");
  binActive = false;
});

////
let shadowActive = false;
const shadowBar = document.querySelector(".act-shadow");
// Open shadow minter modal
shadowMinterDesk.addEventListener("dblclick", () => {
  if (!shadowActive) {
    shadowMinterModal.classList.remove("hidden");
    shadowBar.classList.remove("hidden");
  }
});

// Close shadow minter
closeShadowMinter.addEventListener("click", () => {
  shadowMinterModal.classList.add("hidden");
  shadowMinterModal.classList.remove("enlarged");
  shadowBar.classList.add("hidden");
  shadowActive = false;
});

////

const gameIntro = document.querySelector(".game-intro");
const soundTrack = document.querySelector(".soundtrack");
const crierBar = document.querySelector(".act-crier");
const app = document.querySelector(".app");

let crierActive = false;
// Open crier modal
crierDesk.addEventListener("dblclick", () => {
  gameIntro.classList.add("fadeOut")
  if (!crierActive) {
    mainProgram.classList.add("blurry");
    crierModals.classList.remove("hidden");
    crierBar.classList.remove("hidden");
    soundTrack.play();
    soundTrack.muted = !soundTrack.muted;
    app.style.backgroundImage = "url('./PVP/SicariusDark.png')"
  }
  setTimeout(() => {
    gameIntro.classList.add("hidden");
  }, 5000)
});

// Close crier modal
closeCrier.addEventListener("click", () => {
  crierModals.classList.add("hidden");
  mainProgram.classList.remove("blurry");
  crierModals.classList.remove("enlarged");
  crierBar.classList.add("hidden");
  crierActive = false;
  app.style.backgroundImage = "url('./PVP/Sicarius.png')"
  soundTrack.muted = !soundTrack.muted;
  gameIntro.classList.remove("hidden");
});


// Open OpenSea
openSeaIconDesk.addEventListener("dblclick", () => {
  window.open('https://opensea.io/collection/scrs', '_blank');
});


////

let terminalActive = false;
const terminalInputField = document.querySelector(".terminal-input");
const terminalBar = document.querySelector(".act-terminal");
// Open terminal modal
terminalDesk.addEventListener("dblclick", () => {
  if (!terminalActive) {
    terminalModals.classList.remove("hidden");
    terminalBar.classList.remove("hidden");
    terminalInputField.focus();
    terminalActive = true;
  }
});

startmenuRun.addEventListener("click", () => {
  startMenuList.classList.add("hidden");
  startButton.classList.remove("clicked");
  if (!terminalActive) {
    terminalModals.classList.remove("hidden");
    terminalActive = true;
  }
});

closeTerminal.addEventListener("click", () => {
  terminalModals.classList.add("hidden");
  terminalModals.classList.remove("enlarged");
  terminalBar.classList.add("hidden");
  terminalActive = false;
});

// Hover to display programs

// #1
programsDropMenu.addEventListener("mouseover", () => {
  programsDropMenu.classList.remove("hidden");
});
programsHover.addEventListener("mouseover", () => {
  programsDropMenu.classList.remove("hidden");
  documentsDropMenu.classList.add("hidden");
  mintInfoMenu.classList.add("hidden");
  socialsMenu.classList.add("hidden");
});

programsHover.addEventListener("mouseleave", () => {
  programsDropMenu.classList.add("hidden");
});

// #2

documentsDropMenu.addEventListener("mouseover", () => {
  documentsDropMenu.classList.remove("hidden");
});

documentsHover.addEventListener("mouseover", () => {
  documentsDropMenu.classList.remove("hidden");
  programsDropMenu.classList.add("hidden");
  mintInfoMenu.classList.add("hidden");
  socialsMenu.classList.add("hidden");
});

documentsHover.addEventListener("mouseleave", () => {
  documentsDropMenu.classList.add("hidden");
});

// #3

mintInfoMenu.addEventListener("mouseover", () => {
  mintInfoMenu.classList.remove("hidden");
});

mintInfoHover.addEventListener("mouseover", () => {
  mintInfoMenu.classList.remove("hidden");
  programsDropMenu.classList.add("hidden");
  documentsDropMenu.classList.add("hidden");
  socialsMenu.classList.add("hidden");
});

mintInfoHover.addEventListener("mouseleave", () => {
  mintInfoMenu.classList.add("hidden");
});

// #4

socialsMenu.addEventListener("mouseover", () => {
  socialsMenu.classList.remove("hidden");
});

socialsHover.addEventListener("mouseover", () => {
  socialsMenu.classList.remove("hidden");
  mintInfoMenu.classList.add("hidden");
  documentsDropMenu.classList.add("hidden");
  programsDropMenu.classList.add("hidden");
});

socialsHover.addEventListener("mouseleave", () => {
  socialsMenu.classList.add("hidden");
});

const shutdownButton = document.querySelector(".shtdwn");
const shutdownFallback = document.querySelector(".fallback2");
const startBar = document.querySelector(".start-bar");

shutdownButton.addEventListener("click", () => {
  socialsMenu.classList.add("hidden");
  mintInfoMenu.classList.add("hidden");
  documentsDropMenu.classList.add("hidden");
  programsDropMenu.classList.add("hidden");
  startMenuList.classList.add("hidden");
  startMenuList.classList.add("hidden");
  startButton.classList.remove("clicked");

  setTimeout(() => {
    trashIconDesk.classList.add("hidden");
    shadowMinterDesk.classList.add("hidden");
    terminalDesk.classList.add("hidden");
  }, 1000);
  setTimeout(() => {
    startBar.classList.add("hidden");
  }, 2000);

  setTimeout(() => {
    shutdownFallback.style.display = "flex";
  }, 4500);
});
