import { FlappyConsts } from '../FlappyConsts';

export class FlappyBootScene extends Phaser.Scene {
    constructor() {
        super(FlappyConsts.SCENES.BOOT);
    }

    preload() {
        // Shared but needed for this game
        this.load.image('background', 'assets/shared/background-day.png');
        this.load.image('base', 'assets/shared/base.png');
        this.load.image('gameover', 'assets/shared/gameover.png');
        this.load.image('message', 'assets/shared/message.png');
        this.load.audio('die', ['assets/shared/die.ogg', 'assets/shared/die.wav']);
        this.load.audio('hit', ['assets/shared/hit.ogg', 'assets/shared/hit.wav']);

        // Flappy specific
        this.load.image('bird-down', 'assets/flappy/yellowbird-downflap.png');
        this.load.image('bird-mid', 'assets/flappy/yellowbird-midflap.png');
        this.load.image('bird-up', 'assets/flappy/yellowbird-upflap.png');
        this.load.image('pipe', 'assets/flappy/pipe-green.png');
        this.load.audio('point', ['assets/flappy/point.ogg', 'assets/flappy/point.wav']);
        this.load.audio('wing', ['assets/flappy/wing.ogg', 'assets/flappy/wing.wav']);
    }

    create() {
        // Create bird animation
        this.anims.create({
            key: 'flap',
            frames: [
                { key: 'bird-down' },
                { key: 'bird-mid' },
                { key: 'bird-up' },
                { key: 'bird-mid' }
            ],
            frameRate: 8,
            repeat: -1
        });

        this.scene.start(FlappyConsts.SCENES.MENU);
    }
}
