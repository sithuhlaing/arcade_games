import { FlappyConsts } from '../FlappyConsts';
import { Bird } from '../entities/Bird';
import { PipeManager } from '../entities/PipeManager';

export class MainScene extends Phaser.Scene {
    private bird!: Bird;
    private pipeManager!: PipeManager;
    private score: number = 0;
    private scoreText!: Phaser.GameObjects.Text;
    private isGameOver: boolean = false;
    private background!: Phaser.GameObjects.TileSprite;
    private base!: Phaser.GameObjects.TileSprite;

    constructor() {
        super(FlappyConsts.SCENES.MAIN);
    }

    create() {
        this.score = 0;
        this.isGameOver = false;

        const { width, height } = this.scale;

        // Background
        this.background = this.add.tileSprite(0, 0, width, height, 'background')
            .setOrigin(0, 0);

        this.bird = new Bird(this, FlappyConsts.BIRD_START_X, FlappyConsts.BIRD_START_Y);
        this.pipeManager = new PipeManager(this);

        // Base (Ground)
        this.base = this.add.tileSprite(0, height - 100, width, 112, 'base')
            .setOrigin(0, 0)
            .setDepth(5);
        this.physics.add.existing(this.base, true);

        this.scoreText = this.add.text(width / 2, 50, '0', {
            fontSize: '64px',
            color: '#fff',
            fontStyle: 'bold',
            stroke: '#000',
            strokeThickness: 6
        }).setOrigin(0.5).setDepth(10);

        // Input
        this.input.keyboard?.on('keydown-SPACE', () => this.handleFlap());
        this.input.on('pointerdown', () => this.handleFlap());

        // Collisions
        this.physics.add.collider(this.bird, this.pipeManager.group, this.handleGameOver, undefined, this);
        this.physics.add.collider(this.bird, this.base, this.handleGameOver, undefined, this);

        // Custom events from bird (e.g., hitting floor/ceiling)
        this.bird.on('die', () => this.handleGameOver());
    }

    private handleFlap() {
        if (this.isGameOver) return;
        this.bird.flap();
    }

    private handleGameOver() {
        if (this.isGameOver) return;

        this.isGameOver = true;
        this.physics.pause();
        this.bird.setTint(0xff0000);
        this.bird.stop(); // Stop animation
        this.pipeManager.stop();
        
        this.sound.play('hit');
        this.time.delayedCall(400, () => {
            this.sound.play('die');
        });

        this.time.delayedCall(1000, () => {
            this.scene.start(FlappyConsts.SCENES.GAME_OVER, { score: this.score });
        });
    }

    update(time: number, delta: number) {
        if (this.isGameOver) return;

        this.bird.update();
        this.pipeManager.update();

        // Scroll background and base
        this.background.tilePositionX += 0.5;
        this.base.tilePositionX += 2;

        // Check for scoring
        this.pipeManager.group.getChildren().forEach((pipe: any) => {
            if (pipe.flipY && !pipe.scored && pipe.getBounds().right < this.bird.x) {
                pipe.scored = true;
                this.score++;
                this.scoreText.setText(this.score.toString());
                this.sound.play('point');
            }
        });
    }
}
