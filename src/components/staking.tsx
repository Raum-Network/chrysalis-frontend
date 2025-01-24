// src/services/staking.ts

import { AlbedoWallet } from '@/services/wallets/AlbedoWallet';
import { nativeToScVal, Horizon, rpc, TransactionBuilder, Networks, Contract, Transaction, scValToNative, Asset, Operation } from 'stellar-sdk';

const STAKING_CONTRACT_ADDRESS = 'CAZVQKKCWYMGPWFKTAXUTNWT4GP2JFWPSX4YT4N2IOQQSXFMT5OPP4AO';

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
                nativeToScVal(Number(amount) * (10 ** 7), { type: "i128" }),
            ]))
            .setTimeout(500)
            .build();

        console.log("Built transaction:", transaction);

        const preparedTransaction = await server.prepareTransaction(transaction);
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

        const preparedTransaction = await server.prepareTransaction(transaction);
        console.log("Prepared transaction:", preparedTransaction);

        const data = await wallet.signTransaction(preparedTransaction);
        console.log("Signed transaction:", data);

        return data;
    } catch (error) {
        console.error("Staking transaction failed:", error);
        throw error;
    }
};

export const swapAssets = async (tokenA: string, tokenB: string, amount: string, wallet: AlbedoWallet) => {
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

        const contract = new Contract("CAPFLO7AA4RG3ZLIEPYQGYGBGFNBKXPIXVA5YQHNODJ37S2WCMHZB3L7");

        // Create a transaction
        const transaction = new TransactionBuilder(account, {
            fee: '100',
            networkPassphrase: Networks.TESTNET,
        })
            .addOperation(contract.call("swap_exact_tokens_for_tokens", ...[
                nativeToScVal(Number(amount) * (10 ** 7), { type: "i128" }),
                nativeToScVal("0", { type: "i128" }),
                nativeToScVal([nativeToScVal(tokenA, { type: "address" }), nativeToScVal(tokenB, { type: "address" })], { type: "Vec" }),
                nativeToScVal(address, { type: "address" }),
                nativeToScVal(new Date().getTime() + 3600, { type: "u64" })
            ]))
            .setTimeout(500)
            .build();

        console.log("Built transaction:", transaction);

        const preparedTransaction = await server.prepareTransaction(transaction);
        console.log("Prepared transaction:", preparedTransaction);

        const data = await wallet.signTransaction(preparedTransaction);
        console.log("Signed transaction:", data);

        return data;
    } catch (error) {
        console.error("Staking transaction failed:", error);
        throw error;
    }
};
export const getSwapAmount = async (tokenA: string, tokenB: string, amount: string, wallet: AlbedoWallet) => {

    
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

        console.log(amount)

        const contract = new Contract("CAPFLO7AA4RG3ZLIEPYQGYGBGFNBKXPIXVA5YQHNODJ37S2WCMHZB3L7");

        // Create a transaction
        const transaction = new TransactionBuilder(account, {
            fee: '100',
            networkPassphrase: Networks.TESTNET,
        })
            .addOperation(contract.call("router_get_amounts_out", ...[
                nativeToScVal(Number(amount) * (10 ** 7), { type: "i128" }),
                nativeToScVal([nativeToScVal(tokenA, { type: "address" }), nativeToScVal(tokenB, { type: "address" })], { type: "Vec" }),
            ]))
            .setTimeout(500)
            .build();

        console.log("Built transaction get :", transaction);

        const preparedTransaction = await server.simulateTransaction(transaction);

        console.log("Prepared transaction get:", preparedTransaction);

        if (preparedTransaction && "result" in preparedTransaction) {
            const retval = preparedTransaction.result?.retval;
            if (retval) {
                
                return (0.95 * Number(scValToNative(retval)[1])).toFixed(0)
            } else {
                throw new Error("Result value is undefined");
            }
        } else {
            throw new Error("Simulation failed");
        }
    } catch (error) {
        console.error("Staking transaction failed:", error);
        throw error;
    }
};

export const getStakedAsset = async (tokenA: string, tokenB: string, amount: string, wallet: AlbedoWallet) => {

    
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
            .addOperation(contract.call("get_stake_amount", ...[
               nativeToScVal(address, { type: "address" }),
            ]))
            .setTimeout(500)
            .build();

        console.log("Built transaction:", transaction);

        const preparedTransaction = await server.simulateTransaction(transaction);

        console.log("Prepared transaction:", preparedTransaction , "stakedassets");

        if (preparedTransaction && "result" in preparedTransaction) {
            const retval = preparedTransaction.result?.retval;
            if (retval) {
                return (Number(scValToNative(retval))).toFixed(4);
            } else {
                throw new Error("Result value is undefined");
            }
        } else {
            throw new Error("Simulation failed");
        }
    } catch (error) {
        console.error("Staking transaction failed:", error);
        throw error;
    }
};

export const isTrustlineRequired = async (assetCode: string, assetIssuer: string, wallet: AlbedoWallet) => {
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

        // Check if the asset is in the account's balances
        const asset = new Asset(assetCode, assetIssuer);
        const accountData = await fetch(`https://horizon-testnet.stellar.org/accounts/${address}`).then(res=> res.json())
        
        const hasTrustline = accountData?.balances.some((balance: { asset_code: string; asset_issuer: string; }) => 
            balance.asset_code === asset.getCode() && balance.asset_issuer === asset.getIssuer()
        );

        console.log(hasTrustline , assetCode)

        return hasTrustline; // Return true if trustline is required
    } catch (error) {
        console.error("Error checking trustline requirement:", error);
        throw error;  
    }
};

export const setTrustline = async (assetCode: string, assetIssuer: string, wallet: AlbedoWallet) => {
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

        const asset = new Asset(assetCode, assetIssuer);

        console.log(asset)

        // Create a transaction to set the trustline
        const transaction = new TransactionBuilder(account, {
            fee: '100',
            networkPassphrase: Networks.TESTNET,
        })
            .addOperation(
                Operation.changeTrust({
                    asset: asset,
                })     
            )
            .setTimeout(500)
            .build();

        console.log("Built transaction for trustline:", transaction);

        // const preparedTransaction = await server.prepareTransaction(transaction);
        // console.log("Prepared transaction for trustline:", preparedTransaction);

        const data = await wallet.signTransaction(transaction);
        console.log("Signed transaction for trustline:", data);

        // Submit the transaction
        // const result = await server.sendTransaction(preparedTransaction);
        // console.log("Trustline set successfully:", result);
        return data;
    } catch (error) {
        console.error("Setting trustline failed:", error);
        throw error;
    }
};


