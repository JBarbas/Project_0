class CentroMandoMenu extends Phaser.Scene {

	constructor() {
        super({
            key: "CentroMandoMenu",
        });
    }

    init(data) {
    	if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **CENTRO DE MANDO** menu");
		}
    }
    
    preload () {
    	
    }
    create (data)  {
    	game.global.effects.seleccionarEdificio.play();
		game.global.effects.seleccionarEdificio.setVolume(game.global.myPlayer.config.volEffects/100);
    	//
    	this.miEdificio = data.miEdificio;
    	
    	// Aquí se guardan y usan los datos leidos desde xml multiidioma
    	var textoDesdeXml;
    	
    	// Contenedor del panel de mejoras
    	var mejorasContainer = this.add.container(game.global.buildingMenu.x, game.global.buildingMenu.y);
    	// Contenedor del panel de detalles
    	var detallesContainer = this.add.container(game.global.buildingMenu.x, game.global.buildingMenu.y);
    	// Contenedor del panel de edificios
    	var edificiosContainer = this.add.container(game.global.buildingMenu.x, game.global.buildingMenu.y);
    	
    	if(game.global.idioma == 'eng'){
    		game.scene.getScene('GameInterface').panel.setTexture('commandCenter');
    	}else{
    		game.scene.getScene('GameInterface').panel.setTexture('panelCMando');
    	}
    	
    	
    	//Se añade a cada contenedor su imagen de fondo
		this.intMejoras = this.add.image(0, 0, 'intMejoras').setOrigin(0, 0); 
		this.intDetalles = this.add.image(0, 0, 'intDetalles').setOrigin(0, 0); 
		this.intEdificios = this.add.image(0, 0, 'intEdificios').setOrigin(0, 0);
		
		this.intUpdates = this.add.image(0, 0, 'intUpdates').setOrigin(0, 0); 
		this.intBuildings = this.add.image(0, 0, 'intBuildings').setOrigin(0, 0); 
		this.intDetails = this.add.image(0, 0, 'intDetails').setOrigin(0, 0);
		
		if(game.global.idioma == "eng"){
			mejorasContainer.add(this.intUpdates);
			detallesContainer.add(this.intDetails);
			edificiosContainer.add(this.intBuildings);
		}else{
			mejorasContainer.add(this.intMejoras);
			detallesContainer.add(this.intDetalles);
			edificiosContainer.add(this.intEdificios);
		}
    	
    	//Se alterna entre contenedores según el icono seleccionado
    	this.iconoDetalles = this.add.image(game.global.buildingMenu.x + 170, game.global.buildingMenu.y + 10, 'iconoDetalles').setOrigin(0, 0);
    	this.iconoDetalles.setInteractive().on('pointerdown', function(pointer, localX, localY, event) { 
    		game.global.effects.pulsarBoton.play();
    		game.global.effects.pulsarBoton.setVolume(game.global.myPlayer.config.volEffects/100); 
    		detallesContainer.visible= true;
    		mejorasContainer.visible= false;
    		edificiosContainer.visible= false;
    	});
    	this.iconoMejoras = this.add.image(game.global.buildingMenu.x + 100, game.global.buildingMenu.y + 10, 'iconoMejoras').setOrigin(0, 0);
    	this.iconoMejoras.setInteractive().on('pointerdown', function(pointer, localX, localY, event) {
    		game.global.effects.pulsarBoton.play();
    		game.global.effects.pulsarBoton.setVolume(game.global.myPlayer.config.volEffects/100); 
    		detallesContainer.visible= false;
    		mejorasContainer.visible= true;
    		edificiosContainer.visible= false;
    	});
    	this.iconoEdificio = this.add.image(game.global.buildingMenu.x + 25, game.global.buildingMenu.y + 10, 'iconoEdificio').setOrigin(0, 0);
    	this.iconoEdificio.setInteractive().on('pointerdown', function(pointer, localX, localY, event) {
    		game.global.effects.pulsarBoton.play();
    		game.global.effects.pulsarBoton.setVolume(game.global.myPlayer.config.volEffects/100); 
    		detallesContainer.visible= false;
    		mejorasContainer.visible= false;
    		edificiosContainer.visible= true;
    	});
    	
    	//  CONTENEDOR EDIFICIOS
    	//Debería recibir por petición las listas
    	let arrayAuxiliar = [];
    	arrayAuxiliar.push('taller');
    	arrayAuxiliar.push('plataformaExtraccion');
    	arrayAuxiliar.push('laboratorioInvestigacion');
    	arrayAuxiliar.push('bloqueViviendas');
    	arrayAuxiliar.push('generador');
    	let arrayAuxiliar2 = [];
    	arrayAuxiliar2.push(10);
    	arrayAuxiliar2.push(10);
    	arrayAuxiliar2.push(10);
    	arrayAuxiliar2.push(10);
    	arrayAuxiliar2.push(10);
    	for(let i = 0; i < arrayAuxiliar.length; i++){
    		//Se añade el recuadro como botón
    		this.borde = this.add.image(80, 160 + 196 * 0.65 * i, 'intEdificioRec').setOrigin(0, 0).setScale(0.65, 0.65);
    		this.borde.setInteractive().on('pointerdown', function(pointer, localX, localY, event) { aux(arrayAuxiliar[i]); });
    		edificiosContainer.add(this.borde);
        	
    		//Se añade la imagen, con colocación en el centro para que los diferentes tamaños no sean problemáticos
    		this.edificio = this.add.image(150, 220 + 196 * 0.65 * i, arrayAuxiliar[i]).setOrigin(0.5, 0.5).setScale(0.65, 0.65);
        	edificiosContainer.add(this.edificio);
        	
        	//Se añade el nombre del edificio
        	textoDesdeXml = this.cache.xml.get(game.global.idioma).getElementsByTagName(arrayAuxiliar[i])[0].childNodes[0].nodeValue;
    		
        	this.nombreEdificio = this.add.text(240, 180 + 196 * 0.65 * i, textoDesdeXml, { fontFamily: '"Roboto Condensed"', color: 'white' , fontSize: '24px'});
        	edificiosContainer.add(this.nombreEdificio);
        	
        	//Se añaden los recursos, con sus costes
    		this.recurso = this.add.image(260, 240 + 196 * 0.65 * i, 'clayIcon').setOrigin(0.5, 0.5).setScale(0.15, 0.15);
        	edificiosContainer.add(this.recurso);
        	this.coste = this.add.text(290, 240 + 196 * 0.65 * i, arrayAuxiliar2[i], { fontFamily: '"Roboto Condensed"', color: 'white' , fontSize: '18px'}).setOrigin(0.5, 0.5);
        	edificiosContainer.add(this.coste);
    		this.recurso = this.add.image(335, 240 + 196 * 0.65 * i, 'clayIcon').setOrigin(0.5, 0.5).setScale(0.15, 0.15);
        	edificiosContainer.add(this.recurso);
        	this.coste = this.add.text(365, 240 + 196 * 0.65 * i, arrayAuxiliar2[i], { fontFamily: '"Roboto Condensed"', color: 'white' , fontSize: '18px'}).setOrigin(0.5, 0.5);
        	edificiosContainer.add(this.coste);
    		this.recurso = this.add.image(410, 240 + 196 * 0.65 * i, 'clayIcon').setOrigin(0.5, 0.5).setScale(0.15, 0.15);
        	edificiosContainer.add(this.recurso);
        	this.coste = this.add.text(440, 240 + 196 * 0.65 * i, arrayAuxiliar2[i], { fontFamily: '"Roboto Condensed"', color: 'white' , fontSize: '18px'}).setOrigin(0.5, 0.5);
        	edificiosContainer.add(this.coste);
    	}
    	
    	
    	
    	/*
    	 *    EDIFICIOS QUE NO SE PUEDEN CONSTRUIR FUERA DEL TUTORIAL PARA PODER TRASTEAR
    	 * 
    	 *
		this.borde = this.add.image(-350, 160 + 196 * 0.65 * 0, 'intEdificioRec').setOrigin(0, 0).setScale(0.65, 0.65);
		this.borde.setInteractive().on('pointerdown', function(pointer, localX, localY, event) { aux('centroOperaciones'); });
		edificiosContainer.add(this.borde);
		this.edificio = this.add.image(-200, 220 + 196 * 0.65 * 0, 'centroOperaciones').setOrigin(0.5, 0.5).setScale(0.65, 0.65);
    	edificiosContainer.add(this.edificio);
    	this.borde = this.add.image(-350, 160 + 196 * 0.65 * 1, 'intEdificioRec').setOrigin(0, 0).setScale(0.65, 0.65);
		this.borde.setInteractive().on('pointerdown', function(pointer, localX, localY, event) { aux('centroAdministrativo'); });
		edificiosContainer.add(this.borde);
		this.edificio = this.add.image(-200, 220 + 196 * 0.65 * 1, 'centroAdministrativo').setOrigin(0.5, 0.5).setScale(0.65, 0.65);
    	edificiosContainer.add(this.edificio);
    	this.borde = this.add.image(-350, 160 + 196 * 0.65 * 2, 'intEdificioRec').setOrigin(0, 0).setScale(0.65, 0.65);
		this.borde.setInteractive().on('pointerdown', function(pointer, localX, localY, event) { aux('centroComercio'); });
		edificiosContainer.add(this.borde);
		this.edificio = this.add.image(-200, 220 + 196 * 0.65 * 2, 'centroComercio').setOrigin(0.5, 0.5).setScale(0.65, 0.65);
    	edificiosContainer.add(this.edificio);
    	/*
    	 *     FIN TRASTEO
    	 */
    	
    	
    	function aux(edificioCons){if(!game.global.construyendo){
    			var edificio;
    			switch(edificioCons){
    			case 'centroOperaciones':
    				edificio = new CentroOperaciones(0, 0);
    				break;
    			case 'centroAdministrativo':
    				edificio = new CentroAdministrativo(0, 0);
    				break;
    			case 'taller':
    				edificio = new Taller(0, 0);
    				break;
    			case 'plataformaExtraccion':
    				edificio = new PlataformaExtraccion(0, 0);
    				break;
    			case 'bloqueViviendas':
    				edificio = new BloqueViviendas(0, 0);
    				break;
    			case 'generador':
    				edificio = new Generador(0, 0);
    				break;
    			case 'centroComercio':
    				edificio = new CentroComercio(0, 0);
    				break;
    			case 'laboratorioInvestigacion':
    				edificio = new LaboratorioInvestigacion(0, 0);
    				break;
    			default:
    				break;
    			}
    			
    			edificio.previsualizar(game.scene.getScene('GameScene'));
    			game.global.construyendo = true;
    			game.global.edificioEnConstruccion = edificio;
    			game.scene.getScene('GameScene').gridContainer.setAlpha(0.5);
    			game.scene.pause();
    		}
    		game.scene.stop('CentroMandoMenu');
    		setTimeout(function(){ game.global.inMenu = false; }, 500);
    	}
    	
    	//	CONTENEDOR DETALLES
    	// Se añade la descripción del edificio
		textoDesdeXml = this.cache.xml.get(game.global.idioma).getElementsByTagName('cmdetalles')[0].childNodes[0].nodeValue;
		
		this.descEdificio = this.add.text(80, 180, justifica(textoDesdeXml), { fontFamily: '"Roboto Condensed"', color: 'white' , fontSize: '24px', fontWeight: 'bold'});
		detallesContainer.add(this.descEdificio);
    	// Se añade el botón mover al contenedor de detalles
    	var mover = this.add.image(300, 800, 'btnMover').setOrigin(0.5,0.5).setInteractive();
    	mover.on('pointerover',function(pointer){
    	    mover.setFrame(1);
    	})
    	mover.on('pointerout',function(pointer){
    	    mover.setFrame(0);
    	})
    	mover.on('pointerdown', function(pointer, localX, localY, event){
    		game.global.effects.pulsarBoton.play();
    		game.global.effects.pulsarBoton.setVolume(game.global.myPlayer.config.volEffects/100); 
    		if(!game.global.construyendo){
				game.scene.pause();
				data.miEdificio.move();
				game.scene.stop('CentroMandoMenu');
				setTimeout(function(){ game.global.inMenu = false; }, 500);
    		}
    	});
    	detallesContainer.add(mover);
    	
    	//	CONTENEDOR MEJORAS
    	// Se añade el titulo de siguiente mejora
    	textoDesdeXml = this.cache.xml.get(game.global.idioma).getElementsByTagName('sigMejora')[0].childNodes[0].nodeValue;
    	this.titulo = this.add.text(300, 180, textoDesdeXml, { fontFamily: '"Roboto Condensed"', color: 'white' , fontSize: '24px', fontWeight: 'bold'}).setOrigin(0.5, 0.5);
    	mejorasContainer.add(this.titulo);
    	/*si nuestro edificio tiene todavia opcion de seguir subiendo de nivel...*/
    	if(data.miEdificio.level < 3){
        	// Se añade la imagen de siguiente nivel
    		this.edificioSigNivel = this.add.image(300, 280, this.miEdificio.sprite).setOrigin(0.5, 0.5).setScale(0.8, 0.8).setFrame(this.miEdificio.level);
    		mejorasContainer.add(this.edificioSigNivel);
    		
    		// Se añade la descripción del siguiente nivel
    		textoDesdeXml = this.cache.xml.get(game.global.idioma).getElementsByTagName('cmmejoraNivel' + (this.miEdificio.level + 1))[0].childNodes[0].nodeValue;
    		
    		this.descSigNivel = this.add.text(80, 360, justifica(textoDesdeXml), { fontFamily: '"Roboto Condensed"', color: 'white' , fontSize: '24px', fontWeight: 'bold'});
        	mejorasContainer.add(this.descSigNivel);
        	
    		this.subirNivel = this.add.image(300,800, 'btnSubirNivel').setOrigin(0.5,0.5).setInteractive();
	    		    	
	    	this.subirNivel.on('pointerover',function(pointer){
	    		this.setFrame(1);
	    	})
	    	
	    	this.subirNivel.on('pointerout',function(pointer){
	    		this.setFrame(0);
	    	})
	    	
	    	this.subirNivel.on('pointerdown', function(pointer, localX, localY, event){
	    		game.global.effects.pulsarBoton.play();
	    		game.global.effects.pulsarBoton.setVolume(game.global.myPlayer.config.volEffects/100); 
	    		askLevelUpBuilding(data.miEdificio.id);
	    		// Cerramos el menú al subir de nivel
	    		
	    		/*game.scene.stop(data.miEdificio.menuScene);
				game.global.inMenu = false;*/
	    		
	    	});
			mejorasContainer.add(this.subirNivel);
    	}
    	else{
    		textoDesdeXml = this.cache.xml.get(game.global.idioma).getElementsByTagName('cmmejoraNivel' + (this.miEdificio.level + 1))[0].childNodes[0].nodeValue;
    		this.descSigNivel = this.add.text(300, 210, textoDesdeXml, { fontFamily: '"Roboto Condensed"', color: 'white' , fontSize: '24px', fontWeight: 'bold'}).setOrigin(0.5, 0.5);
        	mejorasContainer.add(this.descSigNivel);
    	}

    	// El botón cerrar será el mismo, por lo que no se incluirá en ningún contenerdor
    	var cerrar = this.add.image(game.global.buildingMenu.x + 505, game.global.buildingMenu.y + 60, 'xBuilding').setInteractive();
    	cerrar.setOrigin(0, 0);
    	cerrar.on('pointerover',function(pointer){
    	    this.setFrame(1);
    	});
    	cerrar.on('pointerout',function(pointer){
    	    this.setFrame(0);
    	});
    	cerrar.on('pointerdown', function(pointer, localX, localY, event){
    		game.global.effects.pulsarBoton.play();
    		game.global.effects.pulsarBoton.setVolume(game.global.myPlayer.config.volEffects/100); 
			game.scene.stop(data.miEdificio.menuScene);
			game.global.inMenu = false;
    	});
    	
    	// Desactivamos al inicio los otros dos contenedores
		detallesContainer.visible= false;
		mejorasContainer.visible= false;
    }
    update(time, delta) {
    	/*si nuestro edificio tiene todavia opcion de seguir subiendo de nivel...*/
    	if(this.miEdificio.level >= 3 && this.subirNivel !== null && typeof this.subirNivel !== "undefined"){
    		this.subirNivel.destroy();
    	}
    }
}