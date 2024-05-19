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
  };
}

export default useFeeDelegation;
