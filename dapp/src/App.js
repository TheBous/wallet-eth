import "./tailwind.css"
import 'regenerator-runtime/runtime';

import { useEffect, useState } from "react";
import cx from "classnames";
import Web3 from 'web3/dist/web3.min.js';
import faucetABI from "../contracts/Faucet.json";

const App = () => {
  const [accounts, setAccounts] = useState([]);
  const [balance, setBalance] = useState(0);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      alert("No ethereum browser");
    }
  }

  useEffect(() => {
    const fetchAccounts = async () => {
      const accounts = await web3.eth.getAccounts();
      const [first] = accounts;
      const weiBalance = await web3.eth.getBalance(first);
      const etherBalance = web3.utils.fromWei(weiBalance, 'ether');
      setAccounts(accounts);
      setBalance(etherBalance);
      const { abi } = faucetABI;
      const faucetAddress = "0x6d321a03b16631515eF47E20aAD46fC3Fb18B21B";
      const faucetContract = new web3.eth.Contract(abi, faucetAddress);

      const txDetails = await web3.eth.sendTransaction({ from: accounts[0], to: faucetAddress, value: web3.utils.toWei("1", "ether") });
      const accountNonce = await web3.eth.getTransactionCount(accounts[0])
      const contractBalance = await web3.eth.getBalance(faucetContract.options.address);
      const withdrawAmount = web3.utils.toWei("0.08", "ether");
      if (withdrawAmount < contractBalance)
        await faucetContract.methods.withdraw(web3.utils.toWei("0.08", "ether")).call();
      else throw new Error("Contract balance < amount to withdraw");
    };
    const txDetails = web3.eth.getTransaction("0x342dcc219e4c210825fadbbc2eedad27ad01af76ceed2cdfa31869701107cce8")
    const provider = "http://localhost:5545/";
    const web3 = new Web3(provider);
    fetchAccounts();
  }, [])


  return (
    <div className="App bg-[#eee] h-[100vh] flex items-center justify-center flex-col">
      <h1 className="font-bold text-4xl text-[#333]">Hi 👋, Tailwind test.</h1>
      <p className="text-sm font-italic m-[3px]">
        Now you can use <code className="bg-[#ccc] p-[3px]">[]</code> to style
        your app
      </p>
      <>
        <h2 className="font-bold">Accounts list</h2>
        <ul className="accounts">
          {accounts.map((account, i) => {
            return (
              <li className={cx("item", {
                "font-bold": i === 0,
              })} key={account}>{account}</li>
            )
          })}
        </ul>
      </>
    </div>
  )
}

export default App
