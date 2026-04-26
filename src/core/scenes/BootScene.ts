import { CoreConsts } from '../CoreConsts';

export class BootScene extends Phaser.Scene {
    constructor() {
        super(CoreConsts.SCENES.BOOT);
    }

    preload() {
        // Load only shared assets needed for selection menu
        this.load.image('background', 'assets/shared/background-day.png');
        this.load.image('logo', 'assets/shared/arcade_logo.png');
    }

    create() {
        this.scene.start(CoreConsts.SCENES.GAME_SELECT);
    }
}
