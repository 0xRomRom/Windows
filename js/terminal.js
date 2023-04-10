const terminalInput = document.querySelector(".terminal-input");
const terminalOutput = document.querySelector(".terminal-output");
const terminalBody = document.querySelector(".terminal-body");
terminalBody.addEventListener("click", () => {
  terminalInput.focus();
  ``;
});

const prePend = `<span class="terminal-prompt-user">0x398fa</span>
<span class="terminal-prompt-path">~ $</span>`;

const output = document.createElement("div");
output.style.color = "red";
output.innerHTML = prePend;
output.textContent = "Windows Terminal - Enter 'help' for a list of commands";
terminalOutput.insertAdjacentElement("beforeend", output);

terminalInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const command = e.target.value;
    e.target.value = "";
    if (command === "" || command === " ") return;

    if (command === "help") {
      const output = document.createElement("div");
      const output2 = document.createElement("div");
      output.style.color = "cyan";
      output2.style.color = "green";
      output2.innerHTML = "help";
      output.innerHTML =
        "<span class='red'>==============Commands==============</span>" +
        "<br>" +
        "<span class='green'>cd</span> => change directory" +
        "<br>" +
        "<span class='green'>ls</span> => current directory" +
        "<br>" +
        "<span class='green'>mint_price</span> => returns mint price" +
        "<br>" +
        "<span class='green'>mint_cap</span> => returns user mint cap" +
        "<br>" +
        "<span class='green'>cur_supp</span> => returns current minted supply" +
        "<br>" +
        "<span class='green'>lore</span> => returns sicarius lore" +
        "<br>" +
        "<span class='red'>====================================</span>";
      terminalOutput.insertAdjacentElement("beforeend", output2);
      terminalOutput.insertAdjacentElement("beforeend", output);
      return;
    }

    if (command === "dn") {
      const output = document.createElement("div");
      output.style.color = "green";
      output.innerHTML = prePend;
      output.textContent = "Suck deez nuts";
      terminalOutput.insertAdjacentElement("beforeend", output);
      return;
    }

    if (command.slice(0, 2) === "cd") {
      const output = document.createElement("div");
      output.style.color = "green";
      output.innerHTML = prePend;
      output.textContent = "cd deez nuts";
      terminalOutput.insertAdjacentElement("beforeend", output);
      return;
    }

    if (command === "ls") {
      const output = document.createElement("div");
      output.innerHTML = prePend;
      output.style.color = "green";
      output.textContent = "/root";
      terminalOutput.insertAdjacentElement("beforeend", output);
      return;
    }

    if (command === "clear") {
      terminalOutput.innerHTML = "";
      return;
    }

    if (command === "funsu") {
      const output = document.createElement("div");

      output.innerHTML = prePend;
      output.textContent = command;

      output.style.color = "red";
      output.innerHTML = prePend;
      output.textContent = "Funsu is gonu";
      terminalOutput.insertAdjacentElement("beforeend", output);
      return;
    }

    const output = document.createElement("div");
    output.style.color = "purple";
    output.innerHTML = prePend;
    output.textContent = "Unknown command: " + command;
    terminalOutput.insertAdjacentElement("beforeend", output);
    return;
  }
});

const spinner = document.querySelector(".spinner");

const rotateSpinner = () => {
  let index = 0;
  setInterval(() => {
    if (index === 8) {
      index = 0;
    }
    spinner.innerHTML = spinElements[index];
    index++;
  }, 100);
};
rotateSpinner();

const spinElements = ["|", "/", "-", "\\", "|", "/", "-", "\\", "|"];
