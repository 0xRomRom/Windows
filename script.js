const currentTimeText = document.querySelector(".current-time");
const startButton = document.querySelector(".start-button");
const startMenuList = document.querySelector(".menu-list");

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
