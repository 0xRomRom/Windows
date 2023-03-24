const trashCanModal = document.querySelector(".recycle-modal");
const enlargeTrashCan = document.querySelector(".enl-trash");
const minimizeTrashCan = document.querySelector(".min-trash");

const shadowMintModal = document.querySelector(".shadow-minter-modal");
const enlargeShadowMinter = document.querySelector(".enl-shadow")
const minimizeShadowMinter = document.querySelector(".min-shadow");

let trashCanEnlarged = false;
let shadowMinterEnlarged = false;


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
  if (
    (event.target && event.target.matches(".minimized")) ||
    event.target.matches(".program-text")
  ) {
    const activeBin = document.querySelector(".act-bin");
    trashCanModal.classList.remove("hidden");
    activeBin.classList.add("maximized");
    activeBin.classList.remove("minimized");
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