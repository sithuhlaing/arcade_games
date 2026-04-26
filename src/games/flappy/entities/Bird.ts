import { FlappyConsts } from '../FlappyConsts';
import { CoreConsts } from '../../../core/CoreConsts';

export class Bird extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'bird-mid');
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.setCollideWorldBounds(true);
        this.setGravityY(FlappyConsts.GRAVITY);
        
        this.play('flap');
    }

    flap() {
        this.setVelocityY(FlappyConsts.JUMP_VELOCITY);
        this.scene.sound.play('wing');
    }

    update() {
        // Rotate bird based on velocity
        if (this.body) {
            if (this.body.velocity.y < 0) {
                this.angle = -20;
            } else if (this.body.velocity.y > 0) {
                if (this.angle < 90) {
                    this.angle += 2;
                }
            }
        }

        // Check for ground/ceiling collision (simple check)
        if (this.y <= 0 || this.y >= CoreConsts.CANVAS_HEIGHT - this.displayHeight / 2) {
            this.emit('die');
        }
    }
}
