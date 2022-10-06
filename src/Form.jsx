import React, { useState } from "react";
import { contract } from "../contracts/utils";

const Form = () => {
  const [contractValue, setContractValue] = useState("");

  const readBlockchain = async () => {
    const contractValue = await contract.get();
    setContractValue(contractValue);
  };

  const writeBlockchain = (data) => {
    data.preventDefault();
    contract.set(data.target.userText.value);
  };

  return (
    <>
      <form onSubmit={writeBlockchain}>
        <input id="userText" />
        <button type="submit">SUBMIT</button>
      </form>
      <button onClick={readBlockchain}>Get current value</button>
      <p>{contractValue}</p>
    </>
  );
};

export default Form;
