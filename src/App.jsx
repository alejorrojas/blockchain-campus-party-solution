import { useState } from 'react'
import { ethers } from "ethers"
import contractABI from "../contracts/contract_abi.json"

const contractAddress = "0x0B2f7BBbb52a237aFd955A261760A20815aEf839"


function App() {
  const [data, setData] = useState({
    account: "No account available",
    balance: "",
    isConnected: false,
    contractValue: "",
    sendText: ""
  })

const provider= new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()
const contract = new ethers.Contract(contractAddress, contractABI, signer)

const connectWallet = async()=>{
    if(window.ethereum){
        console.log("yo got it")
          window.ethereum.request({method: 'eth_requestAccounts'})
          .then(response => (
            setData({...data, 
              isConnected: true,
              account: response[0],            
            })
            ))
    }
    else console.log("please install metamask");
}


  const getCurrentValue = async()=>{
    const contractValue = await contract.get()
    setData({...data, contractValue})
  }

  const handleSubmit = (event) => {
		event.preventDefault();
		console.log('sending ' + event.target.value + ' to the contract');
		contract.set(event.target.setText.value);
	}

  
  return (
    <div className="App">
      <div>
        <a>
          <img src="/token.png" className="logo" alt="Vite logo" />
        </a>
        <a>
          <img src="/react.svg" className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Ethereum + React</h1>
      <div className="card">
        <button onClick={()=>connectWallet()}>{data.isConnected ? "Disconnect wallet" : "Connect Wallet"}</button>
        <p>{data.account}</p>
        <p>{data.balance}</p>
      </div>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <input id="setText" type="text"/>
          <button type='submit'>SUBMIT</button>
        </form>
        <button onClick={()=>getCurrentValue()}>Get current value</button>
        <p>{data.contractValue}</p>
      </div>
    </div>
  )
}

export default App
