import React from "react";
import { useState } from "react";
// import useFeeDelegation from "./useFeeDelegation";
import Receipt from "./Receipt";
import "./App.css";
import "./Receipt.css";

function App() {
  const [senderPrivateKey, setSenderPrivateKey] = useState("");
  const [destination, setDestination] = useState("");
  const [feePayerAddress, setFeePayerAddress] = useState("");
  const [feePayerPrivateKey, setFeePayerPrivateKey] = useState("");
  const [klayAmount, setKlayAmount] = useState(0);
  const [senderReceipt, setSenderReceipt] = useState(null);
  const [deployerReceipt, setDeployerReceipt] = useState(null);

  // const { signTransaction, sendTransaction, signDeployer, sendDeployer } = useFeeDelegation();

  const handleTransactions = async (e) => {
    e.preventDefault();

    const senderPrivateKey = document.getElementById("senderPrivateKey").value;
    const destination = document.getElementById("destination").value;
    const feePayerAddress = document.getElementById("feePayerAddress").value;
    const feePayerPrivateKey =
      document.getElementById("feePayerPrivateKey").value;
    const amountInKlay = document.getElementById("klayValue").value;

    if (
      !senderPrivateKey ||
      !destination ||
      !feePayerAddress ||
      !feePayerPrivateKey ||
      !amountInKlay
    ) {
      document.querySelector(".error").style.display = "block";
    } else {
      setSenderPrivateKey(senderPrivateKey);
      setDestination(destination);
      setFeePayerAddress(feePayerAddress);
      setFeePayerPrivateKey(feePayerPrivateKey);
      setKlayAmount(amountInKlay);

      // const rawTransaction =
      //   await signTransaction(
      //     senderPrivateKey,
      //     destination,
      //     amountInKlay
      //   );

      // const sendTransaction =
      //   await sendTransaction(
      //     rawTransaction,
      //     feePayerAddress,
      //     feePayerPrivateKey
      //   );

      // const deployerTransaction =
      //   await signDeployer(destination);

      // const deployerReceipt = await sendDeployer(
      //   feePayerAddress,
      //   feePayerPrivateKey,
      //   rawTransaction
      // );

      // setSenderReceipt(sendTransaction);
      // setDeployerReceipt(deployerReceipt)

      // console.log(sendTransaction, deployerReceipt);
      document.querySelector(".receiptContainer").style.display = "flex";
      // return [sendTransaction, deployerReceipt];
    }
  };

  const closeReceipt = () => {
    document.querySelector(".receiptContainer").style.display = "none";
  };

  return (
    <React.Fragment>
      <div className="App">
        <Receipt
          className="receiptProp"
          senderKey={senderPrivateKey}
          feePayerKey={feePayerPrivateKey}
          destination={destination}
          feePayerAddress={feePayerAddress}
          klay={klayAmount}
          senderReceipt={senderReceipt}
          deployerReceipt={deployerReceipt}
          closeReceipt={closeReceipt}
        />
        <form>
          <header>
            <h1>Fee Delegation</h1>
          </header>
          <div className="feeDelegationForm">
            <label htmlFor="senderPrivateKey">Sender Private Key:*</label>
            <input
              type="text"
              id="senderPrivateKey"
              name="senderPrivateKey"
              required
            ></input>
            <label htmlFor="destination">Destination:*</label>
            <input
              type="text"
              id="destination"
              name="destination"
              required
            ></input>
            <label htmlFor="feePayerAddress">Fee Payer Address:*</label>
            <input
              type="text"
              id="feePayerAddress"
              name="feePayerAddress"
              required
            ></input>
            <label htmlFor="feePayerPrivateKey">Fee Payer Private Key:*</label>
            <input
              type="text"
              id="feePayerPrivateKey"
              name="feePayerPrivateKey"
              required
            ></input>
            <label htmlFor="klayValue">Amount in Klay:*</label>
            <input
              type="number"
              id="klayValue"
              name="klayValue"
              required
            ></input>
            <button onClick={handleTransactions}>Send</button>
          </div>
          <span className="error">Please fill all the required details</span>
        </form>
      </div>
    </React.Fragment>
  );
}

export default App;
