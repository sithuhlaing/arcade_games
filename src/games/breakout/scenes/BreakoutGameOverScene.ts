import { BreakoutConsts } from '../BreakoutConsts';
import { CoreConsts } from '../../../core/CoreConsts';

export class BreakoutGameOverScene extends Phaser.Scene {
    constructor() {
        super(BreakoutConsts.SCENES.GAME_OVER);
    }

    create(data: { score: number, win: boolean }) {
        const { width, height } = this.scale;

        // Background
        this.add.rectangle(0, 0, width, height, 0x000000).setOrigin(0, 0);

        const title = data.win ? 'YOU WIN!' : 'GAME OVER';
        const color = data.win ? '#0f0' : '#f00';

        this.add.text(width / 2, height / 3, title, {
            fontSize: '64px',
            color: color,
            fontStyle: 'bold',
            stroke: '#000',
            strokeThickness: 8
        }).setOrigin(0.5);

        this.add.text(width / 2, height / 2, `Final Score: ${data.score || 0}`, {
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
            this.scene.start(BreakoutConsts.SCENES.MAIN);
        });

        this.input.once('pointerdown', () => {
            this.scene.start(BreakoutConsts.SCENES.MAIN);
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
