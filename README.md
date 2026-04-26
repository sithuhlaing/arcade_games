# Arcade Collection

A collection of classic arcade games built with Phaser 3 and TypeScript.

## Games Included
- **Flappy Bird Clone**: Navigate through pipes and try to get the highest score.
- **Breakout Clone**: Destroy all the bricks using a ball and a paddle.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or later recommended)
- npm (comes with Node.js)

### Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally
To start the development server:
```bash
npm start
```
The game will be available at `http://localhost:8080`.

### Building for Production
To build the project for production:
```bash
npm run build
```
The output will be in the `dist/` directory.

## Testing
To run tests using Playwright:
```bash
npm test
```

## Deployment
This project is set up to automatically deploy to GitHub Pages when changes are pushed to the `main` or `master` branch.

## Built With
- [Phaser 3](https://phaser.io/) - Game Framework
- [TypeScript](https://www.typescriptlang.org/) - Scripting Language
- [Webpack](https://webpack.js.org/) - Module Bundler
- [Playwright](https://playwright.dev/) - End-to-End Testing Framework
