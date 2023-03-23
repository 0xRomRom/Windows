let currentPrograms = "";

const recycleDiv = `<div class="active-program act-bin maximized"><img src="./img/Recycle Bin.png" alt="recycle bin" class="mini-logo"/><span class="program-text">Recycle Bin</span>
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
    programsDropMenu.classList.add('hidden');
    documentsDropMenu.classList.add('hidden');
    mintInfoMenu.classList.add('hidden');
    socialsMenu.classList.add('hidden');
  }
});

const trashCanModals = document.querySelector(".recycle-modal");
const trashIconDesk = document.querySelector(".trash-icon");
const shadowMinterDesk = document.querySelector(".shadow-minter");
const closeTrashCan = document.querySelector(".clo-trash");

const addActiveProgram = (divToAdd) => {
  const addedProgram = currentPrograms + divToAdd;
  updateDom(addedProgram);
};

const removeActiveProgram = (divToRemove) => {
  const regex = new RegExp(divToRemove, "g");
  const result = currentPrograms.replace(regex, "");
  updateDom(result);
};

const updateDom = (program) => {
  activePrograms.innerHTML = program;
};

// Open recycle bin modal
trashIconDesk.addEventListener("dblclick", () => {
  trashCanModals.classList.remove("hidden");
  addActiveProgram(recycleDiv);
});

// Close recycle bin modal
closeTrashCan.addEventListener("click", () => {
  trashCanModals.classList.add("hidden");
  trashCanModals.classList.remove("enlarged");
  removeActiveProgram(recycleDiv);
});

// Open shadow minter modal
shadowMinterDesk.addEventListener("dblclick", () => {
  alert("hi");
});


// Hover to display programs

const programsHover = document.querySelector('.d1');
const documentsHover = document.querySelector('.d2');
const mintInfoHover = document.querySelector('.d3');
const socialsHover = document.querySelector('.d4');

const programsDropMenu = document.querySelector('.drop-1');
const documentsDropMenu = document.querySelector('.drop-2');
const mintInfoMenu = document.querySelector('.drop-3');
const socialsMenu = document.querySelector('.drop-4');

// #1
programsDropMenu.addEventListener('mouseover', () => {
  programsDropMenu.classList.remove('hidden');
});
programsHover.addEventListener('mouseover', () => {
  programsDropMenu.classList.remove('hidden');
});

programsHover.addEventListener('mouseleave', () => {
  programsDropMenu.classList.add('hidden');
});

// #2

documentsDropMenu.addEventListener('mouseover', () => {
  documentsDropMenu.classList.remove('hidden');
});

documentsHover.addEventListener('mouseover', () => {
  documentsDropMenu.classList.remove('hidden');
});

documentsHover.addEventListener('mouseleave', () => {
  documentsDropMenu.classList.add('hidden');
});

// #3

mintInfoMenu.addEventListener('mouseover', () => {
  mintInfoMenu.classList.remove('hidden');
});

mintInfoHover.addEventListener('mouseover', () => {
  mintInfoMenu.classList.remove('hidden');
});

mintInfoHover.addEventListener('mouseleave', () => {
  mintInfoMenu.classList.add('hidden');
});

// #4

socialsMenu.addEventListener('mouseover', () => {
  socialsMenu.classList.remove('hidden');
});

socialsHover.addEventListener('mouseover', () => {
  socialsMenu.classList.remove('hidden');
});

socialsHover.addEventListener('mouseleave', () => {
  socialsMenu.classList.add('hidden');
});