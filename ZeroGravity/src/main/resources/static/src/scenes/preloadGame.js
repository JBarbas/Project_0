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
		
		this.load.image('fondo', 'assets/background/Planeta 1/Planeta_1.jpg');
		this.load.image('tile_0', 'assets/sprites/Tiles_prototipo/tile_0.png');
		this.load.image('tile_-1', 'assets/sprites/Tiles_prototipo/tile_-1.png');
		
		// Edificios
		this.load.image('edificio', 'assets/sprites/Edificio.png');
		this.load.spritesheet('centroDeMando', 'assets/sprites/Edificios/CentroDeMando.png', {frameWidth:256,frameHeight:128});
		this.load.spritesheet( 'centroOperaciones' , 'assets/sprites/Edificios/CentroOperaciones.png', {frameWidth:128,frameHeight:157});
		this.load.spritesheet( 'taller' , 'assets/sprites/Edificios/taller.png', {frameWidth:128,frameHeight:64});
		this.load.spritesheet( 'centroAdministrativo' , 'assets/sprites/Edificios/CentroAdministrativo.png', {frameWidth:192,frameHeight:185});
		this.load.spritesheet( 'plataformaExtraccion' , 'assets/sprites/Edificios/PlataformaExtraccion.png', {frameWidth:128,frameHeight:157});
		this.load.spritesheet( 'bloqueViviendas' , 'assets/sprites/Edificios/BloqueViviendas.png', {frameWidth:128,frameHeight:133});
		
		// Menus de Edificios
		this.load.image('centroDeMandoMenu', 'assets/sprites/Edificios/CentroMandoMenu.png');
		
		//Botones
		this.load.spritesheet('btnMover', 'assets/sprites/Edificios/btnMover.png', {frameWidth:256,frameHeight:64});
		this.load.spritesheet('btnExpandir', 'assets/sprites/Edificios/btnExpandir.png', {frameWidth:256,frameHeight:64});
		this.load.spritesheet('btnColonos', 'assets/sprites/Edificios/btnColonos.png', {frameWidth:256,frameHeight:64});
		
		//Interfaz
		this.load.image('intEdificios', 'assets/interface/interfazEdificios.png');
		this.load.image('intMejoras', 'assets/interface/interfazMejoras.png');
		this.load.image('intDetalles', 'assets/interface/interfazDetalles.png');
		
		//Iconos
		this.load.image('clayIcon', 'assets/sprites/stone.png');
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