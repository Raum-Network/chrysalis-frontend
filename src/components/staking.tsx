// src/services/staking.ts

import { AlbedoWallet } from '@/services/wallets/AlbedoWallet';
import { nativeToScVal, Horizon, rpc, TransactionBuilder, Networks, Contract, Transaction } from 'stellar-sdk';

const STAKING_CONTRACT_ADDRESS = 'CD4NK6ZV6MGJBQZA66LJPTM5NMDFLHYLBUCDMTG5KK223D2DLVULXJ5H';

export const stakeAssets = async (amount: string, wallet: AlbedoWallet) => {
    try {
        // Ensure the wallet is connected
        const address = await wallet.getPublicKey();
        if (!address) {
            throw new Error("Wallet is not connected");
        }

        // Create a Stellar SDK server instance
        const server = new rpc.Server('https://soroban-testnet.stellar.org:443');

        // Load the account
        const account = await server.getAccount(address);
        console.log("Loaded account:", account);

        const contract = new Contract(STAKING_CONTRACT_ADDRESS);

        // Create a transaction
        const transaction = new TransactionBuilder(account, {
            fee: '100',
            networkPassphrase: Networks.TESTNET,
        })
            .addOperation(contract.call("stake_eth", ...[
                nativeToScVal(address, { type: "address" }),
                nativeToScVal(amount, { type: "i128" }),
            ]))
            .setTimeout(500)
            .build();

        console.log("Built transaction:", transaction);

        let preparedTransaction = await server.prepareTransaction(transaction);
        console.log("Prepared transaction:", preparedTransaction);
        
        const data = await wallet.signTransaction(preparedTransaction);
        console.log("Signed transaction:", data);
        
        // Submit the transaction
        // const result = await server.sendTransaction(preparedTransaction);
        // console.log("Transaction successful:", result);
        return data;
    } catch (error) {
        console.error("Staking transaction failed:", error);
        throw error;
    }
};
export const unStakeAssets = async (amount: string, wallet: AlbedoWallet) => {
    try {
        // Ensure the wallet is connected
        const address = await wallet.getPublicKey();
        if (!address) {
            throw new Error("Wallet is not connected");
        }

        // Create a Stellar SDK server instance
        const server = new rpc.Server('https://soroban-testnet.stellar.org:443');

        // Load the account
        const account = await server.getAccount(address);
        console.log("Loaded account:", account);

        const contract = new Contract(STAKING_CONTRACT_ADDRESS);

        // Create a transaction
        const transaction = new TransactionBuilder(account, {
            fee: '100',
            networkPassphrase: Networks.TESTNET,
        })
            .addOperation(contract.call("unstake_eth", ...[
                nativeToScVal(address, { type: "address" }),
                nativeToScVal(amount, { type: "i128" }),
            ]))
            .setTimeout(500)
            .build();

        console.log("Built transaction:", transaction);

        let preparedTransaction = await server.prepareTransaction(transaction);
        console.log("Prepared transaction:", preparedTransaction);
        
        const data = await wallet.signTransaction(preparedTransaction);
        console.log("Signed transaction:", data);
        
        return data;
    } catch (error) {
        console.error("Staking transaction failed:", error);
        throw error;
    }
};
