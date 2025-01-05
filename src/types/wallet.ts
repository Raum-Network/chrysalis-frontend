import { Transaction } from 'stellar-sdk';

export interface IWallet {
  connect(): Promise<string>;
  disconnect(): Promise<void>;
  signTransaction(transaction: Transaction): Promise<string>;
  getBalance(): Promise<string>;
  isConnected(): boolean;
  getPublicKey(): string | null;
}
