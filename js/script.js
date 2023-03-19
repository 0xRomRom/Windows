const currentTimeText = document.querySelector(".current-time");
const startButton = document.querySelector(".start-button");
const startMenuList = document.querySelector(".menu-list");
const mainProgram = document.querySelector(".main-program");

let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();

// Convert hours to 12-hour format
let amOrPm = hours >= 12 ? "PM" : "AM";
hours = hours % 12;
hours = hours ? hours : 12; // Handle midnight (0 hours)

// Add leading zero to minutes if necessary
minutes = minutes < 10 ? "0" + minutes : minutes;

// Format the time as a string in PM format
let timeInPMFormat = hours + ":" + minutes + " " + amOrPm;

currentTimeText.textContent = timeInPMFormat;

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

const trashIconDesk = document.querySelector(".trash-icon");

trashIconDesk.addEventListener("dblclick", () => {
  alert("hi");
});

const shadowMinterDesk = document.querySelector(".shadow-minter");

shadowMinterDesk.addEventListener("dblclick", () => {
  alert("hi");
});
