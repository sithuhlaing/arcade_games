import { CoreConsts } from '../CoreConsts';
import { FlappyConsts } from '../../games/flappy/FlappyConsts';
import { BreakoutConsts } from '../../games/breakout/BreakoutConsts';

export class GameSelectScene extends Phaser.Scene {
    constructor() {
        super(CoreConsts.SCENES.GAME_SELECT);
    }

    create() {
        const { width, height } = this.scale;

        // Background
        this.add.rectangle(0, 0, width, height, 0x000000)
            .setOrigin(0, 0);

        // Logo
        this.add.image(width / 2, 120, 'logo').setScale(0.8);

        this.add.text(width / 2, 190, 'SELECT A MISSION', {
            fontSize: '24px',
            color: '#fff',
            fontStyle: 'bold',
            stroke: '#000',
            strokeThickness: 4
        }).setOrigin(0.5);

        // Flappy Bird Button
        this.createGameButton(width / 2, 280, 'FLAPPY BIRD', () => {
            this.scene.start(FlappyConsts.SCENES.BOOT);
        });

        // Breakout Button
        this.createGameButton(width / 2, 410, 'BREAKOUT', () => {
            this.scene.start(BreakoutConsts.SCENES.BOOT);
        });

        // Placeholder for future games
        this.createGameButton(width / 2, 540, 'COMING SOON...', () => {}, 0x888888);
    }

    private createGameButton(x: number, y: number, label: string, callback: () => void, color: number = 0x44aa44) {
        const button = this.add.container(x, y);

        const bg = this.add.rectangle(0, 0, 300, 80, color)
            .setStrokeStyle(4, 0x000000)
            .setInteractive({ useHandCursor: true });

        const text = this.add.text(0, 0, label, {
            fontSize: '32px',
            color: '#fff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        button.add([bg, text]);

        bg.on('pointerdown', callback);

        bg.on('pointerover', () => {
            bg.setFillStyle(Phaser.Display.Color.IntegerToColor(color).lighten(20).color);
            button.setScale(1.05);
        });

        bg.on('pointerout', () => {
            bg.setFillStyle(color);
            button.setScale(1);
        });

        return button;
    }
}
