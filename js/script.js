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

//Drag desktop items
const trashIcon = document.querySelector(".trash-icon");
const trashIcon2 = document.querySelector(".trash-icon2");

// Recycle bin
let isDragging1 = false;
let currentX1;
let currentY1;
let initialX1;
let initialY1;
let xOffset1 = 0;
let yOffset1 = 0;

trashIcon.addEventListener("mousedown", dragStart1);

function dragStart1(e) {
  initialX1 = e.clientX - xOffset1;
  initialY1 = e.clientY - yOffset1;
  document.addEventListener("mousemove", drag1);
  document.addEventListener("mouseup", dragEnd1);
  isDragging1 = true;
}

function dragEnd1(e) {
  initialX1 = currentX1;
  initialY1 = currentY1;

  isDragging1 = false;

  document.removeEventListener("mousemove", drag1);
  document.removeEventListener("mouseup", dragEnd1);
}

function drag1(e) {
  if (isDragging1) {
    e.preventDefault();

    currentX1 = e.clientX - initialX1;
    currentY1 = e.clientY - initialY1;

    xOffset1 = currentX1;
    yOffset1 = currentY1;

    setTransform1(currentX1, currentY1, trashIcon);
  }
}

function setTransform1(xPos, yPos, el) {
  el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
}

// Recycle bin 2

let isDragging2 = false;
let currentX2;
let currentY2;
let initialX2;
let initialY2;
let xOffset2 = 0;
let yOffset2 = 0;

trashIcon2.addEventListener("mousedown", dragStart2);

function dragStart2(e) {
  initialX2 = e.clientX - xOffset2;
  initialY2 = e.clientY - yOffset2;
  document.addEventListener("mousemove", drag2);
  document.addEventListener("mouseup", dragEnd2);
  isDragging2 = true;
}

function dragEnd2(e) {
  initialX2 = currentX2;
  initialY2 = currentY2;

  isDragging2 = false;

  document.removeEventListener("mousemove", drag2);
  document.removeEventListener("mouseup", dragEnd2);
}

function drag2(e) {
  if (isDragging2) {
    e.preventDefault();

    currentX2 = e.clientX - initialX2;
    currentY2 = e.clientY - initialY2;

    xOffset2 = currentX2;
    yOffset2 = currentY2;

    setTransform2(currentX2, currentY2, trashIcon2);
  }
}

function setTransform2(xPos, yPos, el) {
  el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
}
