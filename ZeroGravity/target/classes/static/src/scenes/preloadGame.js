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
		this.load.spritesheet('centroDeMando', 'assets/sprites/Edificios/CentroDeMando.png', {frameWidth:247,frameHeight:189});
		this.load.spritesheet( 'centroOperaciones' , 'assets/sprites/Edificios/CentroOperaciones.png', {frameWidth:128,frameHeight:156});
		this.load.spritesheet( 'taller' , 'assets/sprites/Edificios/taller.png', {frameWidth:128,frameHeight:64});
		this.load.spritesheet( 'centroAdministrativo' , 'assets/sprites/Edificios/CentroAdministrativo.png', {frameWidth:192,frameHeight:184});
		this.load.spritesheet( 'plataformaExtraccion' , 'assets/sprites/Edificios/PlataformaExtraccion.png', {frameWidth:106,frameHeight:83});
		this.load.spritesheet( 'bloqueViviendas' , 'assets/sprites/Edificios/BloqueViviendas.png', {frameWidth:128,frameHeight:133});
		this.load.spritesheet( 'generador' , 'assets/sprites/Edificios/Generador.png', {frameWidth:127,frameHeight:102});
		this.load.spritesheet( 'laboratorioInvestigacion' , 'assets/sprites/Edificios/LaboratorioInvestigacion.png', {frameWidth:194,frameHeight:154});
		this.load.spritesheet( 'centroComercio' , 'assets/sprites/Edificios/CentroComercio.png', {frameWidth:128,frameHeight:123});
		
		// Menus de Edificios
		this.load.image('centroDeMandoMenu', 'assets/sprites/Edificios/CentroMandoMenu.png');
		
		//Botones
		this.load.spritesheet('btnMover', 'assets/sprites/Edificios/btnMover.png', {frameWidth:256,frameHeight:64});
		this.load.spritesheet('btnExpandir', 'assets/sprites/Edificios/btnExpandir.png', {frameWidth:256,frameHeight:64});
		this.load.spritesheet('btnSubirNivel', 'assets/sprites/Edificios/btnNivel.png', {frameWidth:256,frameHeight:64});
		this.load.spritesheet('btnColonos', 'assets/sprites/Edificios/btnColonos.png', {frameWidth:256,frameHeight:64});
		this.load.spritesheet('btnOpciones', 'assets/interface/Gameplay/btnOpcionesSprite.png', {frameWidth:78,frameHeight:78});
		this.load.spritesheet('btnCerrar', 'assets/sprites/cerrar.png', {frameWidth:64,frameHeight:64});
		this.load.spritesheet('btnAnuncio', 'assets/interface/Gameplay/btnAnuncio.png', {frameWidth:300,frameHeight:54});
		
		//Interfaz
		this.load.image('intEdificios', 'assets/interface/interfazEdificios.png');
		this.load.image('intMejoras', 'assets/interface/interfazMejoras.png');
		this.load.image('intDetalles', 'assets/interface/interfazDetalles.png');
		this.load.image('intPrincipal', 'assets/interface/Gameplay/Principal.png');
		this.load.image('intMision', 'assets/interface/Gameplay/btnMision.png');
		this.load.image('intAnuncios', 'assets/interface/Gameplay/btnAnuncios.png');
		this.load.image('intRanking', 'assets/interface/Gameplay/btnRanking.png');
		this.load.image('cortina', 'assets/interface/Cortina.png');
		this.load.image('panelAnuncio', 'assets/interface/Gameplay/Panel.png');
		this.load.image('xAnuncio', 'assets/interface/Gameplay/x.png');
		
		
		
		//Iconos
		this.load.image('clayIcon', 'assets/sprites/stone.png');
		this.load.image('energyIcon', 'assets/sprites/stone.png');
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