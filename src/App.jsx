import { useState } from "react";
import Form from "./Form";

function App() {
  const [account, setAccount] = useState("No account available");

  const connectWallet = async () => {
    if (window.ethereum) {
      const respuesta = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(respuesta[0]);
    } else window.open("https://metamask.io/download/", "_blank");
  };

  return (
    <div className="App">
      <div>
        <img src="/token.png" className="logo" />
        <img src="/react.svg" className="logo react" />
      </div>

      <h1>Ethereum + React</h1>

      <button onClick={() => connectWallet()}>Connect Wallet</button>
      <p>{account}</p>

      <Form/>
    </div>
  );
}

export default App;
