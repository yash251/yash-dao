import { useAddress, useMetamask, useEditionDrop } from '@thirdweb-dev/react';
import { useState, useEffect } from 'react';

const App = () => {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  console.log("Address: ", address);

  // Initialize our editionDrop contract
  const editionDrop = useEditionDrop("0x85b154BaA8716DDF4890eE35313EcDFf0b5F7A92");
  // State variable for us to know if user has our NFT.
  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
  // isClaiming lets us keep a loading state while NFT is minting
  const [isClaiming, setIsClaiming] = useState(false);

  useEffect(() => {
    // If they don't have a connected wallet, exit!
    if (!address) {
      return;
    }

    const checkBalance = async () => {
      try {
        const balance = await editionDrop.balanceOf(address, 0); // check if the user has our NFT
        if (balance.gt(0)) {
          setHasClaimedNFT(true);
          console.log("🌟 this user has a membership NFT!");
        } else {
          setHasClaimedNFT(false);
          console.log("😭 this user doesn't have a membership NFT.");
        }
      } catch (error) {
        setHasClaimedNFT(false);
        console.error("Failed to get balance", error);
      }
    };
    checkBalance();
  }, [address, editionDrop]);

  const mintNft = async () => {
    try {
      setIsClaiming(true);
      await editionDrop.claim("0", 1);
      console.log(`Successfully minted! Check on Opensea: https://testnets.opensea.io/assets/${editionDrop.getAddress()}/0`);
      setHasClaimedNFT(true);
    }
    catch (error) {
      setHasClaimedNFT(false);
      console.log("Failed to mint NFT", error);
    }
    finally {
      setIsClaiming(false);
    }
  };

  // This is the case where the user hasn't connected their wallet
  // to your web app. Let them call connectWallet.
  if(!address){
    return (
      <div className="landing">
        <h1>Welcome to Yash DAO</h1>
        <button onClick={connectWithMetamask} className="btn-hero">
          Connect your wallet
        </button>
      </div>
    );
  }

  if (hasClaimedNFT) {
    return (
      <div className='member-page'>
        <h1>🤴🏻Yash DAO Member Page</h1>
        <p>Congratulations on being a member</p>
      </div>
    );
  }

  // Render the mint NFT screen
  return (
    <div className='mint-nft'>
      <h1>Mint your free DAO Membership NFT 🛐</h1>
      <button 
        disabled={isClaiming}
        onClick={mintNft}
      >
        {isClaiming ? "Minting..." : "Mint your NFT (free)"}
      </button>
    </div>
  );
}

export default App;