const currentTimeText = document.querySelector(".current-time");

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
