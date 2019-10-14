WebFontConfig = {
google: { families: ["Roboto Condensed"] }
};
(function() {
	var wf = document.createElement('script');
	wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
	'://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
	wf.type = 'text/javascript';
	wf.async = 'true';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(wf, s);
	})();

window.onload = function() {
	
	config = {
			  type: Phaser.AUTO,
			  scale: {
			        mode: Phaser.Scale.FIT,
			        parent: 'phaser-example',
			        autoCenter: Phaser.Scale.CENTER_BOTH,
			        width: 1920,
			        height: 1080			        
			  },
			  parent: 'phaser-example',
			  dom: {
			        createContainer: true
			  },
			  backgroundColor: "#000000",
			  scene: [	
				  		BootScene,
				  		PreloadScene,
				  		IntroScene,
				  		LogInScene,
				  		RegisterScene,
				  		MenuScene,
				  		DifficultScene,
				  		OptionsScene,
				  		CreditsScene,
				  		PreloadGameScene,
				  		GameScene,
				  		GameInterface,
				  		CentroMandoMenu,
				  		CentroOperacionesMenu,
				  		BloqueViviendasMenu,
				  		CentroAdministrativoMenu,
				  		CentroComercioMenu,
				  		GeneradorMenu,
				  		LaboratorioInvestigacionMenu,
				  		PlataformaExtraccionMenu,
				  		TallerMenu,
				  		AnuncioMenu]
			};
			
	
	game = new Phaser.Game(config);
	
	// GLOBAL VARIABLES
	game.global = {
		FPS : 30,
		DEBUG_MODE : true,
		ONLY_GAME_MODE : false,
		SKIP_INTRO: false,
		socket : null,
		loaded : false,
		myPlayer : new Object(),
		construyendo : false,
		expandiendo : false,
		edificioEnConstruccion : null,
		edificioSubiendoNivel: null,
		inMenu : false,
		menu : null,
		buildingMenu: {
			x: 1280,
			y: 120,
			width: 584,
			height: 908
		},
		intPrincipal:{
			x: 0,
			y: 0,
			width: 1920,
			height: 1080
		},
		btnMision:{
			x: 0,
			y: 310,
			width: 110,
			height: 117
		},
		btnAnuncios:{
			x: 0,
			y: 427,
			width: 110,
			height: 117
		},
		btnRanking:{
			x: 0,
			y: 544,
			width: 110,
			height: 117
		},
		btnOpciones:{
			x: 1870,
			y: 50,
			width: 78,
			height: 78
		},
		btnAnuncio:{
			x: 1350,
			y: 800,
			width: 300,
			height: 54
		},
		resources: {}
	}
	
	//WEBSOCKET CONFIGURATOR
	game.global.socket = new WebSocket("ws://localhost:8080/polaris")
	
	game.global.socket.onopen = () => {
		if (game.global.DEBUG_MODE) {
			console.log('[DEBUG] WebSocket connection opened.')
		}
	}
	
	game.global.socket.onclose = () => {
		if (game.global.DEBUG_MODE) {
			console.log('[DEBUG] WebSocket connection closed.')
		}
	}
	
	game.global.socket.onmessage = (message) => {
		var msg = JSON.parse(message.data)
		
		switch(msg.event){
		case 'LOGGED':
			if (game.global.DEBUG_MODE) {
				console.log('[DEBUG] LOGGED message recieved')
				console.dir(msg);
			}
			if (game.scene.isActive('LogInScene')) {
				game.scene.run('MenuScene');
	    		game.scene.stop('LogInScene');
			}
			else if (game.scene.isActive('RegisterScene')) {
				game.scene.run('MenuScene');
	    		game.scene.stop('RegisterScene');
			}
			break;
		case 'PLAYER INFO':
			if (game.global.DEBUG_MODE) {
				console.log('[DEBUG] PLAYER INFO message recieved')
				console.dir(msg);
			}
			game.global.grid = new Array();
			for (var i = 0; i < msg.grid.length; i++) {
				game.global.grid.push(new Array());
				for (var j = 0; j < msg.grid[i].length; j++) {
					game.global.grid[i].push({type: msg.grid[i][j]});
				}
			}
			game.global.edificios = new Map();
			for (var i = 0; i < msg.edificios.length; i++) {
				var e = msg.edificios[i];
				var edificio = new Edificio(0, 0);
				switch (e.sprite) {
				case 'centroDeMando':
					edificio = new CentroMando(e.x, e.y);
					break;
				case 'centroOperaciones':
					edificio = new CentroOperaciones(e.x, e.y);
					break;
				case 'centroAdministrativo':
					edificio = new CentroAdministrativo(e.x, e.y);
					break;
				case 'bloqueViviendas':
					edificio = new BloqueViviendas(e.x, e.y);
					break;
				case 'taller':
					edificio = new Taller(e.x, e.y);
					break;
				case 'plataformaExtraccion':
					edificio = new PlataformaExtraccion(e.x, e.y);
					edificio.lleno = e.lleno;
					// Las sumas y restas a los parametros estan hechas a mano para que cuadren (No se por que va mal)
					edificio.inicioProduccion = Date.UTC(e.dateYear, e.dateMonth-1, e.dateDay, e.dateHour-2, e.dateMinute+1, 0);
					break;
				case 'centroComercio':
					edificio = new CentroComercio(e.x, e.y);
					break;
				case 'generador':
					edificio = new Generador(e.x, e.y);
					break;
				case 'laboratorioInvestigacion':
					edificio = new LaboratorioInvestigacion(e.x, e.y);
					edificio.lleno = e.lleno;
					// Las sumas y restas a los parametros estan hechas a mano para que cuadren (No se por que va mal)
					edificio.inicioProduccion = Date.UTC(e.dateYear, e.dateMonth-1, e.dateDay, e.dateHour-2, e.dateMinute+1, 0);
					break;
				default:
					break;
				}
				edificio.level = e.level;
				edificio.id = e.id;
				game.global.edificios.set(edificio.id, edificio);
			}
			game.global.loaded = true;
			break;
			
		case 'REFRESH GRID':
			if (game.global.DEBUG_MODE) {
				console.log('[DEBUG] REFRESH GRID message recieved')
				console.dir(msg);
			}
			for (var i = 0; i < msg.edificios.length; i++) {
				var e = msg.edificios[i];
				var edificio = game.global.edificios.get(e.id);
				if (typeof edificio === 'undefined') {
					switch (e.sprite) {
					case 'centroDeMando':
						edificio = new CentroMando(e.x, e.y);
						break;
					case 'centroOperaciones':
						edificio = new CentroOperaciones(e.x, e.y);
						break;
					case 'centroAdministrativo':
						edificio = new CentroAdministrativo(e.x, e.y);
						break;
					case 'bloqueViviendas':
						edificio = new BloqueViviendas(e.x, e.y);
						break;
					case 'taller':
						edificio = new Taller(e.x, e.y);
						break;
					case 'plataformaExtraccion':
						edificio = new PlataformaExtraccion(e.x, e.y);
						break;
					case 'centroComercio':
						edificio = new CentroComercio(e.x, e.y);
						break;
					case 'generador':
						edificio = new Generador(e.x, e.y);
						break;
					case 'laboratorioInvestigacion':
						edificio = new LaboratorioInvestigacion(e.x, e.y);
						break;
					default:
						break;
					}
					edificio.id = e.id;
					game.global.edificios.set(edificio.id, edificio);
				}
				else {
					edificio.x = e.x;
					edificio.y = e.y;
				}
			}
			game.global.resources.energia = msg.energia;
			game.global.resources.metal = msg.metal;
			game.global.resources.ceramica = msg.ceramica;
			game.global.resources.creditos = msg.creditos;
			game.global.resources.unionCoins = msg.unionCoins;
			game.global.resources.colonos = msg.colonos;
			refreshGrid(game.scene.getScene('GameScene'), msg.grid);
			break;
		
		case 'GET_PLAYER_RESOURCES':
			if (game.global.DEBUG_MODE) {
				console.log('[DEBUG] Recibiendo recursos del jugador');
				console.dir(msg);
			}
			game.global.resources.energia = msg.energia;
			game.global.resources.metal = msg.metal;
			game.global.resources.ceramica = msg.ceramica;
			game.global.resources.creditos = msg.creditos;
			game.global.resources.unionCoins = msg.unionCoins;
			game.global.resources.colonos = msg.colonos;
			break;
			
		case 'EDIFICIO PRODUCIENDO':
			if (game.global.DEBUG_MODE) {
				console.log('[DEBUG] EDIFICIO PRODUCIENDO message recieved');
				console.dir(msg);
			}
			if (typeof game.global.edificios !== 'undefined') {
				if (typeof game.global.edificios.get(msg.id) !== 'undefined') {
					game.global.edificios.get(msg.id).inicioProduccion = Date.now();
					game.global.edificios.get(msg.id).produciendo = true;
				}
			}

			console.log('Energia', msg.energia);
			console.log('Metal', msg.metal);
			console.log('Ceramica', msg.ceramica);
			console.log('UnionCoins', msg.unionCoins);
			game.global.recursos =  {energia: msg.energia, metal: msg.metal, ceramica: msg.ceramica, creditps: msg.creditos};
			break;
		
		case 'ANSWER_LEVELUP_BUILDING':
			if (game.global.DEBUG_MODE) {
				console.log('[DEBUG] respuesta a la peticion subir de nivel');
				console.log(msg.resultado);
			}	
			if(msg.resultado){
				levelUp(game.global.edificios.get(msg.id));
			}
			break;		
		
		case 'EDIFICIO LLENO':
			if (game.global.DEBUG_MODE) {
				console.log('[DEBUG] EDIFICIO LLENO message recieved');
				console.dir(msg);
			}
			let edificioLleno = game.global.edificios.get(msg.id);
			edificioLleno.lleno = true;
			game.global.edificios.get(msg.id).produciendo = false;
			edificioLleno.build(game.scene.getScene('GameScene'));
			break;
			
		case 'CERAMICA RECOLECTADA':
			if (game.global.DEBUG_MODE) {
				console.log('[DEBUG] CERAMICA RECOLECTADA message recieved');
				console.dir(msg);
			}
			game.global.resources.ceramica = msg.ceramica;
			break;
		case 'CREDITOS RECOLECTADOS':
			if (game.global.DEBUG_MODE) {
				console.log('[DEBUG] CREDITOS RECOLECTADOS message recieved');
				console.dir(msg);
			}
			game.global.resources.creditos = msg.creditos;
			break;
		case 'PLATAFORMA EXTRACCION MENU':
			if (game.global.DEBUG_MODE) {
				console.log('[DEBUG] PLATAFORMA EXTRACCION MENU message recieved');
				console.dir(msg);
			}
			game.scene.getScene("PlataformaExtraccionMenu").colonos.text = "Colonos: " + msg.colonos;
			if (msg.colonos.split("/")[0] >= msg.colonos.split("/")[1]) {
				game.global.edificios.get(msg.id).produciendo = true;
			}
			else {
				game.global.edificios.get(msg.id).produciendo = false;
			}
			break;
		case 'LABORATORIO INVESTIGACION MENU':
			if (game.global.DEBUG_MODE) {
				console.log('[DEBUG] LABORATORIO INVESTIGACION MENU message recieved');
				console.dir(msg);
			}
			game.scene.getScene("LaboratorioInvestigacionMenu").colonos.text = "Colonos: " + msg.colonos;
			if (msg.colonos.split("/")[0] >= msg.colonos.split("/")[1]) {
				game.global.edificios.get(msg.id).produciendo = true;
			}
			else {
				game.global.edificios.get(msg.id).produciendo = false;
			}
			break;
		case 'JOBS':
			if (game.global.DEBUG_MODE) {
				console.log('[DEBUG] JOBS message recieved');
				console.dir(msg);
			}
			game.scene.getScene("CentroAdministrativoMenu").puestosTrabajo.text = "Puestos de trabajo disponibles: " + msg.jobs;
			let viviendas = game.global.resources.colonos.split("/")[1] - game.global.resources.colonos.split("/")[0];
			if (msg.jobs >= 1 && viviendas >= 1) {
				game.scene.getScene("CentroAdministrativoMenu").colonos.canRequest = true;
				game.scene.getScene("CentroAdministrativoMenu").colonos.alpha = 1;
			}
			break;
		case 'ENVIO DE COLONOS':
			if (game.global.DEBUG_MODE) {
				console.log('[DEBUG] ENVIO DE COLONOS message recieved');
				console.dir(msg);
			}
			game.global.resources.colonos = msg.colonos;
			game.scene.getScene("CentroAdministrativoMenu").puestosTrabajo.text = "Puestos de trabajo disponibles: " + msg.jobs;
			let viviendas2 = game.global.resources.colonos.split("/")[1] - game.global.resources.colonos.split("/")[0];
			game.scene.getScene("CentroAdministrativoMenu").viviendas.text = "Viviendas disponibles: " + viviendas2;
			if (msg.jobs < 1 || viviendas2 < 1) {
				game.scene.getScene("CentroAdministrativoMenu").colonos.canRequest = false;
				game.scene.getScene("CentroAdministrativoMenu").colonos.alpha = 0.5;
			}
			break;
		case 'CREDITOS INSUFICIENTES':
			if (game.global.DEBUG_MODE) {
				console.log('[DEBUG] CREDITOS INSUFICIENTES message recieved');
				console.dir(msg);
			}
			alert("Necesitas " + msg.cantidad + " créditos más para poder expandir la base");
			break;
		default:
			if (game.global.DEBUG_MODE) {
				console.log('[DEBUG] UNKNOWN message recieved')
				console.dir(msg);
			}
			break;		
		}
	}
}
