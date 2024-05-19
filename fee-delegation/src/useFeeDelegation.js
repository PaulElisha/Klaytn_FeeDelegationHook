import { useState, useCallback } from "react";

const Caver = require("caver-js");

const caver = new Caver("https://api.baobab.klaytn.net:8651"); // Use Baobab testnet

function useFeeDelegation() {
  const [transactionReceipt, setTranscationReciept] = useState(null);
  const [transactionError, setTransactionError] = useState(null);

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

        return rawTransaction;
      } catch (err) {
        setTransactionError(err);
      }
    },
    []
  );

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

        setTranscationReciept(receipt);
        return receipt;
      } catch (err) {
        setTransactionError(err);
      }
    },
    []
  );

  return {
    transactionReceipt,
    transactionError,
    handleSignTransaction: handleSignTransaction,
    sendTransaction: handleSendTransaction,
  };
}

export default useFeeDelegation;