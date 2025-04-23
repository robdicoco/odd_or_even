import hre from "hardhat";
import ABI from "./oddEvenGame.abi.json";

async function main() {
  // Deploy the OddEvenGame contract
  const OddEvenGame = await hre.ethers.getContractFactory("OddEvenGame");
  const oddEvenGame = await OddEvenGame.deploy();
  await oddEvenGame.waitForDeployment();

  // Get the deployed contract address
  const contractAddress = await oddEvenGame.getAddress();
  console.log(`OddEvenGame deployed at: ${contractAddress.toLowerCase()}`);

  // Get the signer (default account)
  const [signer] = await hre.ethers.getSigners();

  // Create a contract instance
  const contract = new hre.ethers.Contract(contractAddress, ABI, signer);

  // Fetch initial game data
  let gameData = await contract.gameData();
  console.log("Initial Game Data:", {
    choiceP1: gameData.choiceP1.toString(),
    numberP1: gameData.numberP1.toString(),
    numberP2: gameData.numberP2.toString(),
    lastWinner: gameData.lastWinner.toString(),
  });

  // Initialize the game with Player 1's choice and number
  const player1Choice = 1; // 1 for Even, 2 for Odd
  const player1Number = 5; // Number between 1 and 10
  const initTx = await contract.initGame(player1Choice, player1Number);
  await initTx.wait();

  console.log("Game Initialized with Player 1's Choice and Number");

  // Fetch updated game data after initialization
  gameData = await contract.gameData();
  console.log("Updated Game Data After Initialization:", {
    choiceP1: gameData.choiceP1.toString(),
    numberP1: gameData.numberP1.toString(),
    numberP2: gameData.numberP2.toString(),
    lastWinner: gameData.lastWinner.toString(),
  });

  // Play the game with Player 2's number
  const player2Number = 6; // Number between 1 and 10
  const playTx = await contract.playGame(player2Number);
  await playTx.wait();

  console.log("Game Played with Player 2's Number");

  // Fetch the last game data after playing the game
  const lastGameData = await contract.lastGameData();
  console.log("Last Game Data:", {
    choiceP1: lastGameData.choiceP1.toString(),
    numberP1: lastGameData.numberP1.toString(),
    numberP2: lastGameData.numberP2.toString(),
    lastWinner: lastGameData.lastWinner.toString(),
  });

  // Determine the winner
  const winner = lastGameData.lastWinner.toString();
  if (winner === "1") {
    console.log("Player 1 Wins!");
  } else if (winner === "2") {
    console.log("Player 2 Wins!");
  } else {
    console.log("No Winner Yet");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});