import * as React from 'react';

import '@rainbow-me/rainbowkit/styles.css';

import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import {
  polygonMumbai,
  foundry,
  avalancheFuji,
  localhost,
  bscTestnet,
  bsc,
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import Dashboard from './pages/Dashboard';
import MainLayout from './components/layout/mainLayout';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';
import Footer from './components/Footer';

window.Buffer = window.Buffer || require('buffer').Buffer;

const { chains, provider } = configureChains(
  [bsc],
  [
    alchemyProvider({
      apiKey: 'TM_2HoUNaGB5IX6grUxMx9dWOti85Kff',
      infuraId: 'ded2c8aa580d44d2b63c2b88c03fe3a3',
    }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My Alchemy DApp',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const App = () => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        modalSize='large'
        coolMode
        chains={chains}
        theme={darkTheme({
          accentColor: '#3872e0',
        })}
      >
        <MainLayout>
          <Header />
          <Dashboard />
          <ToastContainer />
          <Footer />
        </MainLayout>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default App;
