class CentroComercioMenu extends Phaser.Scene {

	constructor() {
        super({
            key: 'CentroComercioMenu',
        });
    }

    init(data) {
    	if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **CENTRO_COMERCIO** menu");
		} 	
    	
    	pedirOfertas();
    }
    
    preload () {
    	
    }
    
    create (data)  {
    	this.miEdificio = data.miEdificio;
    	
    	// Aquí se guardan y usan los datos leidos desde xml multiidioma
    	var textoDesdeXml;
    	
    	// Contenedor del panel de mejoras
    	var mejorasContainer = this.add.container(game.global.buildingMenu.x, game.global.buildingMenu.y);
    	// Contenedor del panel de detalles
    	var detallesContainer = this.add.container(game.global.buildingMenu.x, game.global.buildingMenu.y);
    	// Contenedor del panel de gestion
    	var edificiosContainer = this.add.container(game.global.buildingMenu.x, game.global.buildingMenu.y);
    	
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
    	// Añadimos el boton para crear ofertas
    	var crearOfertabtn = this.add.image(505, 560, 'xBuilding').setInteractive();
    	crearOfertabtn.setOrigin(0, 0);
    	crearOfertabtn.on('pointerover',function(pointer){
    		this.setFrame(1);
    	});
    	crearOfertabtn.on('pointerout',function(pointer){
    		this.setFrame(0);
    	});
    	crearOfertabtn.on('pointerdown', function(pointer, localX, localY, event){
    		//cantidad, recurso, creditos a cambio
    		crearOferta(25, 'metal', 100);
    	});
    	edificiosContainer.add(crearOfertabtn);
    	/***********************************Botones ofrecer ofertas******************************************/
    	/*ofrecer oferta*/
    	var oferta25Metal = this.add.image(505, 560, 'xBuilding').setInteractive();
    	oferta25Metal.setOrigin(0, 0);
    	oferta25Metal.on('pointerover',function(pointer){
    		this.setFrame(1);
    	});
    	oferta25Metal.on('pointerout',function(pointer){
    		this.setFrame(0);
    	});
    	oferta25Metal.on('pointerdown', function(pointer, localX, localY, event){ 		
    		//cantidad, recurso, creditos a cambio
    		crearOferta(25, 'metal', 100);
    	});
    	edificiosContainer.add(oferta25Metal);
    	
    	/*pedir Ofertas*/
    	var pedirOfertasbtn = this.add.image(65, 560, 'xBuilding').setInteractive();
    	pedirOfertasbtn.setOrigin(0, 0);
    	pedirOfertasbtn.on('pointerover',function(pointer){
    		this.setFrame(1);
    	});
    	pedirOfertasbtn.on('pointerout',function(pointer){
    		this.setFrame(0);
    	});
    	pedirOfertasbtn.on('pointerdown', function(pointer, localX, localY, event){ 		
    		//cantidad, recurso, creditos a cambio
    		pedirOfertas();
    	});
    	edificiosContainer.add(pedirOfertasbtn);
    	/*pedir Ofertas de mi jugador*/
    	var pedirOfertas2btn = this.add.image(65, 760, 'xBuilding').setInteractive();
    	pedirOfertas2btn.setOrigin(0, 0);
    	pedirOfertas2btn.on('pointerover',function(pointer){
    		this.setFrame(1);
    	});
    	pedirOfertas2btn.on('pointerout',function(pointer){
    		this.setFrame(0);
    	});
    	pedirOfertas2btn.on('pointerdown', function(pointer, localX, localY, event){ 		
    		//cantidad, recurso, creditos a cambio
    		console.log(pedirOfertasJugador());
    	});
    	edificiosContainer.add(pedirOfertas2btn);
    	
    	/*borrar una oferta de mi jugador*/
    	/*en principio aquí recorro la lista de ofertas y con cada una 
    	 * creo un boton con el que puedo pasar el id de la oferta a la 
    	 * funcion de borrar*/
    	var borrarOfertasbtn = this.add.image(400, 760, 'xBuilding').setInteractive();
    	borrarOfertasbtn.setOrigin(0, 0);
    	borrarOfertasbtn.on('pointerover',function(pointer){
    		this.setFrame(1);
    	});
    	borrarOfertasbtn.on('pointerout',function(pointer){
    		this.setFrame(0);
    	});
    	borrarOfertasbtn.on('pointerdown', function(pointer, localX, localY, event){ 		
    		let ofertasMiJugador = pedirOfertasJugador();
    		//cantidad, recurso, creditos a cambio
    		if(ofertasMiJugador[0] != null){
    			borrarOferta(ofertasMiJugador[0].idOferta);
    		}
    	});
    	edificiosContainer.add(borrarOfertasbtn);
    	
    	/*comprar una oferta*/
    	var comprar = this.add.image(250, 560, 'xBuilding').setInteractive();
    	comprar.setOrigin(0, 0);
    	comprar.on('pointerover',function(pointer){
    		this.setFrame(1);
    	});
    	comprar.on('pointerout',function(pointer){
    		this.setFrame(0);
    	});
    	comprar.on('pointerdown', function(pointer, localX, localY, event){ 		
    		
    		if(game.global.offers.length != 0){
    			comprarOferta(game.global.offers[0].idOferta);
    		}
    	});
    	edificiosContainer.add(comprar);
    	
    	//  CONTENEDOR DETALLES
    	// Se añade la descripción del edificio
    	textoDesdeXml = this.cache.xml.get(game.global.idioma).getElementsByTagName('ccdetalles')[0].childNodes[0].nodeValue;
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
				game.scene.stop('CentroAdministrativoMenu');
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
    		textoDesdeXml = this.cache.xml.get(game.global.idioma).getElementsByTagName('ccmejoraNivel' + (this.miEdificio.level + 1))[0].childNodes[0].nodeValue;
    		this.descSigNivel = this.add.text(80, 360, justifica(textoDesdeXml), { fontFamily: '"Roboto Condensed"', color: 'white' , fontSize: '24px', fontWeight: 'bold'});
    		mejorasContainer.add(this.descSigNivel);
        	
    		this.subirNivel = this.add.image(300,800, 'btnSubirNivel').setOrigin(0.5,0.5).setInteractive();
	    	this.subirNivel.on('pointerover',function(pointer){
	    		this.setFrame(1);
	    	});
	    	this.subirNivel.on('pointerout',function(pointer){
	    		this.setFrame(0);
	    	});
	    	this.subirNivel.on('pointerdown', function(pointer, localX, localY, event){
	    		askLevelUpBuilding(data.miEdificio.id);	    		
	    	});
			mejorasContainer.add(this.subirNivel);
    	}
    	else{
    		textoDesdeXml = this.cache.xml.get(game.global.idioma).getElementsByTagName('ccmejoraNivel' + (this.miEdificio.level + 1))[0].childNodes[0].nodeValue;
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