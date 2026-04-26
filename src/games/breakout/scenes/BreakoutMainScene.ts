import { BreakoutConsts } from '../BreakoutConsts';
import { CoreConsts } from '../../../core/CoreConsts';
import { Paddle } from '../entities/Paddle';
import { Ball } from '../entities/Ball';

export class BreakoutMainScene extends Phaser.Scene {
    private paddle!: Paddle;
    private ball!: Ball;
    private bricks!: Phaser.Physics.Arcade.StaticGroup;
    private score: number = 0;
    private scoreText!: Phaser.GameObjects.Text;

    constructor() {
        super(BreakoutConsts.SCENES.MAIN);
    }

    create() {
        const { width, height } = this.scale;
        this.score = 0;

        // Background
        this.add.rectangle(0, 0, width, height, 0x000000).setOrigin(0, 0);

        // Score
        this.scoreText = this.add.text(20, 20, 'Score: 0', {
            fontSize: '24px',
            color: '#fff',
            stroke: '#000',
            strokeThickness: 4
        }).setDepth(10);

        // Bricks
        this.bricks = this.physics.add.staticGroup();
        this.createBricks();

        // Disable bottom collision
        this.physics.world.checkCollision.down = false;

        // Paddle
        this.paddle = new Paddle(this, width / 2, height - 50);

        // Ball
        this.ball = new Ball(this, width / 2, height - 80);

        // Collisions
        this.physics.add.collider(this.ball, this.paddle, this.handlePaddleHit, undefined, this);
        this.physics.add.collider(this.ball, this.bricks, this.handleBrickHit, undefined, this);

        // Input
        this.input.on('pointerdown', () => this.ball.launch());
        this.input.keyboard?.on('keydown-SPACE', () => this.ball.launch());

        // Events
        this.ball.on('lost', () => this.handleGameOver());
    }

    private createBricks() {
        const { BRICK_ROWS, BRICK_COLS, BRICK_WIDTH, BRICK_HEIGHT, BRICK_PADDING } = BreakoutConsts;
        const totalWidth = BRICK_COLS * (BRICK_WIDTH + BRICK_PADDING) - BRICK_PADDING;
        const startX = (CoreConsts.CANVAS_WIDTH - totalWidth) / 2 + BRICK_WIDTH / 2;
        const startY = 100;

        const brickTypes = ['brick_red', 'brick_blue', 'brick_green', 'brick_yellow', 'brick_purple'];

        for (let row = 0; row < BRICK_ROWS; row++) {
            const brickType = brickTypes[row % brickTypes.length];
            for (let col = 0; col < BRICK_COLS; col++) {
                const x = startX + col * (BRICK_WIDTH + BRICK_PADDING);
                const y = startY + row * (BRICK_HEIGHT + BRICK_PADDING);
                this.bricks.create(x, y, brickType);
            }
        }
    }

    private handlePaddleHit(ball: any, paddle: any) {
        // Calculate new velocity based on where it hit the paddle
        let diff = 0;
        if (ball.x < paddle.x) {
            diff = paddle.x - ball.x;
            ball.setVelocityX(-10 * diff);
        } else if (ball.x > paddle.x) {
            diff = ball.x - paddle.x;
            ball.setVelocityX(10 * diff);
        } else {
            ball.setVelocityX(2 + Math.random() * 8);
        }
        this.sound.play('swoosh', { volume: 0.5 });
    }

    private handleBrickHit(ball: any, brick: any) {
        brick.destroy();
        this.score += 10;
        this.scoreText.setText(`Score: ${this.score}`);
        this.sound.play('point', { volume: 0.5 });

        if (this.bricks.countActive() === 0) {
            this.handleWin();
        }
    }

    private handleGameOver() {
        this.sound.play('hit');
        this.scene.start(BreakoutConsts.SCENES.GAME_OVER, { score: this.score, win: false });
    }

    private handleWin() {
        this.scene.start(BreakoutConsts.SCENES.GAME_OVER, { score: this.score, win: true });
    }

    update() {
        this.paddle.update();
        
        if (!this.ball.launched) {
            this.ball.setPosition(this.paddle.x, this.paddle.y - 25);
        } else {
            this.ball.update();
        }
    }
}
