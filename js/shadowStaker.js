const connectMetamask = document.querySelector('.connect-meta-stake');
const approvalButton = document.querySelector('.approval-btn');
const tab1 = document.querySelector(".tab1");
const tab2 = document.querySelector(".tab2");
const tab3 = document.querySelector(".tab3");


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


        //fetch approved status 

        // if approved open tab 3
        // if not approved open tab 2
    }
});

approvalButton.addEventListener("click", () => {

    //Approve contract

    //show tab 3
});

