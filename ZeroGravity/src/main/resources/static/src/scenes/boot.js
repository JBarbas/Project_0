class BootScene extends Phaser.Scene {

	constructor() {
        super({
            key: "BootScene",
        });
    }

    init(data) {
    	if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **BOOT** scene");
		}
    }
    
    preload () {
    	this.time.desiredFps = game.global.FPS;    	
    }
    create (data)  {
    	if (typeof game.global.socket !== 'undefined') {
    		game.scene.run('PreloadScene');
    		game.scene.stop('BootScene');
		}
    }
    update(time, delta) {
    	
    }

}