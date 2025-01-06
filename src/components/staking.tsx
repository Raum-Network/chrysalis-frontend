// src/services/staking.ts

import { AlbedoWallet } from '@/services/wallets/AlbedoWallet';
import  { nativeToScVal , Horizon , TransactionBuilder , Networks , Contract} from 'stellar-sdk';

const STAKING_CONTRACT_ADDRESS = 'CD4NK6ZV6MGJBQZA66LJPTM5NMDFLHYLBUCDMTG5KK223D2DLVULXJ5H';

export const stakeAssets = async (amount: string, wallet: AlbedoWallet) => {
    try {
        // Ensure the wallet is connected
        const address = await wallet.getPublicKey();
        if (!address) {
            throw new Error("Wallet is not connected");
        }

        // Create a Stellar SDK server instance
        const server = new Horizon.Server('https://horizon-testnet.stellar.org');

        // Load the account
        const account = await server.loadAccount(address);

        const contract = new Contract(STAKING_CONTRACT_ADDRESS);

        // Create a transaction
        const transaction = new TransactionBuilder(account, {
            fee: '100',
            networkPassphrase: Networks.TESTNET,
        })
            .addOperation(contract.call("stake_eth" , ...[
                nativeToScVal(address , {type:"address"}),
                nativeToScVal(amount , {type:"i128"}),
            ]))
            .setTimeout(30)
            .build();

        // Sign the transaction
        wallet.signTransaction(transaction);

        // Submit the transaction
        const result = await server.submitTransaction(transaction);
        console.log("Transaction successful:", result);
        return result;
    } catch (error) {
        console.error("Staking transaction failed:", error);
        throw error;
    }
};