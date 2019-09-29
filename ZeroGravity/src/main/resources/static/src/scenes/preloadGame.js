class PreloadGameScene extends Phaser.Scene {
	
	constructor() {
		super({
			key: "PreloadGameScene",
		});
	}
	
	init(data){
		if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **PRELOAD GAME** scene");
		}
	}
	
	preload () {
		// Pedimos la info del jugador, como su map grid o sus recursos
		let msg = new Object();
		msg.event = 'ASK PLAYER INFO';
		game.global.socket.send(JSON.stringify(msg));
		
		this.load.image('tile_prototipo_0', 'assets/sprites/Tiles_prototipo/tile_prototipo_0.png');
		this.load.image('tile_prototipo_-1', 'assets/sprites/Tiles_prototipo/tile_prototipo_-1.png');
		this.load.image('tile_prototipo_-2', 'assets/sprites/Tiles_prototipo/tile_prototipo_-2.png');
		
		// Edificios
		this.load.image('edificio', 'assets/sprites/Edificio.png');
		this.load.image('centroDeMando', 'assets/sprites/Edificios/CentroDeMando.png');
		this.load.spritesheet( 'centroOperaciones' , 'assets/sprites/Edificios/CentroOperaciones.png' ,{frameWidth:128,frameHeight:157});
		
		// Menus de Edificios
		this.load.image('centroDeMandoMenu', 'assets/sprites/Edificios/CentroMandoMenu.png');
    }
    create (data)  {
		
    }
    update(time, delta) {
    	if (game.global.loaded) {
    		game.scene.run('GameScene');
    		game.scene.stop('PreloadGameScene');
    	}
    }
}