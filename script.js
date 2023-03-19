const currentTimeText = document.querySelector(".current-time");
const startButton = document.querySelector(".start-button");
const startMenuList = document.querySelector(".menu-list");
const barBottomBox = document.querySelector(".bar-bottom");

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
console.log(timeInPMFormat); // Output: "3:30 PM" (assuming the current time is 3:30 PM)

//Toggle menu list
startButton.addEventListener("click", () => {
  startMenuList.classList.toggle("hidden");
  startButton.classList.toggle("clicked");
});

barBottomBox.addEventListener("click", (e) => {
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

// Drag desktop icons
const wrapper = document.querySelector(".bar-bottom");
// const desktopItem = document.querySelector(".desktop-icon");

// function onDrag({ movementX, movementY }) {
//   let getStyle = window.getComputedStyle(wrapper);
//   let left = parseInt(getStyle.left);
//   let top = parseInt(getStyle.top);
//   wrapper.style.left = `${left + movementX}px`;
//   wrapper.style.top = `${top + movementY}px`;
// }

// desktopItem.addEventListener("mousedown", () => {
//   desktopItem.classList.add("active");
//   desktopItem.addEventListener("mousemove", onDrag);
// });

// desktopItem.addEventListener("mouseup", () => {
//   desktopItem.classList.remove("active");
//   desktopItem.removeEventListener("mousemove", onDrag);
// });

const myDiv = document.querySelector(".desktop-icon");

let isDragging = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

myDiv.addEventListener("mousedown", dragStart);

function dragStart(e) {
  initialX = e.clientX - xOffset;
  initialY = e.clientY - yOffset;
  document.addEventListener("mousemove", drag);
  document.addEventListener("mouseup", dragEnd);
  isDragging = true;
}

function dragEnd(e) {
  initialX = currentX;
  initialY = currentY;

  isDragging = false;

  document.removeEventListener("mousemove", drag);
  document.removeEventListener("mouseup", dragEnd);
}

function drag(e) {
  if (isDragging) {
    e.preventDefault();

    currentX = e.clientX - initialX;
    currentY = e.clientY - initialY;

    xOffset = currentX;
    yOffset = currentY;

    setTransform(currentX, currentY, myDiv);
  }
}

function setTransform(xPos, yPos, el) {
  el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
}
