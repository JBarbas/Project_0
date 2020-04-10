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
		var musicMenu = game.global.musicMenu;
		//musicMenu.stop();
		game.scene.run('LoadGameplayScene');
		
		// Pedimos la info del jugador, como su map grid o sus recursos
		let msg = new Object();
		msg.event = 'ASK PLAYER INFO';
		game.global.socket.send(JSON.stringify(msg));
		
		this.load.image('fondo', 'assets/sprites/Fondo/fondo2.jpg');
		this.load.image('bg0', 'assets/sprites/0.jpg');
		this.load.image('bg1', 'assets/sprites/1.jpg');
		this.load.image('bg2', 'assets/sprites/2.jpg');
		this.load.image('bg3', 'assets/sprites/3.jpg');
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
		this.load.image('enConstruccion1', 'assets/sprites/Edificios/modulo1.png');
		this.load.image('enConstruccion2', 'assets/sprites/Edificios/modulo2.png');
		this.load.image('enConstruccion3', 'assets/sprites/Edificios/modulo3.png');
		
		// Menus de Edificios
		this.load.image('centroDeMandoMenu', 'assets/sprites/Edificios/CentroMandoMenu.png');
		this.load.image('menuEnConstruccion', 'assets/interface/enConstruccion.png');
		this.load.image('menuEnConstruccionEng', 'assets/interface/inConstruction.png');
		
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
		this.load.spritesheet('btnSee', 'assets/interface/Gameplay/buttonSee.png', {frameWidth:300,frameHeight:54});
		this.load.spritesheet('btnSusto', 'assets/interface/Gameplay/btnProximoSprite.png', {frameWidth:300,frameHeight:54});

		this.load.spritesheet('xBuilding', 'assets/interface/Gameplay/x2.png', {frameWidth:38,frameHeight:40});
		this.load.spritesheet('xSusto', 'assets/interface/Gameplay/xSusto.png', {frameWidth:38,frameHeight:40});
		this.load.spritesheet('xAnuncio', 'assets/interface/Gameplay/x.png', {frameWidth:49,frameHeight:40});
		
		
		//Interfaz
		
		this.load.image('intEdificios', 'assets/interface/interfazEdificios.png');
		this.load.image('intEdificioRec', 'assets/interface/interfazEdificioRecuadro.png');
		this.load.image('intMejoras', 'assets/interface/interfazMejoras.png');
		this.load.image('intDetalles', 'assets/interface/interfazDetalles.png');
		
		this.load.image('intBuildings', 'assets/interface/interfazBuildings.png');
		this.load.image('intUpdates', 'assets/interface/interfazUpdates.png');
		this.load.image('intDetails', 'assets/interface/interfazDetails.png');
		
		this.load.image('intPrincipal', 'assets/interface/Gameplay/Principal.png');
		this.load.image('intMision', 'assets/interface/Gameplay/btnMision.png');
		this.load.image('intAnuncios', 'assets/interface/Gameplay/btnAnuncios.png');
		this.load.image('intRanking', 'assets/interface/Gameplay/btnRanking.png');
		this.load.image('cortina', 'assets/interface/Cortina.png');
		this.load.image('panelAnuncio', 'assets/interface/Gameplay/Panel.png');
		this.load.image('panelAnuncioEng', 'assets/interface/Gameplay/panelAds.png');
		this.load.image('panelSusto', 'assets/interface/Gameplay/halloween.png');
		this.load.image('panelRanking', 'assets/interface/Gameplay/Ranking.png');
		
		this.load.image('iconoDetalles', 'assets/interface/iconoDetalles.png');
		this.load.image('iconoEdificio', 'assets/interface/iconoEdificio.png');
		this.load.image('iconoMejoras', 'assets/interface/iconoMejoras.png');
		this.load.image('iconoComprar', 'assets/interface/iconoComprar.png');
		this.load.image('iconoVender', 'assets/interface/iconoVender.png');
		this.load.image('iconoOfertas', 'assets/interface/iconoOfertas.png');
		
		this.load.image('panelCExtraccion', 'assets/interface/Secciones/panelCExtraccion.png');
		this.load.image('panelCMando', 'assets/interface/Secciones/panelCMando.png');
		this.load.image('panelCOperaciones', 'assets/interface/Secciones/panelCOperaciones.png');
		this.load.image('panelGenerador', 'assets/interface/Secciones/panelGenerador.png');
		this.load.image('panelLInvestigacion', 'assets/interface/Secciones/panelLInvestigacion.png');
		this.load.image('panelTaller', 'assets/interface/Secciones/panelTaller.png');
		this.load.image('panelBViviendas', 'assets/interface/Secciones/panelBViviendas.png');
		this.load.image('panelCAdministrativo', 'assets/interface/Secciones/panelCAdministrativo.png');
		this.load.image('panelCComercio', 'assets/interface/Secciones/panelCComercio.png');
		
		this.load.image('households', 'assets/interface/Secciones/households.png');
		this.load.image('administrationCenter', 'assets/interface/Secciones/administrationCenter.png');
		this.load.image('tradeCenter', 'assets/interface/Secciones/tradeCenter.png');
		this.load.image('extractionPlatform', 'assets/interface/Secciones/extractionPlatform.png');
		this.load.image('commandCenter', 'assets/interface/Secciones/commandCenter.png');
		this.load.image('operationsCenter', 'assets/interface/Secciones/operationsCenter.png');
		this.load.image('generator', 'assets/interface/Secciones/generator.png');
		this.load.image('laboratory', 'assets/interface/Secciones/laboratory.png');
		this.load.image('workshop', 'assets/interface/Secciones/workshop.png');
		
		//Comercio
		this.load.image('intCMejoras', 'assets/interface/Comercio/MejorasComercio.png');
		this.load.image('intCDetalles', 'assets/interface/Comercio/DetallesComercio.png');
		this.load.image('intCComprar', 'assets/interface/Comercio/ComprarComercio.png');
		this.load.image('intCVender', 'assets/interface/Comercio/VenderComercio.png');
		this.load.image('intCOfertas', 'assets/interface/Comercio/misOfertasComercio.png');
		//Comercio en Ingles
		this.load.image('intCUpdates', 'assets/interface/Comercio/updates.png');
		this.load.image('intCDetails', 'assets/interface/Comercio/details.png');
		this.load.image('intCBuy', 'assets/interface/Comercio/buy.png');
		this.load.image('intCSell', 'assets/interface/Comercio/sell.png');
		this.load.image('intCMyOffers', 'assets/interface/Comercio/myoffers.png');
		
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
		this.load.image('metalIcon', 'assets/interface/Gameplay/metalFloat.png');
		this.load.image('clayIcon', 'assets/interface/Gameplay/arcillaFloat.png');
		this.load.image('energyIcon', 'assets/sprites/stone.png');
		this.load.image('creditIcon', 'assets/interface/Gameplay/creditosFloat.png');
		this.load.spritesheet('starIcon', 'assets/interface/estrella.png', {frameWidth:41,frameHeight:39});
		
		//Texts
		this.load.html('rankingmenu', 'assets/text/rankingmenu.html');
		this.load.html('centroComercioMenu', 'assets/text/centroComercioMenu.html');
		this.load.html('centroComercioMenuV', 'assets/text/centroComercioMenuV.html');
		this.load.html('centroComercioMenuO', 'assets/text/centroComercioMenuO.html');
		

		var url;		  
        url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexpinchplugin.min.js';
        this.load.plugin('rexpinchplugin', url, true);
    }
    create (data)  {
		
    }
    update(time, delta) {
    	if (game.global.loaded) {
    		
    		game.scene.stop('PreloadGameScene');
    	}
    }
}