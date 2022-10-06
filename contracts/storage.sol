//SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

contract simpleStorage {
    string public storedData;

    event myEventTest(string output);

    function set(string memory myText) public {
        storedData = myText;
        emit myEventTest(myText);
    }

    function get() public view returns (string memory) {
        return storedData;
    }
} 
