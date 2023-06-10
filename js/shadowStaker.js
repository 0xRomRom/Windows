const connectMetamask = document.querySelector('.connect-meta-stake');
const tab1 = document.querySelector(".tab1");
const tab2 = document.querySelector(".tab2");


let staker;


connectMetamask.addEventListener('click', async () => {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.send("eth_requestAccounts");

        //Get array of accounts
        const accounts = await web3.eth.getAccounts();

        //Select first account
        staker = accounts[0];
        tab1.classList.add("hidden");
        tab2.classList.remove("hidden");
    }
});