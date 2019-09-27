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
    	this.load.image('CentroMando', 'assets/sprites/Edificio.png');
		this.load.image('tile_prototipo_0', 'assets/sprites/Tiles_prototipo/tile_prototipo_0.png');
		this.load.image('tile_prototipo_-1', 'assets/sprites/Tiles_prototipo/tile_prototipo_-1.png');
		this.load.image('tile_prototipo_-2', 'assets/sprites/Tiles_prototipo/tile_prototipo_-2.png');

		this.load.image('backgroundM', 'assets/background/MenuPrincipal.png');
		this.load.image('btnAmigos', 'assets/background/btnMenuAmigos.png');
    }
    create (data)  {
    	var backgroundM = this.add.image(960, 540, 'backgroundM');
    	
    	var btnAmigos = this.add.image(1720, 950, 'btnAmigos');
    	btnAmigos.setScale(1.5);
    	btnAmigos.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
    		game.scene.run('GameScene');
    		game.scene.stop('PreloadScene');
    	});
    }
    update(time, delta) {
    	
    }
}