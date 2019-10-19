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
		game.scene.run('LoadGameplayScene');
		
		// Pedimos la info del jugador, como su map grid o sus recursos
		let msg = new Object();
		msg.event = 'ASK PLAYER INFO';
		game.global.socket.send(JSON.stringify(msg));
		
		this.load.image('fondo', 'assets/sprites/Fondo/fondo2.jpg');
		this.load.image('fondo-lite', 'assets/sprites/Fondo/fondo-lite.jpg');
		this.load.image('tile_0', 'assets/sprites/Tiles_prototipo/tile_0.png');
		this.load.image('tile_-1', 'assets/sprites/Tiles_prototipo/tile_-1.png');
		
		// Edificios
		this.load.image('edificio', 'assets/sprites/Edificio.png');
		this.load.spritesheet('centroDeMando', 'assets/sprites/Edificios/CentroDeMando.png', {frameWidth:247,frameHeight:189});
		this.load.spritesheet( 'centroOperaciones' , 'assets/sprites/Edificios/CentroOperaciones.png', {frameWidth:128,frameHeight:222});
		this.load.spritesheet( 'taller' , 'assets/sprites/Edificios/Taller.png', {frameWidth:189,frameHeight:162});
		this.load.spritesheet( 'centroAdministrativo' , 'assets/sprites/Edificios/CentroAdministrativo.png', {frameWidth:192,frameHeight:188});
		this.load.spritesheet( 'plataformaExtraccion' , 'assets/sprites/Edificios/PlataformaExtraccion.png', {frameWidth:106,frameHeight:104});
		this.load.spritesheet( 'bloqueViviendas' , 'assets/sprites/Edificios/BloqueViviendas.png', {frameWidth:128,frameHeight:205});
		this.load.spritesheet( 'generador' , 'assets/sprites/Edificios/Generador.png', {frameWidth:127,frameHeight:102});
		this.load.spritesheet( 'laboratorioInvestigacion' , 'assets/sprites/Edificios/LaboratorioInvestigacion.png', {frameWidth:194,frameHeight:154});
		this.load.spritesheet( 'centroComercio' , 'assets/sprites/Edificios/CentroComercio.png', {frameWidth:128,frameHeight:169});
		
		// Menus de Edificios
		this.load.image('centroDeMandoMenu', 'assets/sprites/Edificios/CentroMandoMenu.png');
		
		//Botones
		this.load.spritesheet('btnMover', 'assets/sprites/Edificios/btnMover.png', {frameWidth:200,frameHeight:50});
		this.load.spritesheet('btnExpandir', 'assets/sprites/Edificios/btnExpandir.png', {frameWidth:200,frameHeight:50});
		this.load.spritesheet('btnSubirNivel', 'assets/sprites/Edificios/btnNivel.png', {frameWidth:200,frameHeight:50});
		this.load.spritesheet('btnSubirNivelRobot', 'assets/sprites/Edificios/btnNivelRobot.png', {frameWidth:50,frameHeight:50});
		this.load.spritesheet('btnColonos', 'assets/sprites/Edificios/btnColonos.png', {frameWidth:200,frameHeight:50});
		this.load.spritesheet('btnEnviar', 'assets/sprites/Edificios/btnEnviar.png', {frameWidth:200,frameHeight:50});
		this.load.spritesheet('btnRecolectar', 'assets/sprites/Edificios/btnRecolectar.png', {frameWidth:200,frameHeight:50});
		this.load.spritesheet('btnOpciones', 'assets/interface/Gameplay/btnOpcionesSprite.png', {frameWidth:78,frameHeight:78});
		this.load.spritesheet('btnCerrar', 'assets/sprites/cerrar.png', {frameWidth:64,frameHeight:64});
		this.load.spritesheet('btnAnuncio', 'assets/interface/Gameplay/btnAnuncio.png', {frameWidth:300,frameHeight:54});

		this.load.spritesheet('xBuilding', 'assets/interface/Gameplay/x2.png', {frameWidth:38,frameHeight:40});
		
		
		//Interfaz
		
		this.load.image('intEdificios', 'assets/interface/interfazEdificios.png');
		this.load.image('intEdificioRec', 'assets/interface/interfazEdificioRecuadro.png');
		this.load.image('intMejoras', 'assets/interface/interfazMejoras.png');
		this.load.image('intDetalles', 'assets/interface/interfazDetalles.png');
		this.load.image('intPrincipal', 'assets/interface/Gameplay/Principal.png');
		this.load.image('intMision', 'assets/interface/Gameplay/btnMision.png');
		this.load.image('intAnuncios', 'assets/interface/Gameplay/btnAnuncios.png');
		this.load.image('intRanking', 'assets/interface/Gameplay/btnRanking.png');
		this.load.image('cortina', 'assets/interface/Cortina.png');
		this.load.image('panelAnuncio', 'assets/interface/Gameplay/Panel.png');
		this.load.image('panelRanking', 'assets/interface/Gameplay/Ranking.png');
		this.load.image('xAnuncio', 'assets/interface/Gameplay/x.png');
		this.load.image('iconoDetalles', 'assets/interface/iconoDetalles.png');
		this.load.image('iconoEdificio', 'assets/interface/iconoEdificio.png');
		this.load.image('iconoMejoras', 'assets/interface/iconoMejoras.png');
		this.load.image('iconoComprar', 'assets/interface/iconoComprar.png');
		this.load.image('iconoVender', 'assets/interface/iconoVender.png');
		this.load.image('iconoOfertas', 'assets/interface/iconoOfertas.png');
		
		
		this.load.image('intCMejoras', 'assets/interface/Comercio/MejorasComercio.png');
		this.load.image('intCDetalles', 'assets/interface/Comercio/DetallesComercio.png');
		this.load.image('intCComprar', 'assets/interface/Comercio/ComprarComercio.png');
		this.load.image('intCVender', 'assets/interface/Comercio/VenderComercio.png');
		this.load.image('intCOfertas', 'assets/interface/Comercio/misOfertasComercio.png');
		
		//Efectos
		this.load.image('orangeSpark', 'assets/sprites/Particulas/orangeSpark.png');
		this.load.image('blueSpark', 'assets/sprites/Particulas/blueSpark.png');
		this.load.image('greenSpark', 'assets/sprites/Particulas/greenSpark.png');
		this.load.image('redSpark', 'assets/sprites/Particulas/redSpark.png');
		this.load.image('pinkSpark', 'assets/sprites/Particulas/pinkSpark.png');
		
		//Robots
		this.load.image('robotNv1', 'assets/sprites/robotNv1.png');
		this.load.image('robotNv2', 'assets/sprites/robotNv2.png');
		this.load.image('robotNv3', 'assets/sprites/robotNv3.png');
				
		//Iconos
		this.load.image('clayIcon', 'assets/sprites/stone.png');
		this.load.image('energyIcon', 'assets/sprites/stone.png');
		this.load.image('creditIcon', 'assets/sprites/stone.png');
		this.load.spritesheet('starIcon', 'assets/interface/estrella.png', {frameWidth:41,frameHeight:39});
		
		//Texts
		this.load.html('rankingmenu', 'assets/text/rankingmenu.html');
		this.load.html('centroComercioMenu', 'assets/text/centroComercioMenu.html');
		this.load.html('centroComercioMenuV', 'assets/text/centroComercioMenuV.html');
		this.load.html('centroComercioMenuO', 'assets/text/centroComercioMenuO.html');
    }
    create (data)  {
		
    }
    update(time, delta) {
    	if (game.global.loaded) {
    		
    		game.scene.stop('PreloadGameScene');
    	}
    }
}