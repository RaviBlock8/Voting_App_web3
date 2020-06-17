import React from "react";
import Web3 from "web3";
import { ethers } from "ethers";
import { Contract } from "ethers";

const loadWeb3 = async (): Promise<void> => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
  } else {
    throw new Error("web3 is not present");
  }
};

const getAccount = async (): Promise<string | undefined> => {
  const web3 = window.web3;
  const accounts = await web3.eth.getAccounts();
  if (!accounts[0]) {
    throw new Error("accounts not loaded");
  } else {
    return accounts[0];
  }
};

const loadingContract = async (
  abi: string,
  address: string
): Promise<Contract | undefined> => {
  try {
    const web3 = window.web3;
    const providers = new ethers.providers.Web3Provider(web3.currentProvider);
    const votingContract = new ethers.Contract(
      address,
      abi,
      providers.getSigner(0)
    );
    await votingContract.deployed();
    return votingContract;
  } catch (err) {
    console.log(err);
    throw new Error("cant load contract");
  }
};

export { loadWeb3, getAccount, loadingContract };
