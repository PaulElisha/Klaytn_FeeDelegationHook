import { useState, useCallback } from "react";

// Import the Caver library for interacting with the Klaytn blockchain
const Caver = require("caver-js");

const caver = new Caver("https://api.baobab.klaytn.net:8651"); // Use Baobab testnet

// React hood for handling fee delegation transactions
function useFeeDelegation() {
  // These states hold the transaction receip and transaction errors respectively
  const [transactionReceipt, setTranscationReciept] = useState(null);
  const [transactionError, setTransactionError] = useState(null);

  // Signs a transaction
  const handleSignTransaction = useCallback(
    async (senderPrivateKey, toAddress, valueInKLAY) => {
      try {
        const senderAddress =
          caver.klay.accounts.privateKeyToAddress(senderPrivateKey);

        // Sign transaction with sender's private key
        const { rawTransaction } = await caver.klay.accounts.signTransaction(
          {
            type: "FEE_DELEGATED_VALUE_TRANSFER",
            from: senderAddress,
            to: toAddress,
            gas: "300000",
            value: caver.utils.toPeb(valueInKLAY.toString(), "KLAY"),
          },
          senderPrivateKey
        );

        // Returns the raw signed transaction
        return rawTransaction;
      } catch (err) {
        // If an error occurs, the error state is set
        setTransactionError(err);
        return err;
      }
    },
    []
  );

  // Send the signed transaction with the fee payer's signature
  const handleSendTransaction = useCallback(
    async (rawTransaction, feePayerAddress, feePayerPrivateKey) => {
      try {
        // Add fee payer's account
        caver.klay.accounts.wallet.add(feePayerPrivateKey, feePayerAddress);

        // Send transaction with fee payer's signature
        const receipt = await caver.klay.sendTransaction({
          senderRawTransaction: rawTransaction,
          feePayer: feePayerAddress,
        });

        // Set the transaction receipt state if transaction successful
        setTranscationReciept(receipt);
        // Returns the transaction receipt
        return receipt;
      } catch (err) {
        // Sets error state if transaction error occurs
        setTransactionError(err);
        return err;
      }
    },
    []
  );

  const handleSignDeployer = useCallback(async (deployerAddress, data) => {
    try {
      const { rawTransaction } = await caver.klay.signTransaction({
        type: "FEE_DELEGATED_SMART_CONTRACT_DEPLOY",
        from: deployerAddress,
        data,
        gas: "1000000",
        value: caver.utils.toPeb("0", "KLAY"),
      });

      return rawTransaction;
    } catch (err) {
      setTransactionError(err);
      return err;
    }
  }, []);

  const handleSendDeployer = useCallback(
    async (feePayerAddress, feePayerPrivateKey, rawTransaction) => {
      try {
        const feePayerKeyring = caver.walllet.keyring.create(
          feePayerAddress,
          feePayerPrivateKey
        );
        caver.wallet.add(feePayerKeyring);

        await caver.wallet.signAsFeePayer(
          feePayerKeyring.address,
          rawTransaction
        );

        const receipt = await caver.rpc.klay.sendRawTransactions(
          rawTransaction
        );

        return receipt.contractAddress;
      } catch (err) {
        setTransactionError(err);
        return err;
      }
    },
    []
  );

  // Returns the states and functions from the hook for use in other components
  return {
    transactionReceipt,
    transactionError,
    signTransaction: handleSignTransaction,
    sendTransaction: handleSendTransaction,
    signDeployer: handleSignDeployer,
    sendDeployer: handleSendDeployer,
  };
}

export default useFeeDelegation;
