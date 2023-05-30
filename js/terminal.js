const terminalInput = document.querySelector(".terminal-input");
const terminalOutput = document.querySelector(".terminal-output");
const terminalBody = document.querySelector(".terminal-body");

import ABI from "./abi.js";
const CONTRACT = "0xaD2bf4b604054C60a1aD7574C0B731967D12000C";
let currentMintCount = 0;

let contractInstance;

const capFetch = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    contractInstance = new web3.eth.Contract(ABI, CONTRACT);
    try {
      const currentlyMinted = await contractInstance.methods
        .CURRENT_SUPPLY()
        .call() - 1;
      currentMintCount = currentlyMinted;
    } catch (err) {
      console.error(err);
    }
  }
};
capFetch();

terminalBody.addEventListener("click", () => {
  terminalInput.focus();
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
        "<span class='red'>=================Commands=================</span>" +
        "<br>" +
        "<span class='green'>cd</span> => change directory" +
        "<br>" +
        "<span class='green'>ls</span> => current directory" +
        "<br>" +
        "<span class='green'>clear</span> => clear terminal" +
        "<br>" +
        "<span class='green'>mint_price</span> => returns mint price" +
        "<br>" +
        "<span class='green'>mint_cap</span> => returns user mint cap" +
        "<br>" +
        "<span class='green'>cur_supp</span> => returns current minted supply" +
        "<br>" +
        "<span class='green'>lore</span> => returns sicarius lore" +
        "<br>" +
        "<span class='green'>live</span> => is minting live?" +
        "<br>" +
        "<span class='green'>roi</span> => return on investment since mint" +
        "<br>" +
        "<span class='red'>==========================================</span>";
      terminalOutput.insertAdjacentElement("beforeend", output2);
      terminalOutput.insertAdjacentElement("beforeend", output);
      return;
    }

    if (command.slice(0, 2) === "cd") {
      const output = document.createElement("div");
      output.style.color = "green";
      output.innerHTML = prePend + " cd deez nuts";
      terminalOutput.insertAdjacentElement("beforeend", output);
      return;
    }

    if (command === "roi") {
      const output = document.createElement("div");
      output.innerHTML = prePend + ` ROI since mint: N/A`;
      output.style.color = "green";
      terminalOutput.insertAdjacentElement("beforeend", output);
      return;
    }

    if (command === "live") {
      const output = document.createElement("div");
      output.innerHTML = prePend + ` May 19 ~ 17:00 UTC`;
      output.style.color = "green";
      terminalOutput.insertAdjacentElement("beforeend", output);
      return;
    }

    if (command === "lore") {
      const output = document.createElement("div");
      output.innerHTML = prePend;
      output.style.color = "green";
      output.innerHTML =
        `<br>` +
        `Sicarius were a feared and mysterious order of assassins which emerged from the depths of despair. Their ability to move unseen made them elusive and deadly. Legends spoke of their shadowy prowess and lethal methods. Their reputation and covert operations spread fear among those who crossed their path…` +
        `<br><br>`;
      terminalOutput.insertAdjacentElement("beforeend", output);
      return;
    }

    if (command === "cur_supp") {
      const output = document.createElement("div");
      output.innerHTML =
        prePend + ` Currently Minted: [${currentMintCount}/2222]`;
      output.style.color = "green";
      terminalOutput.insertAdjacentElement("beforeend", output);
      return;
    }

    if (command === "mint_price") {
      const output = document.createElement("div");
      output.innerHTML = prePend + " Mint price: 0.01337 ETH";
      output.style.color = "green";
      terminalOutput.insertAdjacentElement("beforeend", output);
      return;
    }

    if (command === "mint_cap") {
      const output = document.createElement("div");
      output.innerHTML = prePend + " Max = [2/wallet]";
      output.style.color = "green";
      terminalOutput.insertAdjacentElement("beforeend", output);
      return;
    }

    if (command === "ls") {
      const output = document.createElement("div");
      output.innerHTML = prePend + " /root";
      output.style.color = "green";
      terminalOutput.insertAdjacentElement("beforeend", output);
      return;
    }

    if (command === "clear") {
      terminalOutput.innerHTML = "";
      return;
    }

    const output = document.createElement("div");
    output.style.color = "purple";
    output.innerHTML = "Unknown command: " + command;
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
