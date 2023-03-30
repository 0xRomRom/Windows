
const terminalInput = document.querySelector(".terminal-input");
const terminalOutput = document.querySelector(".terminal-output");


const prePend = `<span class="terminal-prompt-user">0x398fa</span>
<span class="terminal-prompt-path">~ $</span>`;








terminalInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const command = e.target.value;
    e.target.value = "";

    const output = document.createElement("div");
    output.innerHTML = prePend + command;

    terminalOutput.insertAdjacentElement("beforeend", output);
  }
});
