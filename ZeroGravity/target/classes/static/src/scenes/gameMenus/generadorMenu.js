class GeneradorMenu extends Phaser.Scene {

	constructor() {
        super({
            key: 'GeneradorMenu',
        });
    }

    init(data) {
    	if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **GENERADOR** menu");
		}
    	let msg = new Object();
		msg.event = 'GET GENERADOR MENU';
		msg.id = data.miEdificio.id;
		game.global.socket.send(JSON.stringify(msg));
    }
    
    preload () {
    	
    }
    
    create (data)  {
    	game.global.sound = game.sound.play('seleccionarEdificio');
    	//
    	this.miEdificio = data.miEdificio;
    	
    	// Aquí se guardan y usan los datos leidos desde xml multiidioma
    	var textoDesdeXml;

    	
    	if(game.global.idioma == 'eng'){
    		game.scene.getScene('GameInterface').panel.setTexture('generator');
    	}else{
    		game.scene.getScene('GameInterface').panel.setTexture('panelGenerador');
    	}
    	
		if (!this.miEdificio.enConstruccion) {
    	// Contenedor del panel de mejoras
    	var mejorasContainer = this.add.container(game.global.buildingMenu.x, game.global.buildingMenu.y);
    	// Contenedor del panel de detalles
    	var detallesContainer = this.add.container(game.global.buildingMenu.x, game.global.buildingMenu.y);
    	// Contenedor del panel de gestion
    	var edificiosContainer = this.add.container(game.global.buildingMenu.x, game.global.buildingMenu.y);
    	
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
    		game.global.sound = game.sound.play('pulsarBoton');
    		detallesContainer.visible= true;
    		mejorasContainer.visible= false;
    		edificiosContainer.visible= false;
    	});
    	this.iconoMejoras = this.add.image(game.global.buildingMenu.x + 100, game.global.buildingMenu.y + 10, 'iconoMejoras').setOrigin(0, 0);
    	this.iconoMejoras.setInteractive().on('pointerdown', function(pointer, localX, localY, event) {
    		game.global.sound = game.sound.play('pulsarBoton');
    		detallesContainer.visible= false;
    		mejorasContainer.visible= true;
    		edificiosContainer.visible= false;
    	});
    	this.iconoEdificio = this.add.image(game.global.buildingMenu.x + 25, game.global.buildingMenu.y + 10, 'iconoEdificio').setOrigin(0, 0);
    	this.iconoEdificio.setInteractive().on('pointerdown', function(pointer, localX, localY, event) {
    		game.global.sound = game.sound.play('pulsarBoton');
    		detallesContainer.visible= false;
    		mejorasContainer.visible= false;
    		edificiosContainer.visible= true;
    	});
    	
    	//  CONTENEDOR EDIFICIO
    	this.colonos = this.add.text(100, 200, "Cargando...", { fontFamily: '"Roboto Condensed"', color: 'white' });
    	edificiosContainer.add(this.colonos);
    	
    	//  CONTENEDOR DETALLES
    	// Se añade la descripción del edificio
    	textoDesdeXml = this.cache.xml.get(game.global.idioma).getElementsByTagName('gendetalles')[0].childNodes[0].nodeValue;
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
    		game.global.sound = game.sound.play('pulsarBoton');
    		if(!game.global.construyendo){
				game.scene.pause();
				data.miEdificio.move();
				game.scene.stop('GeneradorMenu');
				setTimeout(function(){ game.global.inMenu = false; }, 500);
    		}
    	});
    	detallesContainer.add(mover);
    	
    	//  CONTENEDOR MEJORAS
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
        	textoDesdeXml = this.cache.xml.get(game.global.idioma).getElementsByTagName('genmejoraNivel' + (this.miEdificio.level + 1))[0].childNodes[0].nodeValue;
        	this.descSigNivel = this.add.text(80, 360, justifica(textoDesdeXml), { fontFamily: '"Roboto Condensed"', color: 'white' , fontSize: '24px', fontWeight: 'bold'});
    		mejorasContainer.add(this.descSigNivel);
        	
	    	//Se añade a cada contenedor su imagen de fondo
	    	this.intMejoras = this.add.image(0, 0, 'intMejoras').setOrigin(0, 0); 
	    	mejorasContainer.add(this.intMejoras);
	    	this.intDetalles = this.add.image(0, 0, 'intDetalles').setOrigin(0, 0); 
	    	detallesContainer.add(this.intDetalles);
	    	this.intEdificios = this.add.image(0, 0, 'intEdificios').setOrigin(0, 0);
	    	edificiosContainer.add(this.intEdificios);
	    	
	    	//Se alterna entre contenedores según el icono seleccionado
	    	this.iconoDetalles = this.add.image(game.global.buildingMenu.x + 170, game.global.buildingMenu.y + 10, 'iconoDetalles').setOrigin(0, 0);
	    	this.iconoDetalles.setInteractive().on('pointerdown', function(pointer, localX, localY, event) { 
	    		detallesContainer.visible= true;
	    		mejorasContainer.visible= false;
	    		edificiosContainer.visible= false;
	    	});
	    	this.iconoMejoras = this.add.image(game.global.buildingMenu.x + 100, game.global.buildingMenu.y + 10, 'iconoMejoras').setOrigin(0, 0);
	    	this.iconoMejoras.setInteractive().on('pointerdown', function(pointer, localX, localY, event) {
	    		detallesContainer.visible= false;
	    		mejorasContainer.visible= true;
	    		edificiosContainer.visible= false;
	    	});
	    	this.iconoEdificio = this.add.image(game.global.buildingMenu.x + 25, game.global.buildingMenu.y + 10, 'iconoEdificio').setOrigin(0, 0);
	    	this.iconoEdificio.setInteractive().on('pointerdown', function(pointer, localX, localY, event) {
	    		detallesContainer.visible= false;
	    		mejorasContainer.visible= false;
	    		edificiosContainer.visible= true;
	    	});
	    	
	    	//  CONTENEDOR EDIFICIO
	    	this.colonos = this.add.text(100, 200, "Cargando...", { fontFamily: '"Roboto Condensed"', color: 'white' });
	    	edificiosContainer.add(this.colonos);
	    	
	    	//  CONTENEDOR DETALLES
	    	// Se añade la descripción del edificio
	    	textoDesdeXml = this.cache.xml.get(game.global.idioma).getElementsByTagName('gendetalles')[0].childNodes[0].nodeValue;
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
	    		if(!game.global.construyendo){
					game.scene.pause();
					data.miEdificio.move();
					game.scene.stop('GeneradorMenu');
					setTimeout(function(){ game.global.inMenu = false; }, 500);
	    		}
	    	});
	    	detallesContainer.add(mover);
	    	
	    	//  CONTENEDOR MEJORAS
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
	        	textoDesdeXml = this.cache.xml.get(game.global.idioma).getElementsByTagName('genmejoraNivel' + (this.miEdificio.level + 1))[0].childNodes[0].nodeValue;
	        	this.descSigNivel = this.add.text(80, 360, justifica(textoDesdeXml), { fontFamily: '"Roboto Condensed"', color: 'white' , fontSize: '24px', fontWeight: 'bold'});
	    		mejorasContainer.add(this.descSigNivel);
		    	
		    	//Se añade a cada contenedor su imagen de fondo
		    	this.intMejoras = this.add.image(0, 0, 'intMejoras').setOrigin(0, 0); 
		    	mejorasContainer.add(this.intMejoras);
		    	this.intDetalles = this.add.image(0, 0, 'intDetalles').setOrigin(0, 0); 
		    	detallesContainer.add(this.intDetalles);
		    	this.intEdificios = this.add.image(0, 0, 'intEdificios').setOrigin(0, 0);
		    	edificiosContainer.add(this.intEdificios);
		    	
		    	//Se alterna entre contenedores según el icono seleccionado
		    	this.iconoDetalles = this.add.image(game.global.buildingMenu.x + 170, game.global.buildingMenu.y + 10, 'iconoDetalles').setOrigin(0, 0);
		    	this.iconoDetalles.setInteractive().on('pointerdown', function(pointer, localX, localY, event) { 
		    		detallesContainer.visible= true;
		    		mejorasContainer.visible= false;
		    		edificiosContainer.visible= false;
		    	});
		    	this.iconoMejoras = this.add.image(game.global.buildingMenu.x + 100, game.global.buildingMenu.y + 10, 'iconoMejoras').setOrigin(0, 0);
		    	this.iconoMejoras.setInteractive().on('pointerdown', function(pointer, localX, localY, event) {
		    		detallesContainer.visible= false;
		    		mejorasContainer.visible= true;
		    		edificiosContainer.visible= false;
		    	});
		    	this.iconoEdificio = this.add.image(game.global.buildingMenu.x + 25, game.global.buildingMenu.y + 10, 'iconoEdificio').setOrigin(0, 0);
		    	this.iconoEdificio.setInteractive().on('pointerdown', function(pointer, localX, localY, event) {
		    		detallesContainer.visible= false;
		    		mejorasContainer.visible= false;
		    		edificiosContainer.visible= true;
		    	});
		    	
		    	//  CONTENEDOR EDIFICIO
		    	this.colonos = this.add.text(100, 200, "Cargando...", { fontFamily: '"Roboto Condensed"', color: 'white' });
		    	edificiosContainer.add(this.colonos);
		    	
		    	//  CONTENEDOR DETALLES
		    	// Se añade la descripción del edificio
		    	textoDesdeXml = this.cache.xml.get(game.global.idioma).getElementsByTagName('gendetalles')[0].childNodes[0].nodeValue;
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
		    		if(!game.global.construyendo){
						game.scene.pause();
						data.miEdificio.move();
						game.scene.stop('GeneradorMenu');
						setTimeout(function(){ game.global.inMenu = false; }, 500);
		    		}
		    	});
		    	detallesContainer.add(mover);
		    	
		    	//  CONTENEDOR MEJORAS
		    	// Se añade el titulo de siguiente mejora
		    	this.titulo = this.add.text(300, 180, "SIGUIENTE MEJORA:", { fontFamily: '"Roboto Condensed"', color: 'white' , fontSize: '24px', fontWeight: 'bold'}).setOrigin(0.5, 0.5);
		    	mejorasContainer.add(this.titulo);
		    	/*si nuestro edificio tiene todavia opcion de seguir subiendo de nivel...*/
		    	if(data.miEdificio.level < 3){
		        	// Se añade la imagen de siguiente nivel
		    		this.edificioSigNivel = this.add.image(300, 280, this.miEdificio.sprite).setOrigin(0.5, 0.5).setScale(0.8, 0.8).setFrame(this.miEdificio.level);
		    		mejorasContainer.add(this.edificioSigNivel);
		    		
		    		// Se añade la descripción del siguiente nivel
		    		textoDesdeXml = this.cache.xml.get(game.global.idioma).getElementsByTagName('genmejoraNivel' + (this.miEdificio.level + 1))[0].childNodes[0].nodeValue;
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
						game.global.sound = game.sound.play('pulsarBoton');
						askLevelUpBuilding(data.miEdificio.id);	 		
			    	});
					mejorasContainer.add(this.subirNivel);
		    	}
		    	else{
		    		this.descSigNivel = this.add.text(300, 210, "N/A", { fontFamily: '"Roboto Condensed"', color: 'white' , fontSize: '24px', fontWeight: 'bold'}).setOrigin(0.5, 0.5);
		        	mejorasContainer.add(this.descSigNivel);
		    	}  	
		    	    	
		    	// Desactivamos al inicio los otros dos contenedores
				detallesContainer.visible= false;
				mejorasContainer.visible= false;
				mejorasContainer.add(this.subirNivel);
	    	}
	    	else{
	    		textoDesdeXml = this.cache.xml.get(game.global.idioma).getElementsByTagName('genmejoraNivel' + (this.miEdificio.level + 1))[0].childNodes[0].nodeValue;
	    		this.descSigNivel = this.add.text(300, 210, textoDesdeXml, { fontFamily: '"Roboto Condensed"', color: 'white' , fontSize: '24px', fontWeight: 'bold'}).setOrigin(0.5, 0.5);
	        	mejorasContainer.add(this.descSigNivel);
			}
		}
    	}
    	else {
    		if(game.global.idioma == "eng"){
    			this.add.image(game.global.buildingMenu.x, game.global.buildingMenu.y, 'menuEnConstruccionEng').setOrigin(0, 0);
    		}else{
    			this.add.image(game.global.buildingMenu.x, game.global.buildingMenu.y, 'menuEnConstruccion').setOrigin(0, 0);
    		}
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
    		game.global.sound = game.sound.play('pulsarBoton');
			game.scene.stop(data.miEdificio.menuScene);
			game.global.inMenu = false;
    	});
		
    }
    update(time, delta) {
    	if (!this.miEdificio.enConstruccion) {	
	    	/*si nuestro edificio tiene todavia opcion de seguir subiendo de nivel...*/
	    	if(this.miEdificio.level >= 3 && this.subirNivel !== null && typeof this.subirNivel !== "undefined"){
	    		this.subirNivel.destroy();
	    	}
    	}
    }
}