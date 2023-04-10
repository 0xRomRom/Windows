require("dotenv").config();

const startButton = document.querySelector(".start-button");
const startMenuList = document.querySelector(".menu-list");
const mainProgram = document.querySelector(".main-program");

//Open Roadmap
const menuRoadmap = document.querySelector(".menu-roadmap");
menuRoadmap.addEventListener("click", () => {
  startMenuList.classList.toggle("hidden");
  roadmapModal.classList.remove("hidden");
  startButton.classList.toggle("clicked");
  documentsDropMenu.classList.add("hidden");
});

//Toggle menu list
startButton.addEventListener("click", () => {
  startMenuList.classList.toggle("hidden");
  startButton.classList.toggle("clicked");
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

const closeRoadmap = document.querySelector(".clo-roadmap");
const roadmapModal = document.querySelector(".roadmap-modal");

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

let shadowActive = false;

const shadowBar = document.querySelector(".act-shadow");
// Open shadow minter modal
shadowMinterDesk.addEventListener("dblclick", () => {
  if (!shadowActive) {
    shadowMinterModal.classList.remove("hidden");
    shadowBar.classList.remove("hidden");
    shadowActive = true;
  }
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

closeRoadmap.addEventListener("click", () => {
  roadmapModal.classList.add("hidden");
});

// Hover to display programs

const programsHover = document.querySelector(".d1");
const documentsHover = document.querySelector(".d2");
const mintInfoHover = document.querySelector(".d3");
const socialsHover = document.querySelector(".d4");

const programsDropMenu = document.querySelector(".drop-1");
const documentsDropMenu = document.querySelector(".drop-2");
const mintInfoMenu = document.querySelector(".drop-3");
const socialsMenu = document.querySelector(".drop-4");

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
