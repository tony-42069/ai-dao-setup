# Tech Context

## Core Technologies
1. Blockchain
   - Ethereum
   - Solidity 0.8.19
   - Web3.js
   - Hardhat

2. AI Framework
   - TypeScript
   - Jest
   - Node.js
   - EventEmitter

3. Frontend
   - Next.js 14
   - Tailwind CSS
   - Framer Motion
   - TypeScript

## Development Setup
1. Environment
   - Node.js 18+
   - Yarn package manager
   - TypeScript 5+
   - ESLint and Prettier

2. Testing
   - Jest for unit tests
   - Hardhat for smart contract tests
   - Integration testing framework

3. Tooling
   - VSCode as primary IDE
   - Git for version control
   - Vercel for frontend deployment
   - CI/CD pipeline setup

## Dependencies
1. Blockchain
   - @openzeppelin/contracts
   - hardhat
   - web3.js

2. AI Framework
   - typescript
   - jest
   - events

3. Frontend
   - next
   - react
   - tailwindcss
   - framer-motion

## TypeScript Configuration
- Each package has its own tsconfig.json
- Base configuration extends from root tsconfig.json
- Strict type checking enabled
- Cross-package imports handled through path aliases:
  * @governance/* maps to governance package
  * @agents/* maps to agents package
- Root directory set to project root level
- Include patterns cover all relevant package files
