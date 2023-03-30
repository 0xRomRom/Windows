
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
