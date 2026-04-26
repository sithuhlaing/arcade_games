import { BreakoutConsts } from '../BreakoutConsts';
import { CoreConsts } from '../../../core/CoreConsts';

export class Paddle extends Phaser.Physics.Arcade.Sprite {
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'paddle');
        
        scene.add.existing(this);
        scene.physics.add.existing(this, true); // Static body for paddle
        
        this.cursors = scene.input.keyboard!.createCursorKeys();
    }

    update() {
        if (this.cursors.left.isDown) {
            this.setX(this.x - BreakoutConsts.PADDLE_SPEED * 0.016);
        } else if (this.cursors.right.isDown) {
            this.setX(this.x + BreakoutConsts.PADDLE_SPEED * 0.016);
        }

        // Clamp to screen
        const halfWidth = this.displayWidth / 2;
        if (this.x < halfWidth) this.setX(halfWidth);
        if (this.x > CoreConsts.CANVAS_WIDTH - halfWidth) this.setX(CoreConsts.CANVAS_WIDTH - halfWidth);

        // Update physics body manually since it's static but we're moving it
        this.body?.updateFromGameObject();
    }
}
