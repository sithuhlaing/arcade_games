import { FlappyConsts } from '../FlappyConsts';
import { CoreConsts } from '../../../core/CoreConsts';

export class MenuScene extends Phaser.Scene {
    constructor() {
        super(FlappyConsts.SCENES.MENU);
    }

    create() {
        const { width, height } = this.scale;

        // Background
        this.add.tileSprite(0, 0, width, height, 'background')
            .setOrigin(0, 0);

        this.add.image(width / 2, height / 2, 'message').setOrigin(0.5);

        this.add.text(width / 2, height / 3 - 50, 'FLAPPY BIRD', {
            fontSize: '64px',
            color: '#fff',
            fontStyle: 'bold',
            stroke: '#000',
            strokeThickness: 8
        }).setOrigin(0.5);

        this.add.text(width / 2, height / 2 + 50, 'Press SPACE to Flap', {
            fontSize: '32px',
            color: '#fff',
            stroke: '#000',
            strokeThickness: 4
        }).setOrigin(0.5);

        this.input.keyboard?.once('keydown-SPACE', () => {
            this.scene.start(FlappyConsts.SCENES.MAIN);
        });

        // Also allow clicking to start
        this.input.once('pointerdown', () => {
            this.scene.start(FlappyConsts.SCENES.MAIN);
        });

        // Back to selection button
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
