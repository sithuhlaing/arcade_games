---
name: phaser-flappy-skill
description: Specialized guidance for Phaser 3 + TypeScript game development within the Flappy Bird clone project. Use this skill when modifying bird mechanics, pipe spawning, or updating UI/Scenes.
---

# Phaser Flappy Bird Skill

## Overview
This skill provides structured workflows and references for extending the Flappy Bird clone. It focuses on maintaining architectural consistency across scenes, entities, and constants.

## Core Workflows

### 1. Modifying Bird Mechanics
To adjust how the bird behaves:
1.  **Physics Constants**: Update `GRAVITY` or `JUMP_VELOCITY` in `src/consts/GameConsts.ts`.
2.  **Entity Logic**: Modify `flap()` or `update()` in `src/entities/Bird.ts` (e.g., changing rotation speed or adding animations).

### 2. Adjusting Pipe Spawning
To change the obstacle difficulty:
1.  **Constants**: Update `PIPE_SPEED`, `PIPE_SPAWN_INTERVAL`, or `PIPE_GAP` in `src/consts/GameConsts.ts`.
2.  **Manager Logic**: Modify `spawnPipePair()` in `src/entities/PipeManager.ts` to change randomization ranges or pipe placement.

### 3. Updating UI & Scenes
- **Title/Game Over**: Update `MenuScene.ts` or `GameOverScene.ts` for visual changes or new buttons.
- **In-Game HUD**: Modify `create()` and `scoreText` management in `MainScene.ts`.
- **Assets**: Update `BootScene.ts` to change generated textures or load external images.

## Guidelines & References

For detailed information, refer to:
- **[Phaser Basics](references/phaser_basics.md)**: Common Phaser 3 + TypeScript patterns used in this project.
- **[Project Entities](references/project_entities.md)**: Details on the `Bird` and `PipeManager`.
- **[Project Scenes](references/project_scenes.md)**: Deep dive into the four-scene state machine.

## Quick Reference: Game Flow
- **Boot** -> Generates textures -> Starts **Menu**.
- **Menu** -> Listens for Space/Click -> Starts **Main**.
- **Main** -> Gameplay Loop -> On Collision -> Starts **GameOver**.
- **GameOver** -> Displays Score -> Starts **Main** on restart.
