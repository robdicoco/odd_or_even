import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";

type GameData = {
  choiceP1: number; 
  numberP1: number; 
  numberP2: number; 
  lastWinner: number; 
};

function fetchGameData(rawGameData: any) {
  
  const gameData: GameData = {
    choiceP1: Number(rawGameData[0]),
    numberP1: Number(rawGameData[1]),
    numberP2: Number(rawGameData[2]),
    lastWinner: Number(rawGameData[3])
   };
  return gameData;
}


describe("OddEvenGame", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {

    const [player1, player2] = await hre.ethers.getSigners();

    const OddEvenGame = await hre.ethers.getContractFactory("OddEvenGame");
    const oddEvenGame = await OddEvenGame.deploy();

    return { oddEvenGame, player1, player2 };
  }

  it("Should Have No Player", async function () {
    const { oddEvenGame, player1, player2 } = await loadFixture(deployFixture);
    const gameData = fetchGameData(await oddEvenGame.gameData());
    expect(gameData.choiceP1).to.equal(0);
  });

  
  it("Should not Init (Wrong Choice)", async function () {
    const { oddEvenGame, player1, player2 } = await loadFixture(deployFixture);
    //const gameData = fetchGameData(await parOuImpar.gameData());
    await expect(oddEvenGame.initGame(3, 1)).to.be.revertedWith("Choose 1 or 2");
  });

  it("Should not Init (Wrong Number)", async function () {
    const { oddEvenGame, player1, player2 } = await loadFixture(deployFixture);
    //const gameData = fetchGameData(await parOuImpar.gameData());
    await expect(oddEvenGame.initGame(1, 0)).to.be.revertedWith("Number choice must be between 1 and 10");
  });

  it("Should Init Game", async function () {
    const { oddEvenGame, player1, player2 } = await loadFixture(deployFixture);

    await oddEvenGame.initGame(2, 5);

    const gameData = fetchGameData(await oddEvenGame.gameData());

    expect(gameData.choiceP1).to.not.equal(0);
       
    //await expect(parOuImpar.initGame(1, 0)).to.be.revertedWith("Number choice must be between 1 and 10");
  });


  it("Should not Play Game (Choice == 0)", async function () {
    const { oddEvenGame, player1, player2 } = await loadFixture(deployFixture);

    await oddEvenGame.initGame(2, 5);

    const gameData = fetchGameData(await oddEvenGame.gameData());

    expect(gameData.choiceP1).to.not.equal(0);
       
    //await expect(parOuImpar.initGame(1, 0)).to.be.revertedWith("Number choice must be between 1 and 10");
  });

  it("Should not Play Game (Wrong Number)", async function () {
    const { oddEvenGame, player1, player2 } = await loadFixture(deployFixture);

    await oddEvenGame.initGame(2, 5);

    //const gameData = fetchGameData(await parOuImpar.gameData());

    //expect(gameData.choiceP1).to.not.equal(0);
       
    await expect(oddEvenGame.playGame(11)).to.be.revertedWith("Choose a number between 1 and 10");
  });


  it("Should Play Game (Winner P2)", async function () {
    const { oddEvenGame } = await loadFixture(deployFixture);

    await oddEvenGame.initGame(1, 5); // Player 1 chooses Even
    await oddEvenGame.playGame(6); // Sum = 11 (Odd)

    const lastGameData = fetchGameData(await oddEvenGame.lastGameData());
    expect(lastGameData.lastWinner).to.equal(2); // Player 2 wins
});



  it("Should reset game fields after a game is played", async function () {
    const { oddEvenGame } = await loadFixture(deployFixture);

    await oddEvenGame.initGame(1, 5);
    await oddEvenGame.playGame(6);

    const gameData = fetchGameData(await oddEvenGame.gameData());
    expect(gameData.choiceP1).to.equal(0);
    expect(gameData.numberP1).to.equal(0);
    expect(gameData.numberP2).to.equal(0);
    expect(gameData.lastWinner).to.equal(0);
  });

  it("Should not allow playing without initializing the game", async function () {
    const { oddEvenGame } = await loadFixture(deployFixture);

    await expect(oddEvenGame.playGame(5)).to.be.revertedWith(
      "first choose your option: 1 = even, 2 = odd!"
    );
  });

  it("Should correctly determine winner when Player 1 chooses Even and wins", async function () {
    const { oddEvenGame } = await loadFixture(deployFixture);

    await oddEvenGame.initGame(1, 4); // Player 1 chooses Even
    await oddEvenGame.playGame(2); // Sum = 6 (Even)

    const lastGameData = fetchGameData(await oddEvenGame.lastGameData());
    expect(lastGameData.lastWinner).to.equal(1);
  });

  it("Should correctly determine winner when Player 1 chooses Odd and wins", async function () {
    const { oddEvenGame } = await loadFixture(deployFixture);

    await oddEvenGame.initGame(2, 3); // Player 1 chooses Odd
    await oddEvenGame.playGame(4); // Sum = 7 (Odd)

    const lastGameData = fetchGameData(await oddEvenGame.lastGameData());
    expect(lastGameData.lastWinner).to.equal(1);
  });

  it("Should correctly determine winner when Player 2 wins with an Even sum", async function () {
    const { oddEvenGame } = await loadFixture(deployFixture);

    await oddEvenGame.initGame(2, 5); // Player 1 chooses Odd
    await oddEvenGame.playGame(3); // Sum = 8 (Even)

    const lastGameData = fetchGameData(await oddEvenGame.lastGameData());
    expect(lastGameData.lastWinner).to.equal(2);
  });


  it("Should correctly determine winner when Player 2 wins with an Odd sum", async function () {
    const { oddEvenGame } = await loadFixture(deployFixture);

    await oddEvenGame.initGame(1, 5); // Player 1 chooses Even
    await oddEvenGame.playGame(4); // Sum = 9 (Odd)

    const lastGameData = fetchGameData(await oddEvenGame.lastGameData());
    expect(lastGameData.lastWinner).to.equal(2); // Player 1 wins
});

  it("Should store the last game data correctly", async function () {
    const { oddEvenGame } = await loadFixture(deployFixture);

    await oddEvenGame.initGame(1, 5);
    await oddEvenGame.playGame(6);

    const lastGameData = fetchGameData(await oddEvenGame.lastGameData());
    expect(lastGameData.choiceP1).to.equal(1);
    expect(lastGameData.numberP1).to.equal(5);
    expect(lastGameData.numberP2).to.equal(6);
    expect(lastGameData.lastWinner).to.equal(2);
  });

  it("Should reject invalid choice values during initialization", async function () {
    const { oddEvenGame } = await loadFixture(deployFixture);

    await expect(oddEvenGame.initGame(3, 5)).to.be.revertedWith(
      "Choose 1 or 2"
    );
  });

  it("Should reject out-of-range numbers during initialization", async function () {
    const { oddEvenGame } = await loadFixture(deployFixture);

    await expect(oddEvenGame.initGame(1, 11)).to.be.revertedWith(
      "Number choice must be between 1 and 10"
    );
  });

  it("Should reject out-of-range numbers during gameplay", async function () {
    const { oddEvenGame } = await loadFixture(deployFixture);

    await oddEvenGame.initGame(1, 5);
    await expect(oddEvenGame.playGame(11)).to.be.revertedWith(
      "Choose a number between 1 and 10"
    );
  });

  it("Should handle consecutive games correctly", async function () {
    const { oddEvenGame } = await loadFixture(deployFixture);

    // First game
    await oddEvenGame.initGame(1, 4);
    await oddEvenGame.playGame(2); // Player 1 wins
    let lastGameData = fetchGameData(await oddEvenGame.lastGameData());
    expect(lastGameData.lastWinner).to.equal(1);

    // Second game
    await oddEvenGame.initGame(2, 3);
    await oddEvenGame.playGame(4); // Player 1 wins
    lastGameData = fetchGameData(await oddEvenGame.lastGameData());
    expect(lastGameData.lastWinner).to.equal(1);
  });

  it("Should handle edge case where both players choose the same number", async function () {
    const { oddEvenGame } = await loadFixture(deployFixture);

    await oddEvenGame.initGame(1, 5);
    await oddEvenGame.playGame(5); // Sum = 10 (Even)

    const lastGameData = fetchGameData(await oddEvenGame.lastGameData());
    expect(lastGameData.lastWinner).to.equal(1); // Player 1 wins
  });
});
