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
    	game.global.sound = game.sound.play('seleccionarEdificio');
    	
    	this.miEdificio = data.miEdificio;
    	
    	// Aquí se guardan y usan los datos leidos desde xml multiidioma
    	var textoDesdeXml;

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
    	this.comprarContainer = comprarContainer;
    	
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
    		game.global.sound = game.sound.play('pulsarBoton');
    		detallesContainer.visible= true;
    		mejorasContainer.visible= false;
    		comprarContainer.visible= false;
    		venderContainer.visible= false;
    		ofertasContainer.visible= false;
    		game.global.comercioMenuLast = 'detalles';
    	});
    	this.iconoMejoras = this.add.image(game.global.buildingMenu.x + 240, game.global.buildingMenu.y + 10, 'iconoMejoras').setOrigin(0, 0);
    	this.iconoMejoras.setInteractive().on('pointerdown', function(pointer, localX, localY, event) {
    		game.global.sound = game.sound.play('pulsarBoton');
    		detallesContainer.visible= false;
    		mejorasContainer.visible= true;
    		comprarContainer.visible= false;
    		venderContainer.visible= false;
    		ofertasContainer.visible= false;
    		game.global.comercioMenuLast = 'mejoras';
    	});
    	this.iconoOfertas = this.add.image(game.global.buildingMenu.x + 170, game.global.buildingMenu.y + 10, 'iconoOfertas').setOrigin(0, 0);
    	this.iconoOfertas.setInteractive().on('pointerdown', function(pointer, localX, localY, event) {
    		game.global.sound = game.sound.play('pulsarBoton');
    		detallesContainer.visible= false;
    		mejorasContainer.visible= false;
    		comprarContainer.visible= false;
    		venderContainer.visible= false;
    		ofertasContainer.visible= true;
    		game.global.comercioMenuLast = 'ofertas';
    	});
    	this.iconoVender = this.add.image(game.global.buildingMenu.x + 100, game.global.buildingMenu.y + 10, 'iconoVender').setOrigin(0, 0);
    	this.iconoVender.setInteractive().on('pointerdown', function(pointer, localX, localY, event) {
    		game.global.sound = game.sound.play('pulsarBoton');
    		detallesContainer.visible= false;
    		mejorasContainer.visible= false;
    		comprarContainer.visible= false;
    		venderContainer.visible= true;
    		ofertasContainer.visible= false;
    		game.global.comercioMenuLast = 'vender';
    	});
    	this.iconoEdificio = this.add.image(game.global.buildingMenu.x + 25, game.global.buildingMenu.y + 10, 'iconoComprar').setOrigin(0, 0);
    	this.iconoEdificio.setInteractive().on('pointerdown', function(pointer, localX, localY, event) {
    		game.global.sound = game.sound.play('pulsarBoton');
    		detallesContainer.visible= false;
    		mejorasContainer.visible= false;
    		comprarContainer.visible= true;
    		venderContainer.visible= false;
    		ofertasContainer.visible= false;
    		game.global.comercioMenuLast = 'edificio';
    	});
    	
    	// CONTAINER COMPRAR
    	var element = this.add.dom(-370, 280).createFromCache('centroComercioMenu');
        element.setPerspective(800);
        
        var divPuntuaciones = document.getElementById("divPuntuaciones");
      	
        if(game.global.offers.length == 0){
        	console.log("NO HAY OFERTAS PARA COMPRAR");
        }
        
        var ofertas = pedirOfertasNoJugador();
        
	    	for(var i = 0; i < ofertas.length; i++){
	    		
	    		let oferta = ofertas[i];
	    		
	    		let divPuesto = document.createElement("div");
	    		divPuesto.style.marginTop = "35px";
	    		divPuesto.style.cursor = "pointer";
	    		
	    		/*la imagen*/
	    		let box = document.createElement("img");
	        	box.src = "assets/interface/Gameplay/boxComercio.png";
	        	box.style.marginLeft ="0px";
	        	box.style.marginTop = "0px";
	        	box.style.width = '100%';
	        	box.style.height = 'auto';
	        	box.indice = i;
	        	box.onclick = function(){
	        		game.global.sound = game.sound.play('comprar');
	        		comprarOferta(oferta.idOferta, data.miEdificio.id);
	        		box.parentElement.style.visibility = "hidden";
	        	}
	        	box.onmouseover = function(){
	        		box.src = "assets/interface/Gameplay/boxComercioHover.png";
	        	}
	        	box.onmouseout = function(){
	        		box.src = "assets/interface/Gameplay/boxComercio.png";
	        	}
	        	
	        	
	        	/*el div de los span*/
	        	var contenido = document.createElement("div");
	        	contenido.style.cssText = "position:relative;color:white;margin-top:-40px;margin-left:15px";
	        	
	        	/*LOS ICONOS */
	        	if(oferta.material == "metal"){
	        		var metal = document.createElement("img");
	            	metal.src = "assets/interface/Gameplay/metal.png";
	            	metal.style.position = "absolute";
	            	metal.style.left = "180px";
	            	metal.indice = i;
	            	metal.onclick = function(){
	            		game.global.sound = game.sound.play('comprar');
	            		comprarOferta(oferta.idOferta, data.miEdificio.id);
	            		box.parentElement.style.visibility = "hidden";
	            	}
	        	}else{
	        		var ceramica = document.createElement("img");
	            	ceramica.src = "assets/interface/Gameplay/arcilla.png";
	            	ceramica.style.position = "absolute";
	            	ceramica.style.left = "180px";
	            	ceramica.indice = i;
	            	ceramica.onclick = function(){
	            		game.global.sound = game.sound.play('comprar');
	            		comprarOferta(oferta.idOferta, data.miEdificio.id);
	            		box.parentElement.style.visibility = "hidden";
	            	}
	        	}
	        	
	        	var creditos = document.createElement("img");
	        	creditos.src = "assets/interface/Gameplay/creditos.png";
	        	creditos.style.position = "absolute";
	        	creditos.style.left = "45px"; 
	        	creditos.indice = i;
	        	creditos.onclick = function(){
	        		game.global.sound = game.sound.play('comprar');
	        		comprarOferta(oferta.idOferta, data.miEdificio.id);
	        		box.parentElement.style.visibility = "hidden";
	        	}      	 	
	        	
	        	/*los span, en orden cantidad del recurso, cantidad de creditos a la que se venden*/
	        	switch(i){
	        	case 0:
	        	case 7:
	        		var numRankingValue = document.createTextNode(oferta.cantidad);
	        		var numRankingValue2 = document.createTextNode(oferta.creditos);
	        		break;
	        	case 1:
	        	case 8:
	        		var numRankingValue = document.createTextNode(oferta.cantidad);
	        		var numRankingValue2 = document.createTextNode(oferta.creditos);
	        		break;
	        	case 2:
	        	case 9:
	        		var numRankingValue = document.createTextNode(oferta.cantidad);
	        		var numRankingValue2 = document.createTextNode(oferta.creditos);
	        		break;
	        	case 3:
	        	case 10:
	        		var numRankingValue = document.createTextNode(oferta.cantidad);
	        		var numRankingValue2 = document.createTextNode(oferta.creditos);
	        		break;
	        	case 4:
	        	case 11:
	        		var numRankingValue = document.createTextNode(oferta.cantidad);
	        		var numRankingValue2 = document.createTextNode(oferta.creditos);
	        		break;
	        	case 5:
	        	case 12:
	        		var numRankingValue = document.createTextNode(oferta.cantidad);
	        		var numRankingValue2 = document.createTextNode(oferta.creditos);
	        		break;
	        	case 6:
	        	case 13:
	        		var numRankingValue = document.createTextNode(oferta.cantidad);
	        		var numRankingValue2 = document.createTextNode(oferta.creditos);
	        		break;
	        	default:
	        		break;
	        	}
	        	var numRanking = document.createElement("span");
	        	numRanking.style.position = "absolute";
	        	numRanking.style.top = "0px";
	        	numRanking.style.left = "140px";
	        	numRanking.indice = i;
	        	numRanking.onclick = function(){
	        		game.global.sound = game.sound.play('comprar');
	        		comprarOferta(oferta.idOferta, data.miEdificio.id);
	        		box.parentElement.style.visibility = "hidden";
	        	}
	        	numRanking.appendChild(numRankingValue);
	        	
	        	
	        	var numRanking2 = document.createElement("span");
	        	numRanking2.style.position = "absolute";
	        	numRanking2.style.left = "0px";
	        	numRanking2.style.top = "0px";
	        	numRanking2.indice = i;
	        	numRanking2.onclick = function(){
	        		game.global.sound = game.sound.play('comprar');
	        		comprarOferta(oferta.idOferta, data.miEdificio.id);
	        		box.parentElement.style.visibility = "hidden";
	        	}
	        	numRanking2.appendChild(numRankingValue2);        
	        	
	        	contenido.appendChild(numRanking);
	        	if(oferta.material == "metal"){
	        		contenido.appendChild(metal);
	        	}else{
	        		contenido.appendChild(ceramica);
	        	} 	
	        	contenido.appendChild(numRanking2);
	        	contenido.appendChild(creditos);
	        	
	        	divPuesto.appendChild(box);
	        	divPuesto.appendChild(contenido);
	        	
	        	divPuntuaciones.appendChild(divPuesto);
	    	}
	        
	    	this.comprarContainer.add(element);
        
        
    	
    	// CONTAINER VENDER
    	
    	var elementV = this.add.dom(-370, 280).createFromCache('centroComercioMenuV');
        elementV.setPerspective(800);
        
        var divPuntuacionesV = document.getElementById("divPuntuacionesV");
      	        
    	for(var i = 0; i < 14; i++){   		
    			    		
    		let divPuestoV = document.createElement("div");
    		divPuestoV.style.marginTop = "35px";
    		divPuestoV.style.cursor = "pointer";
    		
    		/*la imagen*/
    		let boxV = document.createElement("img");
        	boxV.src = "assets/interface/Gameplay/boxComercio.png";
        	boxV.style.marginLeft ="0px";
        	boxV.style.marginTop = "0px";
        	boxV.style.width = '100%';
        	boxV.style.height = 'auto';
        	boxV.indice = i;
        	boxV.onclick = function(){
        		game.global.sound = game.sound.play('comprar');
        		pasarAcrearOferta(boxV.indice);
        	}
        	boxV.onmouseover = function(){
        		boxV.src = "assets/interface/Gameplay/boxComercioHover.png";
        	}
        	boxV.onmouseout = function(){
        		boxV.src = "assets/interface/Gameplay/boxComercio.png";
        	}
        	
        	/*el div de los span*/
        	var contenidoV = document.createElement("div");
        	contenidoV.style.cssText = "position:relative;color:white;margin-top:-40px;margin-left:15px";
        	
        	/*LOS ICONOS */
        	if(i < 14/2){
        		var metalV = document.createElement("img");
            	metalV.src = "assets/interface/Gameplay/metal.png";
            	metalV.style.position = "absolute";
            	metalV.style.left = "45px";
            	metalV.indice = i;
            	metalV.onclick = function(){
            		game.global.sound = game.sound.play('comprar');
            		pasarAcrearOferta(boxV.indice);
            	}
        	}else{
        		var ceramicaV = document.createElement("img");
            	ceramicaV.src = "assets/interface/Gameplay/arcilla.png";
            	ceramicaV.style.position = "absolute";
            	ceramicaV.style.left = "45px";
            	ceramicaV.indice = i;
            	ceramicaV.onclick = function(){
            		game.global.sound = game.sound.play('comprar');
            		pasarAcrearOferta(boxV.indice);
            	}
        	}
        	
        	var creditosV = document.createElement("img");
        	creditosV.src = "assets/interface/Gameplay/creditos.png";
        	creditosV.style.position = "absolute";
        	creditosV.style.left = "170px"; 
        	creditosV.indice = i;
        	creditosV.onclick = function(){
        		game.global.sound = game.sound.play('comprar');
        		pasarAcrearOferta(boxV.indice);
        	}
        	
        	/*los span, en orden cantidad del recurso, cantidad de creditos a la que se venden*/
        	switch(i){
        	case 0:
        	case 7:
        		var numRankingValueV = document.createTextNode(25);
        		var numRankingValue2V = document.createTextNode(100);
        		break;
        	case 1:
        	case 8:
        		var numRankingValueV = document.createTextNode(50);
        		var numRankingValue2V = document.createTextNode(200);
        		break;
        	case 2:
        	case 9:
        		var numRankingValueV = document.createTextNode(75);
        		var numRankingValue2V = document.createTextNode(300);
        		break;
        	case 3:
        	case 10:
        		var numRankingValueV = document.createTextNode(100);
        		var numRankingValue2V = document.createTextNode(400);
        		break;
        	case 4:
        	case 11:
        		var numRankingValueV = document.createTextNode(200);
        		var numRankingValue2V = document.createTextNode(800);
        		break;
        	case 5:
        	case 12:
        		var numRankingValueV = document.createTextNode(500);
        		var numRankingValue2V = document.createTextNode(2000);
        		break;
        	case 6:
        	case 13:
        		var numRankingValueV = document.createTextNode(1000);
        		var numRankingValue2V = document.createTextNode(4000);
        		break;
        	default:
        		break;
        	}
        	var numRankingV = document.createElement("span");
        	numRankingV.style.position = "absolute";
        	numRankingV.style.top = "0px";
        	numRankingV.style.left = "1px";
        	numRankingV.indice = i;
        	numRankingV.onclick = function(){
        		game.global.sound = game.sound.play('comprar');
        		pasarAcrearOferta(boxV.indice);
        	}
        	numRankingV.appendChild(numRankingValueV);
        	
        	
        	var numRanking2V = document.createElement("span");
        	numRanking2V.style.position = "absolute";
        	numRanking2V.style.left = "130px";
        	numRanking2V.style.top = "00px";
        	numRanking2V.indice = i;
        	numRanking2V.onclick = function(){
        		game.global.sound = game.sound.play('comprar');
        		pasarAcrearOferta(boxV.indice);
        	}
        	numRanking2V.appendChild(numRankingValue2V);
        	
        	
        	contenidoV.appendChild(numRankingV);
        	if(i < 14/2){
        		contenidoV.appendChild(metalV);
        	}else{
        		contenidoV.appendChild(ceramicaV);
        	} 	
        	contenidoV.appendChild(numRanking2V);
        	contenidoV.appendChild(creditosV);
        	
        	divPuestoV.appendChild(boxV);
        	divPuestoV.appendChild(contenidoV);
        	
        	divPuntuacionesV.appendChild(divPuestoV);
    	}
        
    	venderContainer.add(elementV);
    	venderContainer.visible = false;
    	
    	function pasarAcrearOferta(indice){
    		
    		let oferta = [];
    		
    		console.log("INDICEEEEEEE" +indice);
    		
    		switch(indice){
        	case 0:
        	case 7:
        		oferta[0] = 25;
        		oferta[1] = 100;
        		break;
        	case 1:
        	case 8:
        		oferta[0] = 50;
        		oferta[1] = 200;
        		break;
        	case 2:
        	case 9:
        		oferta[0] = 75;
        		oferta[1] = 300;
        		break;
        	case 3:
        	case 10:
        		oferta[0] = 100;
        		oferta[1] = 400;
        		break;
        	case 4:
        	case 11:
        		oferta[0] = 200;
        		oferta[1] = 800;
        		break;
        	case 5:
        	case 12:
        		oferta[0] = 500;
        		oferta[1] = 2000;
        		break;
        	case 6:
        	case 13:
        		oferta[0] = 1000;
        		oferta[1] = 4000;
        		break;
        	default:
        		break;
        	}
    		
    		if(indice < 14/2){
    			oferta[2] = "metal";
    		}else{
    			oferta[2] = "ceramica";
    		}
		
    		console.log(oferta[0]+", "+oferta[1]+", "+oferta[2])
    		//cantidad, recurso, creditos a cambio
        	crearOferta(oferta[0], oferta[2], oferta[1], data.miEdificio.id);
    	}
    	
    	
    	// CONTAINER OFERTAS
    	var elementO = this.add.dom(-370, 280).createFromCache('centroComercioMenuO');
        elementO.setPerspective(800);
        
        var divPuntuacionesO = document.getElementById("divPuntuacionesO");
      	
        if(game.global.offers.length == 0){
        	console.log("NO HAY OFERTAS PARA ELIMINAR");
        }
        
        var ofertasJugador = pedirOfertasJugador();
        
    	for(var i = 0; i < ofertasJugador.length; i++){
    		
    		let oferta = ofertasJugador[i];
    		
    		let divPuestoO = document.createElement("div");
    		divPuestoO.style.marginTop = "35px";
    		divPuestoO.style.cursor = "pointer";       	
    		
    		let boxO = document.createElement("img");
        	boxO.src = "assets/interface/Gameplay/boxComercio.png";
        	boxO.style.marginLeft ="0px";
        	boxO.style.marginTop = "0px";
        	boxO.style.width = '100%';
        	boxO.style.height = 'auto';
        	boxO.indice = i;
        	boxO.onclick = function(){
        		game.global.sound = game.sound.play('denegar');
        		boxO.parentElement.style.visibility = "hidden";
        		borrarOferta(oferta.idOferta, data.miEdificio.id);
        	}
        	boxO.onmouseover = function(){
        		boxO.src = "assets/interface/Gameplay/boxComercioBorrar.png";
        		if(metalO != undefined){
        			metalO.style.visible = "hidden";
        		}
        		if(ceramicaO != undefined){
        			ceramicaO.style.visible = "hidden";
        		}
        		creditosO.style.visible = "hidden";
        		numRankingO.style.visible = "hidden";
        		numRanking2O.style.visible = "hidden";
        	}
        	boxO.onmouseout = function(){
        		boxO.src = "assets/interface/Gameplay/boxComercio.png";
        		if(metalO != undefined){
        			metalO.style.visible = "visible";
        		}
        		if(ceramicaO != undefined){
        			ceramicaO.style.visible = "visible";
        		}
        		creditosO.style.visible = "visible";
        		numRankingO.style.visible = "visible";
        		numRanking2O.style.visible = "visible";
        	}
        	
        	/*el div de los span*/
        	var contenidoO = document.createElement("div");
        	contenidoO.style.cssText = "position:relative;color:white;margin-top:-40px;margin-left:15px";
        	
        	/*LOS ICONOS */
        	if(oferta.material == "metal"){
        		var metalO = document.createElement("img");
            	metalO.src = "assets/interface/Gameplay/metal.png";
            	metalO.style.position = "absolute";
            	metalO.style.left = "180px";
            	metalO.indice = i;
            	metalO.onclick = function(){
            		game.global.sound = game.sound.play('denegar');
            		borrarOferta(oferta.idOferta, data.miEdificio.id);
            		boxO.parentElement.style.visibility = "hidden";
            	}
            	
            }else{
        		var ceramicaO = document.createElement("img");
            	ceramicaO.src = "assets/interface/Gameplay/arcilla.png";
            	ceramicaO.style.position = "absolute";
            	ceramicaO.style.left = "180px";
            	ceramicaO.indice = i;
            	ceramicaO.onclick = function(){
            		game.global.sound = game.sound.play('denegar');
            		borrarOferta(oferta.idOferta, data.miEdificio.id);
            		boxO.parentElement.style.visibility = "hidden";
            	}
            }
        	
            var creditosO = document.createElement("img");
            creditosO.src = "assets/interface/Gameplay/creditos.png";
            creditosO.style.position = "absolute";
            creditosO.style.left = "45px"; 
            creditosO.indice = i;
            creditosO.onclick = function(){
            	game.global.sound = game.sound.play('denegar');
            	borrarOferta(oferta.idOferta, data.miEdificio.id);
            	boxO.parentElement.style.visibility = "hidden";
            }     
        	

            /*los span*/
        	switch(i){
        	case 0:
        	case 7:
        		var numRankingValueO = document.createTextNode(oferta.cantidad);
        		var numRankingValue2O = document.createTextNode(oferta.creditos);
        		break;
        	case 1:
        	case 8:
        		var numRankingValueO = document.createTextNode(oferta.cantidad);
        		var numRankingValue2O = document.createTextNode(oferta.creditos);
        		break;
        	case 2:
        	case 9:
        		var numRankingValueO = document.createTextNode(oferta.cantidad);
        		var numRankingValue2O = document.createTextNode(oferta.creditos);
        		break;
        	case 3:
        	case 10:
        		var numRankingValueO = document.createTextNode(oferta.cantidad);
        		var numRankingValue2O = document.createTextNode(oferta.creditos);
        		break;
        	case 4:
        	case 11:
        		var numRankingValueO = document.createTextNode(oferta.cantidad);
        		var numRankingValue2O = document.createTextNode(oferta.creditos);
        		break;
        	case 5:
        	case 12:
        		var numRankingValueO = document.createTextNode(oferta.cantidad);
        		var numRankingValue2O = document.createTextNode(oferta.creditos);
        		break;
        	case 6:
        	case 13:
        		var numRankingValueO = document.createTextNode(oferta.cantidad);
        		var numRankingValue2O = document.createTextNode(oferta.creditos);
        		break;
        	default:
        		break;
        	}
        	var numRankingO = document.createElement("span");
        	numRankingO.style.position = "absolute";
        	numRankingO.style.top = "0px";
        	numRankingO.style.left = "140px";
        	numRankingO.indice = i;
        	numRankingO.onclick = function(){
        		game.global.sound = game.sound.play('denegar');
        		borrarOferta(oferta.idOferta, data.miEdificio.id);
        		boxO.parentElement.style.visibility = "hidden";
        	}
        	numRankingO.appendChild(numRankingValueO);
        	
        	
        	var numRanking2O = document.createElement("span");
        	numRanking2O.style.position = "absolute";
        	numRanking2O.style.left = "0px";
        	numRanking2O.style.top = "0px";
        	numRanking2O.indice = i;
        	numRanking2O.onclick = function(){
        		game.global.sound = game.sound.play('denegar');
        		borrarOferta(oferta.idOferta, data.miEdificio.id);
        		boxO.parentElement.style.visibility = "hidden";
        	}
        	numRanking2O.appendChild(numRankingValue2O); 
        	
        	
        	
        	contenidoO.appendChild(numRankingO);
        	if(oferta.material == "metal"){
        		contenidoO.appendChild(metalO);
        	}else{
        		contenidoO.appendChild(ceramicaO);
        	} 	
        	contenidoO.appendChild(numRanking2O);
        	contenidoO.appendChild(creditosO);
        	
        	divPuestoO.appendChild(boxO);
        	divPuestoO.appendChild(contenidoO);
        	
        	divPuntuacionesO.appendChild(divPuestoO);
    	}
        
    	ofertasContainer.add(elementO);
    	ofertasContainer.visible = false;
        
        
    	
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
    		game.global.sound = game.sound.play('pulsarBoton');
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
    		game.global.sound = game.sound.play('pulsarBoton');
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