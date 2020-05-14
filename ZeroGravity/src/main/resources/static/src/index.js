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
				  		LoadGameplayScene,
				  		GameScene,
				  		GameVisitorScene,
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
				  		AnuncioMenu,
				  		RankingMenu,
				  		ConstruccionMenu,
				  		FriendsScene,
				  		TutorialScene]
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
		myPlayer : {
			gameStarted : false,
			isVisitor : false,
			cityName : 'your city',
			config : {
				volMusic : 100,
				volEffects : 100
			},
			cdcBlocked : true,
			cdoBlocked : true,
			labBlocked : true,
			caBlocked : false
		},
		myPlayerId: "",
		puntuacion: 0,
		mejoresPuntuaciones:[],
		ofertasListas : false,
		construyendo : false,
		canBuild : true,
		expandiendo : false,
		edificioEnConstruccion : null,
		edificioSubiendoNivel: null,
		inMenu : false,
		editMode : false,
		comercioMenuLast: 'edificio',
		inZoom : false,
		menu : null,
		recolecting : false,
		offers: [],
		buildingMenu: new Btn(1280,120,584,908),
		intPrincipal: new Btn(0,0,1920,1080),
		btnMision: new Btn(0,310,110,117),
		btnAnuncios: new Btn(0,427,110,117),
		btnRanking: new Btn(0,544,110,117),
		btnOpciones: new Btn(1870,50,78,78),
		btnAnuncio: new Btn(1350,800,300,54),
		cargando:null,
		timedEvent:null,
		timer:null,
		team:null,
		inGame:false,
		resources: {},
		music: null,
		sound: null,
		effects: {},
		musicMenu: null,
		ranking: 'all',
		idTuto: 1,
		imgChar: null,
		containerTut: null,
		cortina: null,
		textoTut: null,
		idioma : navigator.language
	}
	
	
	//Previamente se ha detectado el lenguaje del navegador, si es español se cambia a esp el idioma. Si no es español se pone en ingles
	if(navigator.language == "es-ES" || navigator.language == "es-AR"|| navigator.language == "es-CL"|| navigator.language == "es-BO"|| navigator.language == "es-CO"|| navigator.language == "es-CR"|| navigator.language == "es-DO" || navigator.language == "es-EC"|| navigator.language == "es-SV"|| navigator.language == "es-GT" || navigator.language == "es-HN"|| navigator.language == "es-MX"|| navigator.language == "es-NI"|| navigator.language == "es-PA"|| navigator.language == "es-PY"|| navigator.language == "es-PR"|| navigator.language == "es-UY"|| navigator.language == "es-VE"){
		game.global.idioma = "esp";
	}else{
		game.global.idioma = "eng";
	}

	//WEBSOCKET CONFIGURATOR
	game.global.socket = new WebSocket("ws://" + location.href.substring(7).split("/")[0] + "/polaris")
	
	game.global.socket.onopen = () => {
		if (game.global.DEBUG_MODE) {
			console.log('[DEBUG] WebSocket connection opened.')
		}
		setInterval(function(){ 
			let msg = new Object();
			msg.event = 'I AM HERE';
			game.global.socket.send(JSON.stringify(msg)); 
			}, 30000);
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
			game.global.musicMenu = game.sound.add('soundtrack');
	    	game.global.musicMenu.play();	    	
	    	game.global.musicMenu.setLoop(true);
	    	
	    	
			/*al hacer el login aprovecho para tener en el cliente su id*/
			game.global.myPlayerId = msg.playerId;
			game.global.myPlayer.gameStarted = msg.gameStarted;			
			game.global.myPlayer.cityName = msg.cityName;
			game.global.myPlayer.config.volMusic = msg.config.volMusic;
			game.global.myPlayer.config.volEffects = msg.config.volEffects;
			game.global.idioma = msg.config.lang;
			
			game.global.musicMenu.setVolume(game.global.myPlayer.config.volMusic/100);
			console.log(game.global.musicMenu.volume);
			if (typeof game.global.idioma === 'undefined' || game.global.idioma === null) {
				game.global.idioma = "eng";
			}
			if (game.scene.isActive('LogInScene')) {
				game.scene.run('MenuScene');
	    		game.scene.stop('LogInScene');
			}
			else if (game.scene.isActive('RegisterScene')) {
				game.scene.run('MenuScene');
	    		game.scene.stop('RegisterScene');
			}
			/*y yo aprovecho para precargar las puntuaciones y las ofertas disponibles*/
			pedirPuntuaciones();
			pedirOfertas();
			break;
		case 'LOGIN FAILED':
			if (game.global.DEBUG_MODE) {
				console.log('[DEBUG] LOGIN FAILED message recieved')
				console.dir(msg);
			}
				Swal.fire({
				  icon: 'error',
				  title: 'Oops...',
				  text: msg.data
				});
			break;
		case 'UPDATE USERNAME RESPONSE':
			if (game.global.DEBUG_MODE) {
				console.log('[DEBUG] UPDATE USERNAME RESPONSE message recieved')
				console.dir(msg);
			}
			Swal.fire({
				  icon: 'success',
				  title: 'Nice!',
				  text: msg.resultado
				});
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
					edificio.jobs = e.jobs;
					edificio.numColonos = e.numColonos;
					for (var j = 0; j < e.robots.length; j++) {
						var r = new Robot(e.robots[j].id, Date.UTC(e.robots[j].dateYear, e.robots[j].dateMonth-1, e.robots[j].dateDay, e.robots[j].dateHour, e.robots[j].dateMinute+1, 0));
						r.ausente = e.robots[j].ausente;
						r.carga = e.robots[j].carga;
						r.nivel = e.robots[j].nivel;
						edificio.robots.set(r.id, r);
					}
					break;
				case 'plataformaExtraccion':
					edificio = new PlataformaExtraccion(e.x, e.y);
					edificio.jobs = e.jobs;
					edificio.numColonos = e.numColonos;
					edificio.lleno = e.lleno;
					edificio.levelProduciendo = e.levelProduciendo;
					// Las sumas y restas a los parametros estan hechas a mano para que cuadren (No se por que va mal)
					edificio.inicioProduccion = Date.UTC(e.dateYear, e.dateMonth-1, e.dateDay, e.dateHour, e.dateMinute+1, 0);
					break;
				case 'centroComercio':
					edificio = new CentroComercio(e.x, e.y);
					break;
				case 'generador':
					edificio = new Generador(e.x, e.y);
					edificio.jobs = e.jobs;
					edificio.numColonos = e.numColonos;
					break;
				case 'laboratorioInvestigacion':
					edificio = new LaboratorioInvestigacion(e.x, e.y);
					edificio.lleno = e.lleno;
					edificio.levelProduciendo = e.levelProduciendo;
					// Las sumas y restas a los parametros estan hechas a mano para que cuadren (No se por que va mal)
					edificio.inicioProduccion = Date.UTC(e.dateYear, e.dateMonth-1, e.dateDay, e.dateHour, e.dateMinute+1, 0);
					break;
				default:
					break;
				}
				edificio.level = e.level;
				edificio.id = e.id;
				edificio.enConstruccion = e.enConstruccion;
				edificio.inicioConstruccion = Date.UTC(e.construccionDateYear, e.construccionDateMonth-1, e.construccionDateDay, e.construccionDateHour, e.construccionDateMinute+1, 0);
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
					edificio.enConstruccion = e.enConstruccion;
					edificio.inicioConstruccion = Date.UTC(e.construccionDateYear, e.construccionDateMonth-1, e.construccionDateDay, e.construccionDateHour, e.construccionDateMinute+1, 0);
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
			game.global.puntuacion = msg.punctuacion;
			refreshGrid(game.scene.getScene('GameScene'), msg.grid);
			break;
		
		case 'GET_PLAYER_RESOURCES':
			
			if (game.global.DEBUG_MODE) {
				console.log('[DEBUG] Recibiendo recursos del jugador');
				console.dir(msg);
				
			}
			
			//game.global.effects.setVolume(game.global.myPlayer.config.volEffects);
			if(game.global.resources.energia != msg.energia){
				game.global.resources.energia = msg.energia;
				game.global.effects.cambianRecursos.play();
	    		game.global.effects.cambianRecursos.setVolume(game.global.myPlayer.config.volEffects/100);
			}
			if(game.global.resources.metal != msg.metal){
				game.global.resources.metal = msg.metal;
				game.global.effects.cambianRecursos.play();
	    		game.global.effects.cambianRecursos.setVolume(game.global.myPlayer.config.volEffects/100);
			}
			if(game.global.resources.ceramica != msg.ceramica){
				game.global.resources.ceramica = msg.ceramica;
				game.global.effects.cambianRecursos.play();
	    		game.global.effects.cambianRecursos.setVolume(game.global.myPlayer.config.volEffects/100);
			}
			if(game.global.resources.creditos != msg.creditos){
				game.global.resources.creditos = msg.creditos;
				game.global.effects.cambianRecursos.play();
	    		game.global.effects.cambianRecursos.setVolume(game.global.myPlayer.config.volEffects/100);

			}
			if(game.global.resources.unionCoins != msg.unionCoins){
				game.global.resources.unionCoins = msg.unionCoins;
				game.global.effects.cambianRecursos.play();
	    		game.global.effects.cambianRecursos.setVolume(game.global.myPlayer.config.volEffects/100);
			}
			if(game.global.resources.colonos != msg.colonos){
				game.global.resources.colonos = msg.colonos;
				//particulasRecurso("colonos");
				game.global.effects.cambianRecursos.play();
	    		game.global.effects.cambianRecursos.setVolume(game.global.myPlayer.config.volEffects/100);
			}
			game.global.puntuacion = msg.punctuacion;
			break;			
		case 'CONSTRUYENDO EDIFICIO':
			if (game.global.DEBUG_MODE) {
				console.log('[DEBUG] CONSTRUYENDO EDIFICIO message recieved');
				console.dir(msg);
			}
			if (typeof game.global.edificios !== 'undefined') {
				if (typeof game.global.edificios.get(msg.id) !== 'undefined') {
					game.global.edificios.get(msg.id).enConstruccion = true;
					game.global.edificios.get(msg.id).build(game.scene.getScene("GameScene"));
				}
			}
			break;
		case 'EDIFICIO CONSTRUIDO':
			if (game.global.DEBUG_MODE) {
				console.log('[DEBUG] EDIFICIO CONSTRUIDO message recieved');
				console.dir(msg);
			}
			
			if (typeof game.global.edificios !== 'undefined') {
				if (typeof game.global.edificios.get(msg.id) !== 'undefined') {
					game.global.effects.construido.play();
		    		game.global.effects.construido.setVolume(game.global.myPlayer.config.volEffects/100);
					game.global.edificios.get(msg.id).enConstruccion = false;
					game.global.edificios.get(msg.id).build(game.scene.getScene("GameScene"));
					clearInterval(game.global.edificios.get(msg.id).interval);
					if (typeof msg.jobs !== 'undefined') {
						game.global.edificios.get(msg.id).jobs = msg.jobs;
					}
				}
			}
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
					game.global.edificios.get(msg.id).levelProduciendo = game.global.edificios.get(msg.id).level;
				}
			}
			break;
		case 'ROBOT PRODUCIENDO':
			if (game.global.DEBUG_MODE) {
				console.log('[DEBUG] ROBOT PRODUCIENDO message recieved');
				console.dir(msg);
			}
			if (typeof game.global.edificios !== 'undefined') {
				if (typeof game.global.edificios.get(msg.taller) !== 'undefined') {
					if (typeof game.global.edificios.get(msg.taller).robots !== 'undefined') {
						if (typeof game.global.edificios.get(msg.taller).robots.get(msg.id) !== 'undefined') {
							game.global.edificios.get(msg.taller).robots.get(msg.id).inicioProduccion = Date.now();
						}
					}
				}
			}
			break;		
		case 'ANSWER_LEVELUP_BUILDING':
			if (game.global.DEBUG_MODE) {
				console.log('[DEBUG] respuesta a la peticion subir de nivel');
				console.log(msg.resultado);
			}	
			if(msg.resultado){
				levelUp(game.global.edificios.get(msg.id));
				var edif = game.global.edificios.get(msg.id);
				var effect = game.scene.getScene('GameScene').anims.create({ key: 'animNextLevel', frames: game.scene.getScene('GameScene').anims.generateFrameNames('nextlvl1x1')});
				var effect2 = game.scene.getScene('GameScene').anims.create({ key: 'animNextLevelLarge', frames: game.scene.getScene('GameScene').anims.generateFrameNames('nextlvl1x2')});
				
				//Sacamos coordenadas cartesianas
				var position = new Phaser.Geom.Point(edif.x*tile_width/2 , edif.y*tile_height);
	            position = cartesianToIsometric(position);
	            
	            //Ejecutamos sonido de subir nivel
	            game.global.effects.subirNivel.play();
	    		game.global.effects.pulsarBoton.setVolume(game.global.myPlayer.config.volEffects/100); 
	    		
	    		//Se crean las animaciones segun el tamaño del edificio
	    		if(edif.width === 2 && edif.height === 2){
	    			//Guay
	    			var effectPlay = game.scene.getScene('GameScene').add.sprite(position.x+tileMap_width*tile_width/2-10, position.y +200, 'nextlvl1x1').play('animNextLevel').setScale(1.4);
	    		}else if(edif.width === 1 && edif.height === 2){
	    			//
	    			var effectPlay = game.scene.getScene('GameScene').add.sprite((position.x+tileMap_width*tile_width/2)-25, position.y +85, 'nextlvl1x2').play('animNextLevelLarge').setScale(0.65);
	    		}else if(edif.width === 2 && edif.height === 1){
	    			var effectPlay = game.scene.getScene('GameScene').add.sprite((position.x+tileMap_width*tile_width/2)+25, position.y +85, 'nextlvl1x2').play('animNextLevelLarge').setScale(0.65).setFlip(true,false);
	    		}else{
	    			//Guay
		    		var effectPlay = game.scene.getScene('GameScene').add.sprite((position.x+tileMap_width*tile_width/2)-5, position.y +90, 'nextlvl1x1').play('animNextLevel').setScale(0.65);
	    		}
				effectPlay.setOrigin(edif.originX,1);
				effectPlay.depth = game.global.edificios.get(msg.id).gameObject.depth;
				pedirPuntuaciones()
				
			}else{
				Swal.fire({
					  icon: 'warning',
					  text: "No dispones de los recursos para aumentar de nivel a este edificio",
					  showClass: {
					    popup: 'animated fadeInDown faster'
					  },
					  hideClass: {
					    popup: 'animated fadeOutUp faster'
					  }
					});
			}	
			break;		
		
		case 'EDIFICIO LLENO':
			if (game.global.DEBUG_MODE) {
				console.log('[DEBUG] EDIFICIO LLENO message recieved');
				console.dir(msg);
			}
			game.global.effects.recursosMaximos.play();
    		game.global.effects.recursosMaximos.setVolume(game.global.myPlayer.config.volEffects/100);
			let edificioLleno = game.global.edificios.get(msg.id);
			edificioLleno.lleno = true;
			game.global.edificios.get(msg.id).produciendo = false;
			edificioLleno.build(game.scene.getScene('GameScene'));
			break;
		case 'ROBOT DE VUELTA':
			if (game.global.DEBUG_MODE) {
				console.log('[DEBUG] ROBOT DE VUELTA message recieved');
				console.dir(msg);
			}
			let tallerLleno = game.global.edificios.get(msg.taller);
			if (game.scene.isActive('TallerMenu')) {
				game.scene.stop('TallerMenu');
				game.scene.start('TallerMenu', {miEdificio: game.global.edificios.get(msg.id)});
			}
			else {
				tallerLleno.lleno = true;
				game.global.edificios.get(msg.id).produciendo = false;
				tallerLleno.build(game.scene.getScene('GameScene'));
			}
			break;
		case 'CERAMICA RECOLECTADA':
			
			if (game.global.DEBUG_MODE) {
				console.log('[DEBUG] CERAMICA RECOLECTADA message recieved');
				console.dir(msg);
			}
			game.global.effects.cambianRecursos.play();
    		game.global.effects.cambianRecursos.setVolume(game.global.myPlayer.config.volEffects/100);
			game.global.resources.ceramica = msg.ceramica;
			particulasRecurso("ceramica");
			pedirPuntuaciones()
			break;
		case 'CREDITOS RECOLECTADOS':
			if (game.global.DEBUG_MODE) {
				console.log('[DEBUG] CREDITOS RECOLECTADOS message recieved');
				console.dir(msg);
			}
			game.global.effects.cambianRecursos.play();
    		game.global.effects.cambianRecursos.setVolume(game.global.myPlayer.config.volEffects/100);
			game.global.resources.creditos = msg.creditos;
			particulasRecurso("creditos");
			pedirPuntuaciones()
			break;
		case 'METAL RECOLECTADO':
			if (game.global.DEBUG_MODE) {
				console.log('[DEBUG] METAL RECOLECTADO message recieved');
				console.dir(msg);
			}
			game.global.effects.cambianRecursos.play();
    		game.global.effects.cambianRecursos.setVolume(game.global.myPlayer.config.volEffects/100);
			game.global.resources.metal = msg.metal;
			particulasRecurso("metal");
			if (game.scene.isActive('TallerMenu')) {
				game.scene.stop('TallerMenu');
				game.scene.start('TallerMenu', {miEdificio: game.global.edificios.get(msg.id)});
			}
			pedirPuntuaciones()
			break;
		case 'PLATAFORMA EXTRACCION MENU':
			if (game.global.DEBUG_MODE) {
				console.log('[DEBUG] PLATAFORMA EXTRACCION MENU message recieved');
				console.dir(msg);
			}
			if (!game.global.edificios.get(msg.id).enConstruccion) {
				game.scene.getScene("PlataformaExtraccionMenu").colonos.text = game.cache.xml.get(game.global.idioma).getElementsByTagName('colonos')[0].childNodes[0].nodeValue + msg.colonos;
				game.scene.getScene("PlataformaExtraccionMenu").energia.text = game.cache.xml.get(game.global.idioma).getElementsByTagName('energia')[0].childNodes[0].nodeValue + msg.energia + "/" + msg.energiaNecesaria;
			}
			game.global.edificios.get(msg.id).produciendo = msg.produciendo;
			break;
		case 'LABORATORIO INVESTIGACION MENU':
			if (game.global.DEBUG_MODE) {
				console.log('[DEBUG] LABORATORIO INVESTIGACION MENU message recieved');
				console.dir(msg);
			}
			game.scene.getScene("LaboratorioInvestigacionMenu").colonos.text = game.cache.xml.get(game.global.idioma).getElementsByTagName('colonos')[0].childNodes[0].nodeValue + msg.colonos;
			game.scene.getScene("LaboratorioInvestigacionMenu").energia.text = game.cache.xml.get(game.global.idioma).getElementsByTagName('energia')[0].childNodes[0].nodeValue + msg.energia + "/" + msg.energiaNecesaria;
			game.global.edificios.get(msg.id).produciendo = msg.produciendo;
			break;
		case 'BLOQUE VIVIENDAS MENU':
			if (game.global.DEBUG_MODE) {
				console.log('[DEBUG] BLOQUE VIVIENDAS MENU message recieved');
				console.dir(msg);
			}
			if (!game.global.edificios.get(msg.id).enConstruccion) {
				game.scene.getScene("BloqueViviendasMenu").colonos.text = game.cache.xml.get(game.global.idioma).getElementsByTagName('colonos')[0].childNodes[0].nodeValue + msg.colonos;
			}
			break;
		case 'TALLER MENU':
			if (game.global.DEBUG_MODE) {
				console.log('[DEBUG] TALLER MENU message recieved');
				console.dir(msg);
			}
			game.scene.getScene("TallerMenu").colonos.text = game.cache.xml.get(game.global.idioma).getElementsByTagName('colonos')[0].childNodes[0].nodeValue + msg.colonos;
			game.scene.getScene("TallerMenu").energia.text = game.cache.xml.get(game.global.idioma).getElementsByTagName('energia')[0].childNodes[0].nodeValue + msg.energia + "/" + msg.energiaNecesaria;
			for (var i = 0; i < msg.robots.length; i++) {
				var robot = game.global.edificios.get(msg.id).robots.get(msg.robots[i].id);
				if (typeof robot === "undefined") {
					robot = new Robot(msg.robots[i].id);
					console.log('Robot ' + msg.robots[i].id + " no estaba");
				}
				robot.ausente = msg.robots[i].ausente;
				robot.nivel = msg.robots[i].nivel;
				game.global.edificios.get(msg.id).robots.set(robot.id, robot);
				robot.x = game.scene.getScene("TallerMenu").robotsX;
				robot.y = game.scene.getScene("TallerMenu").robotsY[i];
				//game.scene.getScene("TallerMenu").add.image(robotX, robotY, robot.sprite).setOrigin(0, 0);
				game.scene.getScene("TallerMenu").edificiosContainer.add(game.scene.getScene("TallerMenu").add.image(robot.x, robot.y, robot.sprite + robot.nivel).setOrigin(0, 0));
				if (!robot.ausente) {
					if (robot.nivel < 3) {
						let btnNivel = game.scene.getScene("TallerMenu").add.image(robot.x + 370, robot.y + 70, 'btnSubirNivelRobot').setOrigin(0, 0.5).setInteractive();
						btnNivel.id = robot.id;
						btnNivel.on('pointerover',function(pointer){
				    	    this.setFrame(1);
				    	})
				    	btnNivel.on('pointerout',function(pointer){
				    	    this.setFrame(0);
				    	})			    	
				    	btnNivel.on('pointerdown', function(pointer, localX, localY, event){
				    		let msgBack = new Object();
				    		msgBack.event = 'ASK_LEVELUP_ROBOT';
				    		msgBack.taller = msg.id;
				    		msgBack.id = this.id;
				    		game.global.socket.send(JSON.stringify(msgBack));
				    	});
						game.scene.getScene("TallerMenu").edificiosContainer.add(btnNivel);
					}
					if (msg.robots[i].carga > 0) {
						let btnRecolectar = game.scene.getScene("TallerMenu").add.image(robot.x + 160, robot.y + 70, 'btnRecolectar').setOrigin(0, 0.5).setInteractive();
						btnRecolectar.id = robot.id;
						btnRecolectar.on('pointerover',function(pointer){
				    	    this.setFrame(1);
				    	})
				    	btnRecolectar.on('pointerout',function(pointer){
				    	    this.setFrame(0);
				    	})			    	
				    	btnRecolectar.on('pointerdown', function(pointer, localX, localY, event){
				    		let msgBack = new Object();
				    		msgBack.event = 'RECOLECTAR ROBOT';
				    		msgBack.id = msg.id;
				    		msgBack.robotId = this.id;
				    		game.global.socket.send(JSON.stringify(msgBack));
				    		this.destroy();
				    	});
						game.scene.getScene("TallerMenu").edificiosContainer.add(btnRecolectar);
					}
					else {
						robot.btnEnviar = game.scene.getScene("TallerMenu").add.image(robot.x + 160, robot.y + 70, 'btnEnviar').setOrigin(0, 0.5).setInteractive();
						robot.btnEnviar.id = robot.id;
						robot.btnEnviar.i = i;
						if (msg.energia >= msg.energiaNecesaria && msg.colonos.split("/")[0] >= msg.colonos.split("/")[1]) {
							robot.btnEnviar.on('pointerover',function(pointer){
					    	    this.setFrame(1);
					    	});
					    	robot.btnEnviar.on('pointerout',function(pointer){
					    	    this.setFrame(0);
					    	});		    	
					    	robot.btnEnviar.on('pointerdown', function(pointer, localX, localY, event){
					    		let msgBack = new Object();
					    		msgBack.event = 'ENVIAR';
					    		msgBack.tallerId = msg.id;
					    		msgBack.robotId = this.id;
					    		game.global.socket.send(JSON.stringify(msgBack));
					    		this.destroy();
					    		if (typeof game.scene.getScene("TallerMenu").times[this.i] === "undefined") {
					    			game.scene.getScene("TallerMenu").times[this.i] = {};
					    		}
					    		game.scene.getScene("TallerMenu").times[this.i].robot = game.global.edificios.get(msg.id).robots.get(this.id);
					    		let posX = game.global.edificios.get(msg.id).robots.get(this.id).x + 160;
					    		let posY = game.global.edificios.get(msg.id).robots.get(this.id).y + 70;
					    		game.scene.getScene("TallerMenu").times[this.i].timeLeftText = 
					    			game.scene.getScene("TallerMenu").add.text(posX, posY, '', { fontFamily: '"Roboto Condensed"', color: 'white' });
					    	});
						}
						else {
							robot.btnEnviar.alpha = 0.5;
						}
						game.scene.getScene("TallerMenu").edificiosContainer.add(robot.btnEnviar);
					}
				}
				else {
					game.scene.getScene("TallerMenu").times[i] = {};
		    		game.scene.getScene("TallerMenu").times[i].robot = game.global.edificios.get(msg.id).robots.get(robot.id);
		    		game.scene.getScene("TallerMenu").times[i].timeLeftText = 
		    			game.scene.getScene("TallerMenu").add.text(robot.x + 160, robot.y + 70, '', { fontFamily: '"Roboto Condensed"', color: 'white' });
					game.scene.getScene("TallerMenu").edificiosContainer.add(game.scene.getScene("TallerMenu").times[i].timeLeftText);
					console.log(game.scene.getScene("TallerMenu").times[i].robot);
				}				
			}
			break;
		case 'CONSTRUCCION MENU':
			if (game.global.DEBUG_MODE) {
				console.log('[DEBUG] CONSTRUCCION MENU message recieved');
				console.dir(msg);
			}
			game.global.myPlayer.caBlocked = msg.caBlocked;
			break;
		case 'GENERADOR MENU':
			if (game.global.DEBUG_MODE) {
				console.log('[DEBUG] GENERADOR MENU message recieved');
				console.dir(msg);
			}
			if (!game.global.edificios.get(msg.id).enConstruccion) {
				game.scene.getScene("GeneradorMenu").colonos.text = game.cache.xml.get(game.global.idioma).getElementsByTagName('colonos')[0].childNodes[0].nodeValue + msg.colonos;
			}
			if (msg.colonos.split("/")[0] >= msg.colonos.split("/")[1]) {
				game.global.edificios.get(msg.id).produciendo = true;
			}
			else {
				game.global.edificios.get(msg.id).produciendo = false;
			}
			break;
		case 'REFRESH MENU':
			if (game.global.DEBUG_MODE) {
				console.log('[DEBUG] REFRESH MENU message recieved');
				console.dir(msg);
			}
			let edificioMenu = game.global.edificios.get(msg.id);
			if (edificioMenu !== null) {
				game.scene.stop(edificioMenu.menuScene);
				game.scene.start(edificioMenu.menuScene, {miEdificio: edificioMenu});
			}
			break;
		case 'REFRESH COMERCIO':
			if (game.global.DEBUG_MODE) {
				console.log('[DEBUG] REFRESH COMERCIO message recieved');
				console.dir(msg);
			}
			pedirOfertas();
			refrescarMenuComercio();
			/*si tiene abierto el centro de comercio lo refresca*/
			function refrescarMenuComercio() {
				  setTimeout(function(){ 
					  if(game.scene.isActive('CentroComercioMenu')){
						game.scene.stop('CentroComercioMenu');
						game.scene.start('CentroComercioMenu', {miEdificio: game.scene.getScene("CentroComercioMenu").miEdificio});
					} }, 1000);
			}
			
			break;
		case 'JOBS':
			if (game.global.DEBUG_MODE) {
				console.log('[DEBUG] JOBS message recieved');
				console.dir(msg);
			}
			game.scene.getScene("CentroAdministrativoMenu").puestosTrabajo.text = game.cache.xml.get(game.global.idioma).getElementsByTagName('capuestos')[0].childNodes[0].nodeValue + msg.jobs;
			let viviendas = game.global.resources.colonos.split("/")[1] - game.global.resources.colonos.split("/")[0];
			game.scene.getScene("CentroAdministrativoMenu").viviendas.text = game.cache.xml.get(game.global.idioma).getElementsByTagName('caviviendas')[0].childNodes[0].nodeValue + viviendas;
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
			game.global.effects.cambianRecursos.play();
    		game.global.effects.cambianRecursos.setVolume(game.global.myPlayer.config.volEffects/100);
			game.global.resources.colonos = msg.colonos;
			particulasRecurso("colonos");

			game.scene.getScene("CentroAdministrativoMenu").puestosTrabajo.text = game.cache.xml.get(game.global.idioma).getElementsByTagName('capuestos')[0].childNodes[0].nodeValue + msg.jobs;
			let viviendas2 = game.global.resources.colonos.split("/")[1] - game.global.resources.colonos.split("/")[0];
			game.scene.getScene("CentroAdministrativoMenu").viviendas.text = game.cache.xml.get(game.global.idioma).getElementsByTagName('caviviendas')[0].childNodes[0].nodeValue + viviendas2;
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
			
			Swal.fire({
				  icon: 'warning',
				  text: "Necesitas " + msg.cantidad + " créditos más para poder expandir la base",
				  showClass: {
				    popup: 'animated fadeInDown faster'
				  },
				  hideClass: {
				    popup: 'animated fadeOutUp faster'
				  }
				})
			
			break;
		case 'RESPUESTA CREAR OFERTA':
			if (game.global.DEBUG_MODE) {
				console.log('[DEBUG] RESPUESTA CREAR OFERTA message recieved');
				console.log(msg.respuesta);
			}
			if(!msg.respuesta){
				Swal.fire({
					  icon: 'warning',
					  text: "Necesitas más recursos para enviar esta oferta al mercado",
					  showClass: {
					    popup: 'animated fadeInDown faster'
					  },
					  hideClass: {
					    popup: 'animated fadeOutUp faster'
					  }
					})
			}else{
				let message = {		
						event: 'ASK_PLAYER_RESOURCES',
				}
				game.global.socket.send(JSON.stringify(message));
			}
			pedirOfertas();
			break;
			
		case 'SEND OFFERS':
			/*vaciamos las ofertas anteriores*/
			game.global.offers = [];
			/*guardamos las nuevas ofertas*/
			for(let i = 0; i < msg.ofertas.length; i++){
				let id = i;
				let idOferta = msg.ofertas[i].id;
				let playerId = msg.ofertas[i].playerId;
				let cantidad = msg.ofertas[i].cantidad;
				let recurso = msg.ofertas[i].recurso;
				let creditos = msg.ofertas[i].creditos;
				let oferta = new Oferta(idOferta, playerId, cantidad, recurso, creditos);
				game.global.offers[i] = oferta;
				game.global.ofertasListas = true;
			}
			break;
		
		case 'DELETED OFFER':
			let message = {		
				event: 'ASK_PLAYER_RESOURCES'
			}
			game.global.socket.send(JSON.stringify(message));
			pedirOfertas();
			break;
		
		case 'OFFER PURCHASED':
			if (game.global.DEBUG_MODE) {
				console.log('[DEBUG] RESPUESTA COMPRAR OFERTA message recieved');
				console.log(msg.respuesta);
			}
			if(!msg.respuesta){
				
				Swal.fire({
					  icon: 'error',
					  text: "Lo sentimos, esta oferta ya no está disponible",
					  showClass: {
					    popup: 'animated fadeInDown faster'
					  },
					  hideClass: {
					    popup: 'animated fadeOutUp faster'
					  }
					})
			}
			let messag = {		
				event: 'ASK_PLAYER_RESOURCES'
			}
			game.global.socket.send(JSON.stringify(messag));
			pedirPuntuaciones();
			pedirOfertas();
			break;
		
		case 'ACTUALIZAR PUNTUACION':
			if (game.global.DEBUG_MODE) {
				console.log('[DEBUG] ACTUALIZAR PUNTUACION message recieved');
			}
			game.global.puntuacion = msg.punctuacion;
			break;
			
		case 'ALL PUNCTUATIONS':
			if (game.global.DEBUG_MODE) {
				console.log('[DEBUG] ALL PUNCTUATIONS message recieved');
			}
			game.global.mejoresPuntuaciones = [];
			let arrayAux = msg.todasLasPuntuaciones.split("\n");
			arrayAux.pop(); //por alguna razón mete un undefined al final
			game.global.mejoresPuntuaciones = arrayAux;
			break;
		case 'USERS FOUND':
			if (game.global.DEBUG_MODE) {
				console.log('[DEBUG] USERS FOUND message recieved');
				console.log(msg);
			}
			console.log(game.scene.isActive('RankingMenu'));
			if(game.scene.isActive('RankingMenu')){
				
				for(var i = 0; i < game.global.mejoresPuntuaciones.length; i+=2){
		    		if(i%2 == 0){
		    			console.log(game.global.mejoresPuntuaciones[i]);
		    			var friendincluded = false;
			    		for(var j = 0; j < msg.users.length; j++){
			    			if(msg.users[j].name == game.global.mejoresPuntuaciones[i]){
			    				friendincluded = true;
			    				break;
			    			}
			    		}
		    			if(friendincluded){
				    		let divPuesto = document.createElement("div");
				    		
				    		var box = document.createElement("img");
				        	box.src = "assets/interface/Gameplay/boxRanking.png";
				        	box.style.marginLeft ="0px";
				        	box.style.marginTop = "30px";
				        	box.style.width = '95%';
				        	box.style.height = '70%';
				        	
				        	
				        	var contenido = document.createElement("div");
				        	contenido.style.cssText = "position:relative;color:white;margin-top:-30px;margin-left:5px";
				        	
				        	var numRankingValue = document.createTextNode(""+ (Math.round(i/2)+1));
				        	var numRanking = document.createElement("span");
				        	numRanking.style.position="absolute";
				        	numRanking.style.left="10px";
				        	numRanking.style.top="-10px";
				        	//numRanking.style.paddingTop="-50px";
				        	numRanking.style.fontSize = "20px";
				        	numRanking.style.fontFamily = "Roboto";
				        	
				        	numRanking.appendChild(numRankingValue);
				        	
				        	var nombreRankingValue = document.createTextNode(" "+game.global.mejoresPuntuaciones[i]);
				        	var nombreRanking = document.createElement("span");
				        	nombreRanking.style.position="absolute";
				        	nombreRanking.style.left="50px";
				        	nombreRanking.style.top="-7px";
				        	nombreRanking.style.fontSize = "15px";
				        	nombreRanking.style.fontFamily = "Roboto";
				        	nombreRanking.appendChild(nombreRankingValue);
				        	
				        	var puntuacionRankingValue = document.createTextNode(" "+game.global.mejoresPuntuaciones[i+1]);
				        	var puntuacionRanking = document.createElement("span");
				        	puntuacionRanking.style.position="absolute";
				        	puntuacionRanking.style.textAlign="center";
				        	puntuacionRanking.style.left="150px";
				        	puntuacionRanking.style.top="-7px";
				        	puntuacionRanking.style.fontSize = "15px";
				        	puntuacionRanking.style.fontFamily = "Roboto";
				        	puntuacionRanking.appendChild(puntuacionRankingValue);
				        	
				        	switch (i){
				        		case 0:
				        			var n1 = document.createElement("img");
				        			n1.src = "assets/interface/Gameplay/n1.png";
				            		n1.style.position="absolute";
				            		n1.style.textAlign="center";
				            		n1.style.left="125px";
				            		n1.style.top="-10px";
				            		n1.style.width="20px";
				        			n1.style.height="auto";
				            		contenido.appendChild(n1);
				            	break;
				        		case 2:
				        			var n2 = document.createElement("img");
				        			n2.src = "assets/interface/Gameplay/n2.png";
				        			n2.style.position="absolute";
				        			n2.style.textAlign="center";
				        			n2.style.left="125px";
				        			n2.style.top="-10px";
				        			n2.style.width="20px";
				        			n2.style.height="auto";
				        			contenido.appendChild(n2);
				        		break;
				        		case 4:
				        			var n3 = document.createElement("img");
				        			n3.src = "assets/interface/Gameplay/n3.png";
				        			n3.style.position="absolute";
				        			n3.style.textAlign="center";
				        			n3.style.left="125px";
				        			n3.style.top="-10px";
				        			n3.style.width="20px";
				        			n3.style.height="auto";
				        			contenido.appendChild(n3);
				        		break;
				        		default:
				        			break;
				        	}
				        	contenido.appendChild(numRanking);
				        	contenido.appendChild(nombreRanking);
				        	contenido.appendChild(puntuacionRanking);
		
				        	divPuesto.appendChild(box);
				        	divPuesto.appendChild(contenido);
				        	
				        	
				        	game.scene.getScene('RankingMenu').divPuntuaciones.appendChild(divPuesto);
			    		}
		    		}
		    	}
			}else{
				if(msg.users.length > 0){
					game.scene.getScene('FriendsScene').usersList.text = '';
					game.scene.getScene('FriendsScene').divAmigos.innerHTML = '';
					game.scene.getScene('FriendsScene').divAmigos.style.marginTop = '-80px';
					if(game.scene.getScene('FriendsScene').mode == 'addamigos'){
						game.scene.getScene('FriendsScene').divAmigos.style.left = '450px';
					}
					
					for (let i = 0; i < msg.users.length; i++) {
						//game.scene.getScene('FriendsScene').usersList.text += msg.users[i].name + '\n';
						let divPuestoV = document.createElement("div");
						divPuestoV.style.width = "220px";
						
						let boxV = document.createElement("img");
				    	boxV.src = "assets/interface/Gameplay/Friends/BloqueAmigosBck.png";
				    	boxV.style.marginLeft ="0px";
				    	boxV.style.marginTop = "0px";
				    	boxV.style.width = '80%';
				    	boxV.style.height = 'auto';
				    	
				    	let connect = document.createElement("img");
				    	connect.src = 'assets/interface/Gameplay/Friends/conected.png';
				    	connect.style.position = "absolute";
				    	connect.style.marginLeft ="8px";
				    	connect.style.marginTop = "8px";
				    	connect.style.width = '2%';
				    	connect.style.height = 'auto';
				    	
				    	var name = document.createElement("span");
						name.style.position = "absolute";
						name.style.left = "40px";
						name.style.marginTop = "1px";
						name.style.width = 'auto';
						name.style.color = '#fff';
						name.style.fontFamily = 'pantonBlack';
						name.style.fontSize = '11px';
						
						switch(game.scene.getScene('FriendsScene').mode){
							case 'amigos':
								var city = document.createElement("img");
								city.src = 'assets/interface/Gameplay/Friends/btnciudadamigo.png';
								city.style.position = "absolute";
								city.style.marginLeft ="140px";
								city.style.marginTop = "3px";
								city.style.width = '7%';
								city.style.height = 'auto';
								city.style.cursor = 'pointer';
								city.onmousedown = function(){
									Swal.fire({
									  title: 'Do you want to see the colony of ' + msg.users[i].name + '?',
									  icon: 'question',
									  showCancelButton: true,
									  confirmButtonColor: '#3085d6',
									  cancelButtonColor: '#d33',
									  confirmButtonText: 'Yes, show me!'
									}).then((result) => {
									  if (result.value) {
									    let msgAux = new Object();
										msgAux.event = 'SHOW CITY';
										msgAux.id = msg.users[i].id;
										game.global.socket.send(JSON.stringify(msgAux));
										game.global.myPlayer.isVisitor = true;
										game.scene.stop('GameScene');
										game.scene.stop('GameInterface');
										game.scene.stop('FriendsScene');
										game.scene.run('LoadGameplayScene');
									  }
									})
									
								}
								
								var borrar = document.createElement("img");
								borrar.src = 'assets/interface/Gameplay/Friends/btneliminaramigos.png';
								borrar.style.position = "absolute";
								borrar.style.marginLeft ="155px";
								borrar.style.marginTop = "3px";
								borrar.style.width = '7%';
								borrar.style.height = 'auto';
								borrar.style.cursor = 'pointer';
								borrar.onmousedown = function(){
									Swal.fire({
									  title: 'Are you sure?',
									  text: "You won't be able to revert this!",
									  icon: 'warning',
									  showCancelButton: true,
									  confirmButtonColor: '#3085d6',
									  cancelButtonColor: '#d33',
									  confirmButtonText: 'Yes, delete it!'
									}).then((result) => {
									  if (result.value) {
									    Swal.fire(
									      'Deleted!',
									      'Your friend has been deleted.',
									      'success'
									    )
									    let msgAux = new Object();
										msgAux.event = 'DELETE FRIEND';
										msgAux.idReceiver = msg.users[i].id;
										msgAux.idTransmitter = game.global.myPlayerId;
										game.global.socket.send(JSON.stringify(msgAux));
									  }
									})
									
								}
							break;
							case 'addAmigos':
								var add = document.createElement("img");
								add.src = 'assets/interface/Gameplay/Friends/btncrearamigo.png';
								add.style.position = "absolute";
								add.style.marginLeft ="155px";
								add.style.marginTop = "3px";
								add.style.width = '7%';
								add.style.height = 'auto';
								add.style.cursor = 'pointer';
								
								add.onmousedown = function(){
									Swal.fire({
										  icon: 'success',
										  title: 'Nice!',
										  text: "Your request has been sent."
										});
									let msgAux = new Object();
									msgAux.event = 'REQUEST FRIENDSHIP';
									msgAux.idReceiver = msg.users[i].id;
									msgAux.idTransmitter = game.global.myPlayerId;
									game.global.socket.send(JSON.stringify(msgAux));
								}
							break;
							case 'solicitudes':
								var accept = document.createElement("img");
								accept.src = 'assets/interface/Gameplay/Friends/btnaceptaramigos.png';
								accept.style.position = "absolute";
								accept.style.marginLeft ="140px";
								accept.style.marginTop = "3px";
								accept.style.width = '7%';
								accept.style.height = 'auto';
								accept.style.cursor = 'pointer';
								accept.onmousedown = function(){
									let msgAux = new Object();
									msgAux.event = 'ACCEPT FRIEND';
									msgAux.idReceiver = msg.users[i].id;
									msgAux.idTransmitter = game.global.myPlayerId;
									game.global.socket.send(JSON.stringify(msgAux));
								}
								
								var destroyFriend = document.createElement("img");
								destroyFriend.src = 'assets/interface/Gameplay/Friends/btneliminaramigos.png';
								destroyFriend.style.position = "absolute";
								destroyFriend.style.marginLeft ="155px";
								destroyFriend.style.marginTop = "3px";
								destroyFriend.style.width = '7%';
								destroyFriend.style.height = 'auto';
								destroyFriend.style.cursor = 'pointer';
							break;
							default:
							break;
							
						}
						
						var n = document.createTextNode(msg.users[i].name);
						name.appendChild(n);
						
						var con = document.createElement("span");
						con.style.position = "absolute";
						con.style.left = "40px";
						con.style.marginTop = "12px";
						con.style.width = 'auto';
						con.style.color = '#fff';
						con.style.fontFamily = 'pantonLight';
						con.style.fontSize = '6px';
						
						var c;
						
						if(game.global.idioma == 'eng'){
				    		c = document.createTextNode("connected");
				    	}else{
				    		c = document.createTextNode("conectado");
				    	}
						con.appendChild(c);
				    	
				    	
				    	var contenidoV = document.createElement("div");
				    	contenidoV.style.cssText = "position:relative;color:white;margin-left:15px;margin-bottom:5px;";
				    	
				    	divPuestoV.appendChild(name);
				    	divPuestoV.appendChild(connect);
				    	
				    	switch(game.scene.getScene('FriendsScene').mode){
							case 'amigos':
								divPuestoV.appendChild(city);
						    	divPuestoV.appendChild(borrar);
							break;
							case 'addAmigos':
								divPuestoV.appendChild(add);
							break;
							case 'solicitudes':
								divPuestoV.appendChild(accept);
						    	divPuestoV.appendChild(destroyFriend);
							break;
				    	}
						
					
				    	
				    	divPuestoV.appendChild(con);
				    	divPuestoV.appendChild(boxV);
				    	divPuestoV.appendChild(contenidoV);
				    	game.scene.getScene('FriendsScene').divAmigos.appendChild(divPuestoV);
					}
				}else if (game.scene.getScene('FriendsScene').mode === 'amigos') {
		    		if(game.global.idioma == "eng"){
		    			game.scene.getScene('FriendsScene').divAmigos.innerHTML = '<span style="color: #fff; font-family: pantonLight ">You have no friends right now, look in the add friends section.</span>';
		    		}else{
		    			game.scene.getScene('FriendsScene').divAmigos.innerHTML = '<span style="color: #fff; font-family: pantonLight ">No tienes amigos ahora mismo, busca en la seccion añadir amigos.</span>';
		    		}
		    		game.scene.getScene('FriendsScene').divAmigos.style.marginTop = '20px';
		    		game.scene.getScene('FriendsScene').divAmigos.style.textAlign = 'center';
		    	}else if (game.scene.getScene('FriendsScene').mode === 'solicitudes') {
		    		if(game.global.idioma == "eng"){
		    			game.scene.getScene('FriendsScene').divAmigos.innerHTML = '<span style="color: #fff; font-family: pantonLight ">You have no pending friend requests</span>';
		    		}else{
		    			game.scene.getScene('FriendsScene').divAmigos.innerHTML = '<span style="color: #fff; font-family: pantonLight ">No tienes solicitudes de amistad pendientes</span>';
		    		}
		    		game.scene.getScene('FriendsScene').divAmigos.style.marginTop = '20px';
		    		game.scene.getScene('FriendsScene').divAmigos.style.textAlign = 'center';
		    	}
			}
			break;	
				
		case 'CITY NAME CHANGED':
			if (game.global.DEBUG_MODE) {
				console.log('[DEBUG] CITY NAME CHANGED message recieved')
				console.dir(msg);
			}
			game.global.myPlayer.cityName = msg.name;
			game.scene.getScene('GameInterface').cityname.text = msg.name;
			break;
		case 'VISITOR CITY NAME':
			if (game.global.DEBUG_MODE) {
				console.log('[DEBUG] VISITOR CITY NAME message recieved')
				console.dir(msg);
			}
			game.global.myPlayer.visitorCityName = msg.name;
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