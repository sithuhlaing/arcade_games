import { FlappyConsts } from '../FlappyConsts';
import { CoreConsts } from '../../../core/CoreConsts';

export class GameOverScene extends Phaser.Scene {
    constructor() {
        super(FlappyConsts.SCENES.GAME_OVER);
    }

    create(data: { score: number }) {
        const { width, height } = this.scale;

        // Background
        this.add.tileSprite(0, 0, width, height, 'background')
            .setOrigin(0, 0);

        this.add.image(width / 2, height / 3, 'gameover').setOrigin(0.5);

        this.add.text(width / 2, height / 2, `Score: ${data.score || 0}`, {
            fontSize: '48px',
            color: '#fff',
            stroke: '#000',
            strokeThickness: 4
        }).setOrigin(0.5);

        this.add.text(width / 2, height * 2 / 3, 'Press SPACE to Restart', {
            fontSize: '32px',
            color: '#fff',
            stroke: '#000',
            strokeThickness: 4
        }).setOrigin(0.5);

        this.input.keyboard?.once('keydown-SPACE', () => {
            this.scene.start(FlappyConsts.SCENES.MAIN);
        });

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
