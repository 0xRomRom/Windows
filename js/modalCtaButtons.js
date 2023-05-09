const trashCanModal = document.querySelector(".recycle-modal");
const enlargeTrashCan = document.querySelector(".enl-trash");
const minimizeTrashCan = document.querySelector(".min-trash");

const shadowMintModal = document.querySelector(".shadow-minter-modal");
const enlargeShadowMinter = document.querySelector(".enl-shadow");
const minimizeShadowMinter = document.querySelector(".min-shadow");

const terminalModal = document.querySelector(".terminal-modal");
const enlargeTerminal = document.querySelector(".enl-terminal");
const minimizeTerminal = document.querySelector(".min-terminal");

let trashCanEnlarged = false;
let shadowMinterEnlarged = false;
let terminalEnlarged = false;

// Recycle Modal \\

// Enlarge trash can
enlargeTrashCan.addEventListener("click", () => {
  if (!trashCanEnlarged) {
    trashCanModal.classList.add("enlarged");
    trashCanEnlarged = true;
    return;
  }
  trashCanModal.classList.remove("enlarged");
  trashCanEnlarged = false;
});

// Minimize min button
minimizeTrashCan.addEventListener("click", () => {
  const activeBin = document.querySelector(".act-bin");
  trashCanModal.classList.add("hidden");
  activeBin.classList.remove("maximized");
  activeBin.classList.add("minimized");
});

// Enlarge from task bar handler
const parent = document.querySelector(".active-programs");
parent.addEventListener("click", (event) => {
  // Trashcan event
  if (event.target.classList[0] === "act-bin") {
    const activeBin = document.querySelector(".act-bin");
    activeBin.classList.add("maximized");
    activeBin.classList.remove("minimized");
    trashCanModal.classList.remove("hidden");
  }

  // Shadow Minter event
  if (event.target.classList[0] === "act-shadow") {
    const activeShadows = document.querySelector(".act-shadow");
    activeShadows.classList.add("maximized");
    activeShadows.classList.remove("minimized");
    shadowMintModal.classList.remove("hidden");
  }

  // Terminal event
  if (event.target.classList[0] === "act-terminal") {
    const activeTerminals = document.querySelector(".act-terminal");
    activeTerminals.classList.add("maximized");
    activeTerminals.classList.remove("minimized");
    terminalModal.classList.remove("hidden");
  }
});

// Shadow Minter Modal \\

// Enlarge shadow minter
enlargeShadowMinter.addEventListener("click", () => {
  if (!shadowMinterEnlarged) {
    shadowMintModal.classList.add("enlarged");
    shadowMinterEnlarged = true;
    return;
  }
  shadowMintModal.classList.remove("enlarged");
  shadowMinterEnlarged = false;
});

// Minimize min button
minimizeShadowMinter.addEventListener("click", () => {
  const activeShadow = document.querySelector(".act-shadow");
  shadowMintModal.classList.add("hidden");
  activeShadow.classList.add("minimized");
  activeShadow.classList.remove("maximized");
});

// Terminal Modal \\

// Enlarge terminal
enlargeTerminal.addEventListener("click", () => {
  if (!terminalEnlarged) {
    terminalModal.classList.add("enlarged");
    terminalEnlarged = true;
    return;
  }
  terminalModal.classList.remove("enlarged");
  terminalEnlarged = false;
});

// Minimize min button
minimizeTerminal.addEventListener("click", () => {
  const activeTerminal = document.querySelector(".act-terminal");
  terminalModal.classList.add("hidden");
  activeTerminal.classList.add("minimized");
  activeTerminal.classList.remove("maximized");
});
