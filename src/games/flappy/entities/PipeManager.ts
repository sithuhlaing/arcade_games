import { FlappyConsts } from '../FlappyConsts';
import { CoreConsts } from '../../../core/CoreConsts';

export class PipeManager {
    private scene: Phaser.Scene;
    public group: Phaser.Physics.Arcade.Group;
    private spawnTimer!: Phaser.Time.TimerEvent;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.group = this.scene.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        this.startSpawning();
    }

    private startSpawning() {
        this.spawnTimer = this.scene.time.addEvent({
            delay: FlappyConsts.PIPE_SPAWN_INTERVAL,
            callback: this.spawnPipePair,
            callbackScope: this,
            loop: true
        });
        
        // Spawn first pipe immediately
        this.spawnPipePair();
    }

    private spawnPipePair() {
        const gapY = Phaser.Math.Between(150, 450);
        const spawnX = CoreConsts.CANVAS_WIDTH + 50;

        // Top Pipe
        const topPipe = this.group.create(spawnX, gapY - FlappyConsts.PIPE_GAP / 2, 'pipe') as Phaser.Physics.Arcade.Sprite;
        topPipe.setOrigin(0.5, 1);
        topPipe.flipY = true;
        topPipe.setVelocityX(FlappyConsts.PIPE_SPEED);

        // Bottom Pipe
        const bottomPipe = this.group.create(spawnX, gapY + FlappyConsts.PIPE_GAP / 2, 'pipe') as Phaser.Physics.Arcade.Sprite;
        bottomPipe.setOrigin(0.5, 0);
        bottomPipe.setVelocityX(FlappyConsts.PIPE_SPEED);

        // Add scoring flag
        (topPipe as any).scored = false;
    }

    update() {
        this.group.getChildren().forEach((pipe: any) => {
            if (pipe.getBounds().right < 0) {
                pipe.destroy();
            }
        });
    }

    stop() {
        if (this.spawnTimer) {
            this.spawnTimer.remove();
        }
        this.group.setVelocityX(0);
    }
}
