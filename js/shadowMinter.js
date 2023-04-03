// import contractABI from "./abi.js";

const connectMetamask = document.querySelector(".connect-metamask");
const connectUserWallet = document.querySelector(".connected-wallet");
const modal1 = document.querySelector(".minter-inner-1");
const modal2 = document.querySelector(".minter-inner-2");

let account;
let contractInstance;
// const ABI = contractABI;
const CONTRACT = "0xac084F5db68ee0Ba80AeCA734DA9AFD128F864d7";

const connectToMetamask = async () => {
    //Check if metamask is installed
    if (window.ethereum) {
        alert("eth!");
        //Request current user
        await window.ethereum.send("eth_requestAccounts");
        
        //Initialize web3 class
        window.web3 = new Web3(window.ethereum);
        
        //Get array of accounts
        const accounts = await web3.eth.getAccounts();
        
        //Select first account
        account = accounts[0];
        
        //Display user wallet
        modal1.classList.add("hidden");
        modal2.classList.remove("hidden");
        connectUserWallet.textContent = account;
        
        //Instantiate contract instance
        contractInstance = new web3.eth.Contract(ABI, CONTRACT);
    } else {
        alert('No metamask installed!')
    }
}
connectMetamask.addEventListener("click", connectToMetamask);


const statusBar = document.querySelector('.status-bar');

const incrementStatusBar = (count) => {
    let added = 0;
    const statusIncrementer = setInterval(() => {
        statusBar.innerHTML += `<div class="stat-block"></div>`;
        added++;
        if(added === count) {
            clearInterval(statusIncrementer);
        }
    }, 500);
};
incrementStatusBar(10);