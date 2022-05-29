import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// Importing thirdweb provider and Rinkeby ChainId
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react';

// This is the chainId my dApp will work on.
const activeChainId = ChainId.Rinkeby;

// Wrap the app with the thirdweb provider
ReactDOM.render(
  <React.StrictMode>
    <ThirdwebProvider desiredChainId={activeChainId}>
      <App />
    </ThirdwebProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);