// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const OddEvenGame = buildModule("OddEvenGame", (m) => {
   const contract = m.contract("OddEvenGame");

  return { contract };
});

export default OddEvenGame;
