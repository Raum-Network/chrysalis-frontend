import React, { useState } from 'react';
import { AlbedoWallet } from '../services/wallets/AlbedoWallet';

const ConnectWallet: React.FC = () => {
  const [wallet] = useState(new AlbedoWallet());
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>('0');

  const handleConnect = async () => {
    try {
      const address = await wallet.connect();
      setPublicKey(address);
      const walletBalance = await wallet.getBalance();
      setBalance(walletBalance);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const handleDisconnect = async () => {
    try {
      await wallet.disconnect();
      setPublicKey(null);
      setBalance('0');
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
    }
  };

  const formatAddress = (address: string): string => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="wallet-connection">
      {!publicKey ? (
        <button 
          onClick={handleConnect}
          className="connect-button"
        >
          Connect Wallet
        </button>
      ) : (
        <div className="wallet-info">
          <span className="address">{formatAddress(publicKey)}</span>
          <span className="balance">{balance} XLM</span>
          <button 
            onClick={handleDisconnect}
            className="disconnect-button"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
};

export default ConnectWallet;
