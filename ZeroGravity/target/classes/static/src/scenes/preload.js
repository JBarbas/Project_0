class PreloadScene extends Phaser.Scene {
	
	constructor() {
		super({
			key: "PreloadScene",
		});
	}
	
	init(data){
		if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **PRELOAD** scene");
		}
	}
	
	preload () {
    	this.load.image('Lharys', 'assets/sprites/Lharys.png');
    }
    create (data)  {
    	var image = this.add.image(300, 300, 'Lharys');
    	image.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
    		game.scene.run('GameScene');
    		game.scene.stop('PreloadScene');
    	});
    }
    update(time, delta) {
    	
    }
}