import { useState } from 'react'
import { ethers } from "ethers"
import contractABI from "../contracts/contract_abi.json"
import { contractAddress } from '../contracts/data'

const provider= new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()
const contract = new ethers.Contract(contractAddress, contractABI, signer)


function App() {
  const [account, setAccount] = useState("No account available")
  const [contractValue, setContractValue] = useState("")

const connectWallet = async()=>{
    if(window.ethereum){
        const respuesta = await window.ethereum.request({method: 'eth_requestAccounts'})
        setAccount(respuesta[0])
    }
    else window.open("https://metamask.io/download/", "_blank")
}


  const readBlockchain = async()=>{
    const contractValue = await contract.get()
    setContractValue(contractValue)
  }

  const writeBlockchain = (data) => {
		data.preventDefault();
		contract.set(data.target.userText.value);
	}

  
  return (
    <div className="App">
      <div>
          <img src="/token.png" className="logo"/>
          <img src="/react.svg" className="logo react"/>
      </div>
      
      <h1>Ethereum + React</h1>

      <div className="card">
        <button onClick={()=>connectWallet()}>Connect Wallet</button>
        <p>{account}</p>
      </div>
      <div className="card">
        <form onSubmit={writeBlockchain}>
          <input id="userText" />
          <button type='submit'>SUBMIT</button>
        </form>
        <button onClick={readBlockchain}>Get current value</button>
        <p>{contractValue}</p>
      </div>
    </div>
  )
}

export default App
