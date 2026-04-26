import 'phaser';
import { CoreConsts } from './core/CoreConsts';
import { BootScene } from './core/scenes/BootScene';
import { GameSelectScene } from './core/scenes/GameSelectScene';
import { FlappyBootScene } from './games/flappy/scenes/FlappyBootScene';
import { MenuScene as FlappyMenuScene } from './games/flappy/scenes/MenuScene';
import { MainScene as FlappyMainScene } from './games/flappy/scenes/MainScene';
import { GameOverScene as FlappyGameOverScene } from './games/flappy/scenes/GameOverScene';
import { BreakoutBootScene } from './games/breakout/scenes/BreakoutBootScene';
import { BreakoutMenuScene } from './games/breakout/scenes/BreakoutMenuScene';
import { BreakoutMainScene } from './games/breakout/scenes/BreakoutMainScene';
import { BreakoutGameOverScene } from './games/breakout/scenes/BreakoutGameOverScene';

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: CoreConsts.CANVAS_WIDTH,
    height: CoreConsts.CANVAS_HEIGHT,
    parent: 'game-container',
    backgroundColor: '#4ec0ca',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 0 },
            debug: false
        }
    },
    scene: [
        BootScene, 
        GameSelectScene, 
        FlappyBootScene, 
        FlappyMenuScene, 
        FlappyMainScene, 
        FlappyGameOverScene,
        BreakoutBootScene,
        BreakoutMenuScene,
        BreakoutMainScene,
        BreakoutGameOverScene
    ]
};

new Phaser.Game(config);
