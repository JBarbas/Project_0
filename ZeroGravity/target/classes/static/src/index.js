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
				  		CentroAdministrativoMenu,
				  		PlataformaExtraccionMenu,
				  		TallerMenu]
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
		edificioEnConstruccion : null,
		edificioSubiendoNivel: null,
		inMenu : false,
		buildingMenu: {
			x: 50,
			y: 50,
			width: 584,
			height: 908
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
				case 'taller':
					edificio = new Taller(e.x, e.y);
					break;
				case 'plataformaExtraccion':
					edificio = new PlataformaExtraccion(e.x, e.y);
					edificio.lleno = e.lleno;
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
					case 'taller':
						edificio = new Taller(e.x, e.y);
						break;
					case 'plataformaExtraccion':
						edificio = new PlataformaExtraccion(e.x, e.y);
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
			break;
			
		case 'EDIFICIO PRODUCIENDO':
			if (game.global.DEBUG_MODE) {
				console.log('[DEBUG] EDIFICIO PRODUCIENDO message recieved');
				console.dir(msg);
			}
			if (typeof game.global.edificios.get(msg.id) !== 'undefined') {
				game.global.edificios.get(msg.id).inicioProduccion = Date.now();
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
			edificioLleno.build(game.scene.getScene('GameScene'));
			break;
			
		case 'CERAMICA RECOLECTADA':
			if (game.global.DEBUG_MODE) {
				console.log('[DEBUG] CERAMICA RECOLECTADA message recieved');
				console.dir(msg);
			}
			game.global.resources.ceramica = msg.ceramica;
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
