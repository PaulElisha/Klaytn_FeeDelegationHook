# Klaytn Fee Delegation

This project provides a custom React hook, `useFeeDelegation`, for handling fee delegation transactions on the Klaytn blockchain. The hook contains the logic for signing and sending transactions with fee delegation, making it easier to integrate these functionalities into your React applications.

## Features

- **Sign Transactions**: Sign transactions using a sender's private key.
- **Send Transactions**: Send signed transactions with a fee payer's signature.
- **Smart Contract Deployment**: Sign and send transactions for deploying smart contracts with fee delegation.

## Installation

First, install the necessary dependencies:

```bash
npm install
```

## Usage
First, import the module:
```js
import useFeeDelegation from './useFeeDelegation';
```
Within the module there are 4 available functions:
- signTransaction
- sendTransaction
- signDeployer
- sendDeployer

These fucntions can be accessed:
- **signTransaction**:
```js
useFeeDelegation.signTransaction.handleSignTransaction(senderPrivateKey, toAddress, valueInKLAY);
```

- **sendTransaction**:
```js
useFeeDelegation.sendTransaction.handleSendTransaction(rawTransaction, feePayerAddress, feePayerPrivateKey);
```

- **signDeployer**:
```js
useFeeDelegation.signDeployer.handleSignDeployer(deployerAddress, data);
```

- **sendDeployer**:
```js
useFeeDelegation.sendDeployer.handleSendDeployer(feePayerAddress, feePayerPrivateKey, rawTransaction);
```