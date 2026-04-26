import { BreakoutConsts } from '../BreakoutConsts';
import { CoreConsts } from '../../../core/CoreConsts';

export class BreakoutMenuScene extends Phaser.Scene {
    constructor() {
        super(BreakoutConsts.SCENES.MENU);
    }

    create() {
        const { width, height } = this.scale;

        // Background
        this.add.rectangle(0, 0, width, height, 0x000000).setOrigin(0, 0);

        this.add.text(width / 2, height / 3, 'BREAKOUT', {
            fontSize: '64px',
            color: '#fff',
            fontStyle: 'bold',
            stroke: '#000',
            strokeThickness: 8
        }).setOrigin(0.5);

        this.add.text(width / 2, height / 2, 'Click or Space to Launch Ball\nArrows to Move Paddle', {
            fontSize: '24px',
            color: '#fff',
            align: 'center',
            stroke: '#000',
            strokeThickness: 4
        }).setOrigin(0.5);

        this.add.text(width / 2, height * 2 / 3, 'Press SPACE to Start', {
            fontSize: '32px',
            color: '#fff',
            stroke: '#000',
            strokeThickness: 4
        }).setOrigin(0.5);

        this.input.keyboard?.once('keydown-SPACE', () => {
            this.scene.start(BreakoutConsts.SCENES.MAIN);
        });

        this.input.once('pointerdown', () => {
            this.scene.start(BreakoutConsts.SCENES.MAIN);
        });

        // Back button
        const backBtn = this.add.text(width / 2, height - 50, '< Back to Games', {
            fontSize: '24px',
            color: '#fff',
            stroke: '#000',
            strokeThickness: 3
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        backBtn.on('pointerdown', () => {
            this.scene.start(CoreConsts.SCENES.GAME_SELECT);
        });
    }
}
