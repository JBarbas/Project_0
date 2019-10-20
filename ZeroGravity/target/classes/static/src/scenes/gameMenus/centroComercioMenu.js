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
    	
    	game.scene.getScene('GameInterface').panel.setTexture('panelCComercio');
    	
    	// Contenedor del panel de mejoras
    	var mejorasContainer = this.add.container(game.global.buildingMenu.x, game.global.buildingMenu.y);
    	// Contenedor del panel de detalles
    	var detallesContainer = this.add.container(game.global.buildingMenu.x, game.global.buildingMenu.y);
    	// Contenedor del panel de ofertas
    	var ofertasContainer = this.add.container(game.global.buildingMenu.x, game.global.buildingMenu.y);
    	// Contenedor del panel de vender
    	var venderContainer = this.add.container(game.global.buildingMenu.x, game.global.buildingMenu.y);
    	// Contenedor del panel de comprar
    	var comprarContainer = this.add.container(game.global.buildingMenu.x, game.global.buildingMenu.y);
    	
    	//Se añade a cada contenedor su imagen de fondo
    	this.intMejoras = this.add.image(0, 0, 'intCMejoras').setOrigin(0, 0); 
    	mejorasContainer.add(this.intMejoras);
    	this.intDetalles = this.add.image(0, 0, 'intCDetalles').setOrigin(0, 0); 
    	detallesContainer.add(this.intDetalles);
    	this.intComprar = this.add.image(0, 0, 'intCComprar').setOrigin(0, 0);
    	comprarContainer.add(this.intComprar);
    	this.intVender = this.add.image(0, 0, 'intCVender').setOrigin(0, 0);
    	venderContainer.add(this.intVender);
    	this.intOfertas = this.add.image(0, 0, 'intCOfertas').setOrigin(0, 0);
    	ofertasContainer.add(this.intOfertas);
    	
    	
    	

    	//Se alterna entre contenedores según el icono seleccionado
    	this.iconoDetalles = this.add.image(game.global.buildingMenu.x + 300, game.global.buildingMenu.y + 10, 'iconoDetalles').setOrigin(0, 0);
    	this.iconoDetalles.setInteractive().on('pointerdown', function(pointer, localX, localY, event) { 
    		detallesContainer.visible= true;
    		mejorasContainer.visible= false;
    		comprarContainer.visible= false;
    		venderContainer.visible= false;
    		ofertasContainer.visible= false;
    	});
    	this.iconoMejoras = this.add.image(game.global.buildingMenu.x + 240, game.global.buildingMenu.y + 10, 'iconoMejoras').setOrigin(0, 0);
    	this.iconoMejoras.setInteractive().on('pointerdown', function(pointer, localX, localY, event) {
    		detallesContainer.visible= false;
    		mejorasContainer.visible= true;
    		comprarContainer.visible= false;
    		venderContainer.visible= false;
    		ofertasContainer.visible= false;
    	});
    	this.iconoOfertas = this.add.image(game.global.buildingMenu.x + 170, game.global.buildingMenu.y + 10, 'iconoOfertas').setOrigin(0, 0);
    	this.iconoOfertas.setInteractive().on('pointerdown', function(pointer, localX, localY, event) {
    		detallesContainer.visible= false;
    		mejorasContainer.visible= false;
    		comprarContainer.visible= false;
    		venderContainer.visible= false;
    		ofertasContainer.visible= true;
    	});
    	this.iconoVender = this.add.image(game.global.buildingMenu.x + 100, game.global.buildingMenu.y + 10, 'iconoVender').setOrigin(0, 0);
    	this.iconoVender.setInteractive().on('pointerdown', function(pointer, localX, localY, event) {
    		detallesContainer.visible= false;
    		mejorasContainer.visible= false;
    		comprarContainer.visible= false;
    		venderContainer.visible= true;
    		ofertasContainer.visible= false;
    	});
    	this.iconoEdificio = this.add.image(game.global.buildingMenu.x + 25, game.global.buildingMenu.y + 10, 'iconoComprar').setOrigin(0, 0);
    	this.iconoEdificio.setInteractive().on('pointerdown', function(pointer, localX, localY, event) {
    		detallesContainer.visible= false;
    		mejorasContainer.visible= false;
    		comprarContainer.visible= true;
    		venderContainer.visible= false;
    		ofertasContainer.visible= false;
    	});
    	

    	//  CONTENEDOR EDIFICIO
    	// Añadimos el boton para crear ofertas
    	/*
    	 * var crearOfertabtn = this.add.image(505, 560, 'xBuilding').setInteractive();
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
    	comprarContainer.add(crearOfertabtn);
    	///Botones ofrecer ofertas
    	//ofrecer oferta
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
    	comprarContainer.add(oferta25Metal);
    	
    	//pedir Ofertas
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
    	comprarContainer.add(pedirOfertasbtn);
    	//pedir Ofertas de mi jugador
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
    	comprarContainer.add(pedirOfertas2btn);
    	
    	//borrar una oferta de mi jugador
    	//en principio aquí recorro la lista de ofertas y con cada una 
    	// creo un boton con el que puedo pasar el id de la oferta a la 
    	// funcion de borrar
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
    	comprarContainer.add(borrarOfertasbtn);
    	
    	//comprar una oferta
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
    	comprarContainer.add(comprar);
    	
    	*
    	*/
    	
    	
    	// CONTAINER COMPRAR
    	var element = this.add.dom(-370, 280).createFromCache('centroComercioMenu');
        element.setPerspective(800);
        
        var divPuntuaciones = document.getElementById("divPuntuaciones");
      	
    	for(var i = 0; i < game.global.mejoresPuntuaciones.length; i+=2){
    		
    		let divPuesto = document.createElement("div");
    		
    		/*la imagen*/
    		var box = document.createElement("img");
        	box.src = "assets/interface/Gameplay/boxComercio.png";
        	box.style.marginLeft ="0px";
        	box.style.marginTop = "16px";
        	box.style.width = '100%';
        	box.style.height = 'auto';
        	
        	/*el div de los span*/
        	var contenido = document.createElement("div");
        	contenido.style.cssText = "position:relative;color:white;margin-top:-40px;margin-left:15px";
        	/*LOS ICONOS */
        	var metal = document.createElement("img");
        	metal.src = "assets/interface/Gameplay/metal.png";
        	metal.style.marginLeft = "20px";
        	
        	var creditos = document.createElement("img");
        	creditos.src = "assets/interface/Gameplay/creditos.png";
        	creditos.style.marginLeft = "20px";
        	
        	/*var arcilla = document.createElement("img");
        	arcilla.src = "assets/interface/Gameplay/arcilla.png";*/
        	
        	/*los span*/
        	var numRankingValue = document.createTextNode((Math.round(i/2)+1));
        	var numRanking = document.createElement("span");
        	numRanking.style.marginTop = "00px";
        	numRanking.appendChild(numRankingValue);
        	
        	var numRankingValue2 = document.createTextNode((Math.round(i/2)+1));
        	var numRanking2 = document.createElement("span");
        	numRanking2.style.marginLeft = "95px";
        	numRanking2.style.marginTop = "00px";
        	numRanking2.appendChild(numRankingValue2);
        	
        	
        	contenido.appendChild(numRanking);
        	contenido.appendChild(metal);
        	contenido.appendChild(numRanking2);
        	contenido.appendChild(creditos);
        	
        	divPuesto.appendChild(box);
        	divPuesto.appendChild(contenido);
        	
        	divPuntuaciones.appendChild(divPuesto);
    	}
        
    	comprarContainer.add(element);
    	
    	
    	
    	// CONTAINER VENDER
    	var elementV = this.add.dom(-370, 280).createFromCache('centroComercioMenuV');
        elementV.setPerspective(800);
        
        var divPuntuacionesV = document.getElementById("divPuntuacionesV");
      	
    	for(var i = 0; i < game.global.mejoresPuntuaciones.length; i+=2){
    		
    		let divPuestoV = document.createElement("div");
    		
    		/*la imagen*/
    		var boxV = document.createElement("img");
        	boxV.src = "assets/interface/Gameplay/boxComercio.png";
        	boxV.style.marginLeft ="0px";
        	boxV.style.marginTop = "16px";
        	boxV.style.width = '100%';
        	boxV.style.height = 'auto';
        	
        	/*el div de los span*/
        	var contenidoV = document.createElement("div");
        	contenidoV.style.cssText = "position:relative;color:white;margin-top:-40px;margin-left:15px";
        	/*LOS ICONOS */
        	var metalV = document.createElement("img");
        	metalV.src = "assets/interface/Gameplay/metal.png";
        	metalV.style.marginLeft = "20px";
        	
        	var creditosV = document.createElement("img");
        	creditosV.src = "assets/interface/Gameplay/creditos.png";
        	creditosV.style.marginLeft = "20px";
        	
        	/*var arcillaV = document.createElement("img");
        	arcillaV.src = "assets/interface/Gameplay/arcilla.png";*/
        	
        	/*los span*/
        	var numRankingValueV = document.createTextNode((Math.round(i/2)+1));
        	var numRankingV = document.createElement("span");
        	numRankingV.style.marginTop = "00px";
        	numRankingV.appendChild(numRankingValueV);
        	
        	var numRankingValue2V = document.createTextNode((Math.round(i/2)+1));
        	var numRanking2V = document.createElement("span");
        	numRanking2V.style.marginLeft = "95px";
        	numRanking2V.style.marginTop = "00px";
        	numRanking2V.appendChild(numRankingValue2V);
        	
        	
        	contenidoV.appendChild(numRankingV);
        	contenidoV.appendChild(metalV);
        	contenidoV.appendChild(numRanking2V);
        	contenidoV.appendChild(creditosV);
        	
        	divPuestoV.appendChild(boxV);
        	divPuestoV.appendChild(contenidoV);
        	
        	divPuntuacionesV.appendChild(divPuestoV);
    	}
        
    	venderContainer.add(elementV);
    	venderContainer.visible = false;
    	
    	
    	// CONTAINER OFERTAS
    	var elementO = this.add.dom(-370, 280).createFromCache('centroComercioMenuO');
        elementO.setPerspective(800);
        
        var divPuntuacionesO = document.getElementById("divPuntuacionesO");
      	
    	for(var i = 0; i < game.global.mejoresPuntuaciones.length; i+=2){
    		
    		let divPuestoO = document.createElement("div");
    		
    		/*la imagen*/
    		var boxO = document.createElement("img");
        	boxO.src = "assets/interface/Gameplay/boxComercio2.png";
        	boxO.style.marginLeft ="0px";
        	boxO.style.marginTop = "16px";
        	boxO.style.width = '100%';
        	boxO.style.height = 'auto';
        	
        	/*el div de los span*/
        	var contenidoO = document.createElement("div");
        	contenidoO.style.cssText = "position:relative;color:white;margin-top:-40px;margin-left:15px";
        	/*LOS ICONOS */
        	var metalO = document.createElement("img");
        	metalO.src = "assets/interface/Gameplay/metal.png";
        	metalO.style.marginLeft = "10px";
        	
        	var creditosO = document.createElement("img");
        	creditosO.src = "assets/interface/Gameplay/creditos.png";
        	creditosO.style.marginLeft = "10px";
        	
        	/*var arcillaO = document.createElement("img");
        	arcillaO.src = "assets/interface/Gameplay/arcilla.png";*/
        	
        	/*los span*/
        	var numRankingValueO = document.createTextNode((Math.round(i/2)+1));
        	var numRankingO = document.createElement("span");
        	numRankingO.style.marginTop = "00px";
        	numRankingO.appendChild(numRankingValueO);
        	
        	var numRankingValue2O = document.createTextNode((Math.round(i/2)+1));
        	var numRanking2O = document.createElement("span");
        	numRanking2O.style.marginLeft = "40px";
        	numRanking2O.style.marginTop = "00px";
        	numRanking2O.appendChild(numRankingValue2O);
        	 
        	var cancelar = document.createElement("img");
        	cancelar.src = "assets/interface/Gameplay/cancelar.png";
        	cancelar.style.marginLeft = "15px";
        	cancelar.style.width = "70px";
        	cancelar.style.height = "auto";
        	
        	
        	contenidoO.appendChild(numRankingO);
        	contenidoO.appendChild(metalO);
        	contenidoO.appendChild(numRanking2O);
        	contenidoO.appendChild(creditosO);
        	contenidoO.appendChild(cancelar);
        	
        	divPuestoO.appendChild(boxO);
        	divPuestoO.appendChild(contenidoO);
        	
        	divPuntuacionesO.appendChild(divPuestoO);
    	}
        
    	ofertasContainer.add(elementO);
    	ofertasContainer.visible = false;
        
        
    	
    	//  CONTENEDOR DETALLES
    	// Se añade la descripción del edificio
    	let textoEntrante = "Lorem ipsum dolor sit amet consectetur adipiscing elit aptent, augue consequat torquent facilisis morbi elementum varius urna, vitae inceptos ligula libero in aenean nostra. Dapibus diam nibh lectus turpis nec eu nunc sem fringilla hac, donec velit integer tempor litora massa dictum a aptent in potenti, mattis rutrum gravida vitae viverra cursus montes blandit maecenas. Nunc bibendum nullam rutrum volutpat inceptos et rhoncus cum faucibus euismod aptent fames litora, condimentum varius mus laoreet ac a erat hac auctor nisi mi id.";
		this.descEdificio = this.add.text(80, 180, justifica(textoEntrante), { fontFamily: '"Roboto Condensed"', color: 'white' , fontSize: '24px', fontWeight: 'bold'});
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
    	this.titulo = this.add.text(300, 180, "SIGUIENTE MEJORA:", { fontFamily: '"Roboto Condensed"', color: 'white' , fontSize: '24px', fontWeight: 'bold'}).setOrigin(0.5, 0.5);
    	mejorasContainer.add(this.titulo);
    	/*si nuestro edificio tiene todavia opcion de seguir subiendo de nivel...*/
    	if(data.miEdificio.level < 3){
        	// Se añade la imagen de siguiente nivel
    		this.edificioSigNivel = this.add.image(300, 280, this.miEdificio.sprite).setOrigin(0.5, 0.5).setScale(0.8, 0.8).setFrame(this.miEdificio.level);
    		mejorasContainer.add(this.edificioSigNivel);
    		
    		// Se añade la descripción del siguiente nivel
        	let textoEntrante2 = "Lorem ipsum dolor sit amet consectetur adipiscing elit aptent, augue consequat torquent facilisis morbi elementum varius urna, vitae inceptos ligula libero in aenean nostra. Dapibus diam nibh lectus turpis nec eu nunc sem fringilla hac, donec velit integer tempor litora massa dictum a aptent in potenti, mattis rutrum gravida vitae viverra cursus montes blandit maecenas. Nunc bibendum nullam rutrum volutpat inceptos et rhoncus cum faucibus euismod aptent fames litora, condimentum varius mus laoreet ac a erat hac auctor nisi mi id.";
    		this.descSigNivel = this.add.text(80, 360, justifica(textoEntrante2), { fontFamily: '"Roboto Condensed"', color: 'white' , fontSize: '24px', fontWeight: 'bold'});
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
    		this.descSigNivel = this.add.text(300, 210, "N/A", { fontFamily: '"Roboto Condensed"', color: 'white' , fontSize: '24px', fontWeight: 'bold'}).setOrigin(0.5, 0.5);
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