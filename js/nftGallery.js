const renderWallet = async () => {
    userTokenIDs = await getTokenIDs(staker);
    // userTokenIDs = [1, 2, 3, 4];
    walletNFTwrapper.innerHTML = '';
    userTokenIDs.map((token) => {
        walletNFTwrapper.innerHTML += `<div class="wallet-nft" data-nft="${token}">
                                        <img src="https://ipfs.io/ipfs/bafybeiakbvi37hhzvmrokwuy5kcdr6n36eerrtteeodj2xc74ymku7tgli/${token}.png" alt="NFT" class="nft-mini">
                                        <span class="nft-id">#${token}</span>
                                        </div>`
    });
};