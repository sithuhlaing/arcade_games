import { BreakoutConsts } from '../BreakoutConsts';

export class BreakoutBootScene extends Phaser.Scene {
    constructor() {
        super(BreakoutConsts.SCENES.BOOT);
    }

    preload() {
        // Shared
        this.load.image('background', 'assets/shared/background-day.png');
        this.load.audio('hit', ['assets/shared/hit.ogg', 'assets/shared/hit.wav']);
        this.load.audio('swoosh', ['assets/shared/swoosh.ogg', 'assets/shared/swoosh.wav']);
        this.load.audio('point', ['assets/flappy/point.ogg', 'assets/flappy/point.wav']);

        // Breakout Assets
        this.load.image('paddle', 'assets/breakout/paddle.png');
        this.load.image('ball', 'assets/breakout/ball.png');
        this.load.image('brick_red', 'assets/breakout/brick_red.png');
        this.load.image('brick_blue', 'assets/breakout/brick_blue.png');
        this.load.image('brick_green', 'assets/breakout/brick_green.png');
        this.load.image('brick_yellow', 'assets/breakout/brick_yellow.png');
        this.load.image('brick_purple', 'assets/breakout/brick_purple.png');
    }

    create() {
        // Handle "Magic Pink" (Magenta 255,0,255) transparency
        const breakoutAssets = [
            'paddle', 'ball', 'brick_red', 'brick_blue', 
            'brick_green', 'brick_yellow', 'brick_purple'
        ];

        breakoutAssets.forEach(key => this.replaceMagicPink(key));

        this.scene.start(BreakoutConsts.SCENES.MENU);
    }

    private replaceMagicPink(textureKey: string) {
        if (!this.textures.exists(textureKey)) return;

        const texture = this.textures.get(textureKey);
        const source = texture.getSourceImage() as HTMLCanvasElement | HTMLImageElement;

        const canvas = document.createElement('canvas');
        canvas.width = source.width;
        canvas.height = source.height;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.drawImage(source, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            // Check for Magenta (255, 0, 255)
            if (r === 255 && g === 0 && b === 255) {
                data[i + 3] = 0; // Set alpha to 0 (transparent)
            }
        }

        ctx.putImageData(imageData, 0, 0);

        // Replace the texture with the new canvas-based one
        this.textures.remove(textureKey);
        this.textures.addCanvas(textureKey, canvas);
    }
}
