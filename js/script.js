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
  console.log(e.target);
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
  }
});

const trashCanModals = document.querySelector(".trash-can-modal");
const trashIconDesk = document.querySelector(".trash-icon");
const shadowMinterDesk = document.querySelector(".shadow-minter");
const closeTrashCan = document.querySelector(".clo-trash");

const addActiveProgram = (divToAdd) => {
  let addedProgram = currentPrograms + divToAdd;
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
  trashCanModal.classList.add("hidden");
  trashCanModal.classList.remove("enlarged");
  removeActiveProgram(recycleDiv);
});

// Open shadow minter modal
shadowMinterDesk.addEventListener("dblclick", () => {
  alert("hi");
});
