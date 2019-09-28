class PreloadGameScene extends Phaser.Scene {
	
	constructor() {
		super({
			key: "PreloadGameScene",
		});
	}
	
	init(data){
		if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **PRELOAD** scene");
		}
	}
	
	preload () {
    	this.load.image('CentroMando', 'assets/sprites/Edificio.png');
		this.load.image('tile_prototipo_0', 'assets/sprites/Tiles_prototipo/tile_prototipo_0.png');
		this.load.image('tile_prototipo_-1', 'assets/sprites/Tiles_prototipo/tile_prototipo_-1.png');
		this.load.image('tile_prototipo_-2', 'assets/sprites/Tiles_prototipo/tile_prototipo_-2.png');
    }
    create (data)  {
		game.scene.run('GameScene');
		game.scene.stop('PreloadGameScene');
    }
    update(time, delta) {
    	
    }
}