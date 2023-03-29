let currentPrograms = "";

const recycleDiv = `<div class="active-program act-bin maximized"><img src="./img/Recycle Bin.png" alt="recycle bin" class="mini-logo"/><span class="program-text">Recycle Bin</span>
</div>`;

const shadowDiv = `<div class="active-program act-shadow maximized"><img src="./img/Shadow Minter.png" alt="shadow minter" class="mini-logo"/><span class="program-text">Shadow Minter v.032</span>
</div>`;

const startButton = document.querySelector(".start-button");
const startMenuList = document.querySelector(".menu-list");
const mainProgram = document.querySelector(".main-program");
const activePrograms = document.querySelector(".active-programs");

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

const trashCanModals = document.querySelector(".recycle-modal");
const trashIconDesk = document.querySelector(".trash-icon");
const closeTrashCan = document.querySelector(".clo-trash");

const shadowMinterModal = document.querySelector(".shadow-minter-modal");
const shadowMinterDesk = document.querySelector(".shadow-minter");
const closeShadowMinter = document.querySelector(".clo-shadow");

const addActiveProgram = (divToAdd) => {
  const addedProgram = currentPrograms + divToAdd;
  currentPrograms = addedProgram;
  activePrograms.innerHTML = addedProgram;
};

const removeActiveProgram = (divToRemove) => {
  const regex = new RegExp(divToRemove, "g");
  const result = currentPrograms.replace(regex, "");
  currentPrograms = result;
  activePrograms.innerHTML = result;
};

let binActive = false;

// Open recycle bin modal
trashIconDesk.addEventListener("dblclick", () => {
  trashCanModals.classList.remove("hidden");
  if (!binActive) {
    addActiveProgram(recycleDiv);
  }
});

// Close recycle bin modal
closeTrashCan.addEventListener("click", () => {
  trashCanModals.classList.add("hidden");
  trashCanModals.classList.remove("enlarged");
  removeActiveProgram(recycleDiv);
  binActive = false;
});

let shadowActive = false;

// Open shadow minter modal
shadowMinterDesk.addEventListener("dblclick", () => {
  shadowMinterModal.classList.remove("hidden");
  if (!shadowActive) {
    addActiveProgram(shadowDiv);
  }
});

closeShadowMinter.addEventListener("click", () => {
  shadowMinterModal.classList.add("hidden");
  shadowMinterModal.classList.remove("enlarged");
  removeActiveProgram(shadowDiv);
  shadowActive = false;
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

const terminalInput = document.querySelector(".terminal-input");
const terminalOutput = document.querySelector(".terminal-output");

terminalInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const command = e.target.value;
    e.target.value = "";

    const output = document.createElement("div");
    output.textContent = command;
    terminalOutput.appendChild(output);
  }
});
