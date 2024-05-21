import React, { Component } from "react";
import "./Receipt.css";

export default class Receipt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      senderKey: props.senderKey,
      feePayerKey: props.feePayerKey,
      destination: props.destination,
      feePayerAddress: props.feePayerAddress,
      klay: props.klay,
      senderReceipt: props.senderReceipt,
      deployerReceipt: props.deployerReceipt,
    };
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.senderKey !== this.props.senderKey ||
      prevProps.feePayerKey !== this.props.feePayerKey ||
      prevProps.destination !== this.props.destination ||
      prevProps.feePayerAddress !== this.props.feePayerAddress ||
      prevProps.klay !== this.props.klay ||
      prevProps.senderReceipt !== this.props.senderReceipt ||
      prevProps.deployerReceipt !== this.props.deployerReceipt
    ) {
      this.setState({
        senderKey: this.props.senderKey,
        feePayerKey: this.props.feePayerKey,
        destination: this.props.destination,
        feePayerAddress: this.props.feePayerAddress,
        klay: this.props.klay,
        senderReceipt: this.props.senderReceipt,
        deployerReceipt: this.props.deployerReceipt,
      });
    }
  }

  render() {
    return (
      <div className="receiptContainer">
        <div className="receipt">
          <h1>Transaction Receipt</h1>
          <h3>Details</h3>
          <p>
            <span>Sender's Private Key:</span>
            {this.state.senderKey}
          </p>
          <p>
            <span>Fee Payer Private Key:</span>
            {this.state.feePayerKey}
          </p>
          <p>
            <span>Destination Address:</span>
            {this.state.destination}
          </p>
          <p>
            <span>Fee Payer Address</span>
            {this.state.feePayerAddress}
          </p>
          <p>
            <span>Klay Amount:</span>
            {this.state.klay}
          </p>
          <h3>Sender's Receipt</h3>
          <p>{this.state.senderReceipt}</p>
          <h3>Deployer's Receipt</h3>
          <span onClick={this.state.closeReceipt} className="close">
            Close
          </span>
        </div>
      </div>
    );
  }
}
