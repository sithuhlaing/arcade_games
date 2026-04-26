# Project Entities (Bird & Pipes)

## The Bird
- Located in `src/entities/Bird.ts`.
- Extends `Phaser.Physics.Arcade.Sprite`.
- **Properties**:
    - `setGravityY(GameConsts.GRAVITY)`: Constant downward pull.
- **Methods**:
    - `flap()`: Applies `GameConsts.JUMP_VELOCITY` to the Y axis.
    - `update()`: Rotates the bird sprite based on its current vertical velocity.
- **Events**:
    - Emits `'die'` when hitting the world bounds (floor/ceiling).

## The Pipe Manager
- Located in `src/entities/PipeManager.ts`.
- Manages a `Phaser.Physics.Arcade.Group` of pipe segments.
- **Logic**:
    - Uses a `Phaser.Time.TimerEvent` to spawn pipes at regular intervals (`PIPE_SPAWN_INTERVAL`).
    - `spawnPipePair()`: Creates two pipes with a vertical gap (`PIPE_GAP`) at a randomized Y position.
    - `update()`: Checks for pipes that have moved off-screen and destroys them to save memory.
    - `stop()`: Halts spawning and stops all moving pipes (used on Game Over).

## Physics Interactions
- **Collisions**: Defined in `MainScene.ts` via `this.physics.add.collider(this.bird, this.pipeManager.group, ...)`.
- **Scoring**: `MainScene.ts` checks if the bird's X position has passed a pipe's right edge to increment the score.
