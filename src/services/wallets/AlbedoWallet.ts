import albedo, { TxIntentParams, TxIntentResult } from '@albedo-link/intent';
import { Horizon, Transaction } from 'stellar-sdk';

export class AlbedoWallet {
  private publicKey: string | null = null;

  async connect(): Promise<string> {
    try {
      console.log("Initializing Albedo connection...");
      const res = await albedo.publicKey({token: 'public'});
      console.log("Albedo response:", res);
      
      this.publicKey = res.pubkey;
      if (this.publicKey) {
        return this.publicKey;
      }
      throw new Error('Public key is null');
    } catch (error) {
      console.error("Albedo connection error:", error);
      throw new Error('Failed to connect Albedo wallet');
    }
  }

  async disconnect(): Promise<void> {
    this.publicKey = null;
  }

  async signTransaction(transaction: Transaction):Promise<any> {
    if (!this.publicKey) {
      throw new Error('Wallet not connected');
    }

    try {
      const result = await albedo.tx({
        xdr: transaction.toXDR(),
        network:'testnet',
        submit:true
      });
      return result;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to sign transaction');
    }
  }

  async getBalance(token:string): Promise<string> {
    if (!this.publicKey) {
      throw new Error('Wallet not connected');
    }

    try {
      const server = new Horizon.Server('https://horizon-testnet.stellar.org');
      const account = await server.loadAccount(this.publicKey);
      const balance = account.balances.find(
        b => b.asset_type === token
      );
      return balance ? balance.balance : '0';
    } catch (error) {
      console.log(error);
      throw new Error('Failed to fetch balance');
    }
  }

  async getBalanceETH(token:string): Promise<string> {
    if (!this.publicKey) {
      throw new Error('Wallet not connected');
    }

    try {
      const server = new Horizon.Server('https://horizon-testnet.stellar.org');
      const account = await server.loadAccount(this.publicKey);
      console.log(account.balances , "wwwwww")
      const balance = account.balances.find(
        b => b.asset_type === "credit_alphanum4" && b.asset_code === "ETH" && b.asset_issuer === "GDHPD2PT2HQEMG2XGLSSMSPQTXM5TL3WLU6BLDQ2SMWUVBOX2Y4ZKUUA"
      );
      console.log(balance , "balance")
      return balance ? balance.balance : '0';
    } catch (error) {
      console.log(error);
      throw new Error('Failed to fetch balance');
    }
  }

  isConnected(): boolean {
    return !!this.publicKey;
  }

  getPublicKey(): string | null {
    return this.publicKey;
  }
}
