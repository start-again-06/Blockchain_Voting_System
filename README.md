# Blockchain Voting DApp

**Decentralized Voting Platform with Live Dashboard**

## Overview

This project is a full-stack blockchain voting system designed to provide secure, transparent, and tamper-proof elections. It integrates a React/TypeScript frontend, Node.js backend, Ethereum smart contracts, and deployment scripts to offer a complete end-to-end voting solution.

The system allows users to vote using blockchain wallets, ensures one vote per user, and provides real-time results via a live dashboard.

## Core Idea

The Voting DApp combines multiple layers of technology to create a trustless election experience:

- **Frontend:** User interface for wallet connection, voting, and result visualization  
- **Backend:** Handles optional off-chain processing, logging, and interactions with the smart contract  
- **Smart Contracts:** Core decentralized logic for candidate management, voting, and vote counting  
- **Scripts:** Deployment, testing, and contract interaction automation  

The project emphasizes security, modularity, and extensibility, allowing future upgrades or new features.

## System Capabilities

### User Interaction
- Connect Ethereum-compatible wallets (e.g., MetaMask)  
- Cast votes securely on-chain  
- View live election results in real-time  

### Administration
- Deploy elections with a predefined list of candidates  
- Query votes per candidate and total candidates  

### Blockchain Logic
- Immutable and transparent voting records  
- Single-vote enforcement using wallet addresses  
- Gas-efficient and secure smart contract design  

### Backend Features
- Optional off-chain vote indexing and logging  
- Interaction with smart contracts using ethers.js  
- API endpoints for frontend consumption  

### Scripts and Automation
- Smart contract deployment  
- Contract interaction and testing  
- Environment variable configuration for network and wallet setup  

## Architecture Overview

```mermaid
flowchart TD
    A[Frontend (React/TypeScript)] --> B[Backend (Node.js + Express)]
    B --> C[Smart Contracts (Solidity, Hardhat)]
    C --> D[Ethereum-compatible Blockchain (Local/Testnet/Mainnet)]
```

## Design Principles
- **Security-first:** single-vote enforcement and immutable vote storage  
- **Transparency:** votes and results fully auditable on-chain  
- **Modularity:** separate layers for frontend, backend, contracts, and scripts  
- **Developer-friendly:** clear code structure and reusable utilities  

## Workflow Summary
1. Administrator deploys `VotingContract` with candidate list  
2. Users connect their wallets to the frontend  
3. Users cast votes, which update the smart contract on-chain  
4. Backend optionally logs votes for analytics or auditing  
5. Frontend dashboard displays live voting results  

## Technology Stack
- **Frontend:** React, TypeScript, TailwindCSS, ethers.js  
- **Backend:** Node.js, Express, ethers.js  
- **Blockchain:** Ethereum-compatible networks  
- **Smart Contracts:** Solidity ^0.8.20, Hardhat  
- **Testing:** Mocha, Chai  
- **Deployment:** Hardhat scripts, environment variable configuration  

## Intended Use Cases
- Decentralized elections for organizations or communities  
- Blockchain-based surveys or polls  
- Educational purposes for learning full-stack DApp development  
- Prototyping secure and transparent voting systems  

## Getting Started
1. Clone the repository  
2. Set up `.env` files for frontend, backend, and scripts  
3. Install dependencies for each folder (`npm install`)  
4. Deploy smart contracts using Hardhat scripts  
5. Run frontend and backend locally or on your preferred hosting  

## License
This project is licensed under the MIT License.

