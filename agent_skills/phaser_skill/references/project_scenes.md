# Project Scenes

## BootScene.ts
- Generates procedural textures using `this.make.graphics()`.
- Textures: `'bird'` (yellow circle with eye), `'pipe'` (green rectangle).
- Immediately transitions to `MenuScene`.

## MenuScene.ts
- Displays the game title and start instructions.
- Listens for `Spacebar` or `PointerDown` to start the game.

## MainScene.ts
- The primary gameplay hub.
- **Initialization**: Sets up `Bird`, `PipeManager`, and `scoreText`.
- **Input**: Maps `Spacebar` and `PointerDown` to the bird's `flap()` method.
- **Colliders**: Handles collision between the bird and pipes.
- **Update Loop**: 
    - Calls `update()` on bird and pipe manager.
    - Monitors pipes for scoring (when they pass the bird's X position).
    - Transitions to `GameOverScene` upon collision.

## GameOverScene.ts
- Receives the final `score` from `MainScene`.
- Displays "GAME OVER", the score, and restart instructions.
- Listens for `Spacebar` or `PointerDown` to restart `MainScene`.
