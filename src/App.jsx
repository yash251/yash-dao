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
  // This is the case where we have the user's address
  // which means they've connected their wallet to our site!
  return (
    <div className="landing">
      <h1>Wallet connected</h1>
    </div>
  );
};

export default App;