import { BreakoutConsts } from '../BreakoutConsts';
import { CoreConsts } from '../../../core/CoreConsts';

export class Ball extends Phaser.Physics.Arcade.Sprite {
    private isLaunched: boolean = false;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'ball');
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.setCollideWorldBounds(true);
        this.setBounce(1);
    }

    launch() {
        if (this.isLaunched) return;
        
        this.isLaunched = true;
        this.setVelocity(
            Phaser.Math.Between(-150, 150),
            -BreakoutConsts.BALL_SPEED
        );
    }

    reset(x: number, y: number) {
        this.isLaunched = false;
        this.setVelocity(0, 0);
        this.setPosition(x, y);
    }

    update() {
        if (this.y > CoreConsts.CANVAS_HEIGHT) { // Off screen bottom
            this.emit('lost');
        }
    }

    get launched() {
        return this.isLaunched;
    }
}
