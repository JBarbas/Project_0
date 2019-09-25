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
    	this.load.image('Lharys', 'assets/sprites/Lharys.png');
    }
    create (data)  {
    	var image = this.add.image(400, 300, 'Lharys');
    	image.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
    		game.scene.run('PreloadScene');
    		game.scene.stop('BootScene');
    	});
    }
    update(time, delta) {
    	
    }

}