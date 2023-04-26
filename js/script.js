require("dotenv").config();

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

const trashCanModals = document.querySelector(".recycle-modal");
const trashIconDesk = document.querySelector(".trash-icon");
const closeTrashCan = document.querySelector(".clo-trash");

const shadowMinterModal = document.querySelector(".shadow-minter-modal");
const shadowMinterDesk = document.querySelector(".shadow-minter");
const closeShadowMinter = document.querySelector(".clo-shadow");

const terminalModals = document.querySelector(".terminal-modal");
const terminalDesk = document.querySelector(".desk-terminal");
const closeTerminal = document.querySelector(".clo-terminal");
const startmenuRun = document.querySelector(".run");

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

const shadowBar = document.querySelector(".act-shadow");
// Open shadow minter modal
shadowMinterDesk.addEventListener("dblclick", () => {
  shadowMinterModal.classList.remove("hidden");
  shadowBar.classList.remove("hidden");
});

closeShadowMinter.addEventListener("click", () => {
  shadowMinterModal.classList.add("hidden");
  shadowMinterModal.classList.remove("enlarged");
  shadowBar.classList.add("hidden");
  shadowActive = false;
});

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
