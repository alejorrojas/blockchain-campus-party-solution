import contractABI from "./contract_abi.json"
import { ethers } from "ethers"

const contractAddress = "0x0B2f7BBbb52a237aFd955A261760A20815aEf839"
let provider
let signer 
export let contract 

if(window.ethereum){
     provider = new ethers.providers.Web3Provider(window.ethereum)
     signer = provider.getSigner()
     contract = new ethers.Contract(contractAddress, contractABI, signer)
}