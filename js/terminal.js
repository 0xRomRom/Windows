
const terminalInput = document.querySelector(".terminal-input");
const terminalOutput = document.querySelector(".terminal-output");


const prePend = `<span class="terminal-prompt-user">0x398fa</span>
<span class="terminal-prompt-path">~ $</span>`;


terminalInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const command = e.target.value;
    e.target.value = "";
    if (command === '' || command === " ") return;

    if (command === 'dn') {
        const output = document.createElement("div");
        output.style.color = 'green';
        output.innerHTML = prePend;
        output.textContent = "Suck deez nutsssss";
        terminalOutput.insertAdjacentElement("beforeend", output);
        return; 
    }
    
    if (command === 'funsu') {
        const output = document.createElement("div");
        
        output.innerHTML = prePend;
        output.textContent = command;
        
        output.style.color = 'red';
        output.innerHTML = prePend;
        output.textContent = "Funsu is gonu";
        terminalOutput.insertAdjacentElement("beforeend", output);
        return; 
    }

    const output = document.createElement("div");
    output.style.color = 'red';
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
    if(index === 8) {
      index = 0;
    }
    spinner.innerHTML = spinElements[index];
    index++;
  }, 100);
};
rotateSpinner();


const spinElements = ["|", "/", "-", "\\", "|", "/", "-", "\\", "|"];
