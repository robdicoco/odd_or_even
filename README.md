# OddEvenGame

The **OddEvenGame** is a simple Ethereum-based smart contract game where two players compete to guess whether the sum of their chosen numbers will be odd or even. Player 1 initializes the game by choosing "Odd" or "Even" and providing a number between 1 and 10. Player 2 then chooses a number, and the winner is determined based on the parity of the sum.

This project includes:
- A Solidity smart contract (`contracts/OddEvenGame.sol`) implementing the game logic.
- A Hardhat development environment configured via `hardhat.config.ts` for local and custom network deployments.
- TypeScript configuration (`tsconfig.json`) and generated TypeChain types (`typechain-types/`).
- Comprehensive unit tests (`test/OddEvenGame.ts`) using Hardhat and Chai.
- Deployment scripts (`scripts/deploy.ts`) and Hardhat Ignition modules (`ignition/modules/OddEvenGame.ts`) for contract deployment.
- An interaction script (`scripts/interact.ts`) and ABI file (`scripts/oddEvenGame.abi.json`) for contract interaction.
- Useful npm scripts for testing, deployment, interaction, linting, and coverage.

---

## Table of Contents

1. [How It Works](#how-it-works)
2. [Prerequisites](#prerequisites)
3. [Setup](#setup)
4. [Interacting with the Contract](#interacting-with-the-contract)
5. [Running Tests](#running-tests)
6. [Deployment](#deployment)
7. [Contributing](#contributing)
8. [License](#license)

---

## How It Works

### Game Rules
1. **Player 1 Initialization**:
   - Player 1 chooses either "Odd" (`2`) or "Even" (`1`).
   - Player 1 also selects a number between 1 and 10.

2. **Player 2 Gameplay**:
   - Player 2 selects a number between 1 and 10.

3. **Winner Determination**:
   - The sum of Player 1's and Player 2's numbers is calculated.
   - If the sum matches Player 1's choice (Odd or Even), Player 1 wins. Otherwise, Player 2 wins.

### Example Scenarios
- **Scenario 1**: Player 1 chooses "Even" and picks `4`. Player 2 picks `6`. The sum is `10` (Even). Player 1 wins.
- **Scenario 2**: Player 1 chooses "Odd" and picks `5`. Player 2 picks `6`. The sum is `11` (Odd). Player 1 wins.
- **Scenario 3**: Player 1 chooses "Even" and picks `3`. Player 2 picks `4`. The sum is `7` (Odd). Player 2 wins.

---

## Prerequisites

To run this project locally, you need the following:

- **Node.js**: Install Node.js (v16 or higher) from [https://nodejs.org](https://nodejs.org).
- **Hardhat**: This project uses Hardhat for development and testing.
- **Yarn or npm**: Package manager for installing dependencies.
- **Metamask or Local Testnet**: For deploying and interacting with the contract.

---

## Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repo/oddeven-game.git
   cd oddeven-game
   ```

2.  **Install Dependencies** :
    

```bash
yarn install
```
or
 ```bash   
npm install
```
3.  **Start a Local Hardhat Node** : Run a local Ethereum testnet using Hardhat:
    
```bash
npx hardhat node
```
    
4. **Compile the Contract** : Compile the Solidity contract:
    
```bash
npx hardhat compile
```

5. **Generate TypeScript Types** : Generate TypeScript types from the compiled contract artifacts:
    
```bash
npm run typechain
```

6. **Available Scripts**:
- `npm run test` – Run the test suite.
- `npm run lint` – Lint the codebase.
- `npm run coverage` – Generate a test coverage report.
- `npm run deploy:local` – Deploy the contract on a local network.
- `npm run interact:local` – Run the interaction script against the local deployment.
- `npm run deploy:ign` – Deploy the contract using Hardhat Ignition modules.
- `npm run clean` – Remove Hardhat artifacts.
- `npm run clean:all` – Remove all build and TypeChain artifacts.

----------

## Interacting with the Contract

Use the provided `scripts/interact.ts` script to interact with the `OddEvenGame` contract.

1.  **Run the Interaction Script** :
    
```bash
npx hardhat run scripts/interact.ts --network localhost
```
    
2.  **Expected Output** : The script initializes the game, plays it, and logs the results:
    

```bash
OddEvenGame deployed at: 0x...
Initial Game Data: { choiceP1: '0', numberP1: '0', numberP2: '0', lastWinner: '0' }
Game Initialized with Player 1\'s Choice and Number
Updated Game Data After Initialization: { choiceP1: '1', numberP1: '5', numberP2: '0', lastWinner: '0' }
Game Played with Player 2's Number
Last Game Data: { choiceP1: '1', numberP1: '5', numberP2: '6', lastWinner: '2' }
Player 2 Wins!
```    
   

----------

## Running Tests

The project includes a comprehensive test suite using Hardhat and Chai.

1.  **Run All Tests** :
    
```bash
npx hardhat test
```
    
2.  **Test Coverage** : Ensure all edge cases are covered:
    
    -   Initialization with invalid inputs.
    -   Gameplay with invalid inputs.
    -   Correct determination of winners in various scenarios.
    -   Resetting game fields after a round.

----------

## Deployment

Deploy the `OddEvenGame` contract to a testnet or mainnet.

1.  **Update Hardhat Configuration** : Add your desired network configuration (e.g., Goerli, Sepolia) to `hardhat.config.ts`.
    
2.  **Deploy the Contract** : Use the following command to deploy:
    
```bash
npx hardhat run scripts/deploy.ts --network <network-name>
```
    
    
3.  **Verify the Contract** : Verify the contract on Etherscan:
    
```bash
npx hardhat verify --network <network-name> <contract-address>
```

    

----------

## Contributing

We welcome contributions to improve the **OddEvenGame** project! To contribute:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix:
    
```bash
git checkout -b feature/your-feature-name
```
    
3.  Commit your changes:
    
```bash
git commit -m "Add your commit message here"
```

    
4.  Push your branch:
    
```bash
git push origin feature/your-feature-name
```
    
    
    
5.  Open a pull request.

----------

## License

This project is licensed under the **MIT License** . See the [LICENSE](https://chat.qwen.ai/c/LICENSE) file for details.

----------

## Acknowledgments

-   Built using [Hardhat](https://hardhat.org/) for Ethereum development.
-   Inspired by simple on-chain games for educational purposes.