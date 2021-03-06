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
    	
    	var scene = this;
    	this.price = 0;
    	
    	let msg = new Object();
		msg.event = 'GET CENTRO DE MANDO MENU';
		game.global.socket.send(JSON.stringify(msg));
    	
		

    	game.global.effects.seleccionarEdificio.play();
		game.global.effects.seleccionarEdificio.setVolume(game.global.myPlayer.config.volEffects/100);
    	//
    	this.miEdificio = data.miEdificio;
    	
    	// Aquí se guardan y usan los datos leidos desde xml multiidioma
    	var textoDesdeXml, textoTut;
    	
    	var enconst = this.add.image(game.global.buildingMenu.x, game.global.buildingMenu.y, 'menuEnConstruccionEng').setOrigin(0, 0);
    	var enconstEsp = this.add.image(game.global.buildingMenu.x, game.global.buildingMenu.y, 'menuEnConstruccion').setOrigin(0, 0);
    	var btnFinishConstruccion = this.add.image(1350, 850, 'btnAdministracion').setOrigin(0, 0).setInteractive();
    	textoDesdeXml = this.cache.xml.get(game.global.idioma).getElementsByTagName('terminarahora')[0].childNodes[0].nodeValue;
		var txtTerminarAhora = this.add.text(1380, 875, textoDesdeXml, { fontFamily: '"pantonBlack"', color: 'white' , fontSize: '30px', fontWeight: 'bold'});
		var iconMonedas = this.add.image(1700, 865, 'iconoUC').setOrigin(0, 0);
		enconst.visible = false;
		enconstEsp.visible = false;
		btnFinishConstruccion.visible = false;
    	txtTerminarAhora.visible = false;
    	iconMonedas.visible = false;
    	btnFinishConstruccion.setScale(1.1, 0.9);
    	
    	this.costoMonedas = this.add.text(1650, 875, this.price, { fontFamily: '"pantonBlack"', color: 'white' , fontSize: '30px', fontWeight: 'bold'});
    	this.costoMonedas.visible = false;
    	
	    if (!this.miEdificio.enConstruccion) {
	    	// Contenedor del panel de mejoras
	    	var mejorasContainer = this.add.container(game.global.buildingMenu.x, game.global.buildingMenu.y);
	    	// Contenedor del panel de detalles
	    	var detallesContainer = this.add.container(game.global.buildingMenu.x, game.global.buildingMenu.y);
	    	// Contenedor del panel de edificios
	    	var edificiosContainer = this.add.container(game.global.buildingMenu.x, game.global.buildingMenu.y);
	    	//Expansion panel
	    	var expansionContainer = this.add.container(game.global.buildingMenu.x, game.global.buildingMenu.y);
	    	
	    	mejorasContainer.depth = -3;
	    	detallesContainer.depth = -3;
	    	edificiosContainer.depth = -3;
	    	expansionContainer.depth = -3;
	    	if(game.global.idioma == 'eng'){
	    		game.scene.getScene('GameInterface').panel.setTexture('commandCenter');
	    	}else{
	    		game.scene.getScene('GameInterface').panel.setTexture('panelCMando');
	    	}
	    	
	    	
	    	//Se añade a cada contenedor su imagen de fondo
			if(game.global.idioma == "eng"){
				this.intUpdates = this.add.image(0, 0, 'interfazIUpdates').setOrigin(0, 0); 
				this.intBuildings = this.add.image(0, 0, 'interfazColony').setOrigin(0, 0); 
				this.intDetails = this.add.image(0, 0, 'interfazIDetails').setOrigin(0, 0);
				this.intExpan = this.add.image(0, 0, 'interfazExpansionEng').setOrigin(0, 0);
				mejorasContainer.add(this.intUpdates);
				detallesContainer.add(this.intDetails);
				edificiosContainer.add(this.intBuildings);
				expansionContainer.add(this.intExpan);
			}else{
				this.intMejoras = this.add.image(0, 0, 'interfazIMejoras').setOrigin(0, 0); 
				this.intDetalles = this.add.image(0, 0, 'interfazIDetalles').setOrigin(0, 0); 
				this.intEdificios = this.add.image(0, 0, 'interfazColonia').setOrigin(0, 0);
				this.intExpansion = this.add.image(0, 0, 'interfazExpansion').setOrigin(0, 0);
				mejorasContainer.add(this.intMejoras);
				detallesContainer.add(this.intDetalles);
				edificiosContainer.add(this.intEdificios);
				expansionContainer.add(this.intExpansion);
			}
	    	
	    	//Se alterna entre contenedores según el icono seleccionado
	    	this.iconoDetalles = this.add.image(game.global.buildingMenu.x + 240, game.global.buildingMenu.y + 10, 'iconoDetalles').setOrigin(0, 0);
	    	this.iconoDetalles.setInteractive().on('pointerdown', function(pointer, localX, localY, event) { 
	    		game.global.effects.pulsarBoton.play();
	    		game.global.effects.pulsarBoton.setVolume(game.global.myPlayer.config.volEffects/100); 
	    		detallesContainer.visible= true;
	    		mejorasContainer.visible= false;
	    		edificiosContainer.visible= false;
	    		expansionContainer.visible= false;
	    	});
	    	this.iconoMejoras = this.add.image(game.global.buildingMenu.x + 170, game.global.buildingMenu.y + 10, 'iconoMejoras').setOrigin(0, 0);
	    	this.iconoMejoras.setInteractive().on('pointerdown', function(pointer, localX, localY, event) {
	    		game.global.effects.pulsarBoton.play();
	    		game.global.effects.pulsarBoton.setVolume(game.global.myPlayer.config.volEffects/100); 
	    		detallesContainer.visible= false;
	    		mejorasContainer.visible= true;
	    		edificiosContainer.visible= false;
	    		expansionContainer.visible= false;
	    	});
	    	this.iconoEdificio = this.add.image(game.global.buildingMenu.x + 25, game.global.buildingMenu.y + 10, 'iconoEdificio').setOrigin(0, 0);
	    	this.iconoEdificio.setInteractive().on('pointerdown', function(pointer, localX, localY, event) {
	    		game.global.effects.pulsarBoton.play();
	    		game.global.effects.pulsarBoton.setVolume(game.global.myPlayer.config.volEffects/100); 
	    		detallesContainer.visible= false;
	    		mejorasContainer.visible= false;
	    		edificiosContainer.visible= true;
	    		expansionContainer.visible= false;
	    	});
	    	
	    	this.iconoExpansion = this.add.image(game.global.buildingMenu.x + 110, game.global.buildingMenu.y + 20, 'iconExpansion').setOrigin(0, 0).setScale(0.27,0.27);
	    	this.iconoExpansion.setInteractive().on('pointerdown', function(pointer, localX, localY, event) {
	    		game.global.effects.pulsarBoton.play();
	    		game.global.effects.pulsarBoton.setVolume(game.global.myPlayer.config.volEffects/100); 
	    		detallesContainer.visible= false;
	    		mejorasContainer.visible= false;
	    		edificiosContainer.visible= false;
	    		expansionContainer.visible= true;
	    	});
	    	
	    	//  CONTENEDOR EDIFICIOS
	    	
	    	var elementV = this.add.dom(-370, 280).createFromCache('centroMandoMenu');
	        elementV.setPerspective(800);
	        
	       
	        
	        var divMando = document.getElementById("divMando");
	        var i = 0;
	        
	        
	    	for(let edificio of game.global.edificios.values()){
	    		if (edificio.sprite !== 'centroDeMando' && (edificio.numColonos + edificio.jobs) > 0) {	    		
		    		let divPuestoV = document.createElement("div");
		    		divPuestoV.style.marginTop = "40px";
		    		
		    		/*la imagen*/
		    		let boxV = document.createElement("img");
		        	boxV.src = "assets/interface/interfazEdificioRecuadro.png";
		        	boxV.style.marginLeft ="0px";
		        	boxV.style.marginTop = "0px";
		        	boxV.style.width = '98%';
		        	boxV.style.height = 'auto';
		        	boxV.indice = i;
		        	
		        	
		    		var imagen = document.createElement("img");
		    		if(edificio.listImage != "assets/sprites/Edificios/Taller_1.png"){
		    			imagen.src = edificio.listImage + edificio.level + '.png';
	    			}else{
	    				imagen.src = "assets/sprites/Edificios/Taller" + edificio.level + '.png';
	    			}
		    		imagen.style.position = "absolute";
		    		imagen.style.left = "10px";
		    		if(i != 0){
		    			imagen.style.marginTop = "10px";
		    		}
		    		imagen.style.width = '50px';
		    		imagen.style.heigth = 'auto';
		    		
		    		var colono = document.createElement("img");
		    		colono.src = 'assets/interface/Gameplay/newColon.png';
		    		colono.style.position = "absolute";
		    		colono.style.left = "85px";
		    		colono.style.marginTop = "27px";
		    		colono.style.width = '17px';
		    		colono.style.heigth = 'auto';
		    		
		    		let menos = document.createElement("img");
		    		menos.src = 'assets/interface/Gameplay/Colonos/botonMenos.png';
		    		menos.style.position = "absolute";
		    		menos.style.left = "120px";
		    		menos.style.marginTop = "28px";
		    		menos.style.width = '17px';
		    		menos.style.heigth = 'auto';
		    		menos.style.cursor = "pointer";
		    		menos.indice = i;
		    		menos.edificio = edificio;
		    		
		    		var interior = document.createElement("img");
		    		interior.src = 'assets/interface/Gameplay/Colonos/Interior.png';
		    		interior.style.position = "absolute";
		    		interior.style.left = "137px";
		    		interior.style.marginTop = "28px";
		    		interior.style.width = '34px';
		    		interior.style.heigth = 'auto';
		    		
		    		let mas = document.createElement("img");
		    		mas.src = 'assets/interface/Gameplay/Colonos/botonMas.png';
		    		mas.style.position = "absolute";
		    		mas.style.left = "171px";
		    		mas.style.marginTop = "28px";
		    		mas.style.width = '17px';
		    		mas.style.heigth = 'auto';
		    		mas.style.cursor = "pointer";
		    		mas.indice = i;
		    		mas.edificio = edificio;
		    		
		    		var number = document.createElement("span");
		    		number.style.position = "absolute";
		    		number.style.left = "150px";
		    		number.style.marginTop = "30px";
		    		number.style.width = '20px';
		    		number.style.color = '#fff';
		    		number.indice = i;
		    		number.setAttribute("id", "numColonos" + edificio.id);
		 
		    		var name = document.createElement("span");
		    		name.style.position = "absolute";
		    		name.style.left = "80px";
		    		name.style.marginTop = "5px";
		    		name.style.width = '300px';
		    		name.style.color = '#fff';
		    		name.indice = i;
		        	
		    		var num = document.createTextNode(edificio.numColonos);
		    		number.appendChild(num);
		    		var n;
		        	if(game.global.idioma == 'eng'){
		        		n = document.createTextNode(edificio.nameEng);
		        	}else{
		        		n = document.createTextNode(edificio.nameEsp);
		        	}
		        	name.appendChild(n);
		        	
		        	/*boxV.onmouseover = function(){
		        		boxV.src = "assets/interface/interfazEdificioRecuadroHover.png";
		        	}
		        	boxV.onmouseout = function(){
		        		boxV.src = "assets/interface/interfazEdificioRecuadro.png";
		        	}*/
		        	
		        	menos.onmouseover = function(){
		        		this.src = "assets/interface/Gameplay/Colonos/botonMenosHover.png";
		        	}
		        	menos.onmouseout = function(){
		        		this.src = "assets/interface/Gameplay/Colonos/botonMenos.png";
		        	}
		        	menos.onmousedown = function(){
		        		if (this.edificio.numColonos > 0) {
		        			this.edificio.numColonos--;
		        			this.edificio.jobs++;
			        		document.getElementById("numColonos" + this.edificio.id).innerHTML = this.edificio.numColonos;
			        		let msg = new Object();
			        		msg.event = 'QUITAR COLONO';
			        		msg.id = edificio.id;
			        		game.global.socket.send(JSON.stringify(msg));
		        		}
		        	}
		        	
		        	mas.onmouseover = function(){
		        		
		        		this.src = "assets/interface/Gameplay/Colonos/botonMasHover.png";
		        	}
		        	mas.onmouseout = function(){
		        		this.src = "assets/interface/Gameplay/Colonos/botonMas.png";
		        	}
		        	mas.onmousedown = function(){
		        		if (this.edificio.jobs > 0 && parseInt(game.global.resources.colonos.split("/")[0]) < parseInt(game.global.resources.colonos.split("/")[1])) {
			        		this.edificio.numColonos++;
			        		this.edificio.jobs--;
			        		document.getElementById("numColonos" + this.edificio.id).innerHTML = this.edificio.numColonos;
			        		let msg = new Object();
			        		msg.event = 'ADD COLONO';
			        		msg.id = edificio.id;
			        		game.global.socket.send(JSON.stringify(msg));
		        		}
		        	}
		        	
		        	/*el div de los span*/
		        	var contenidoV = document.createElement("div");
		        	contenidoV.style.cssText = "position:relative;color:white;margin-top:-40px;margin-left:15px";
		        	
		        	divPuestoV.appendChild(name);
		        	divPuestoV.appendChild(colono);
		        	divPuestoV.appendChild(imagen);
		        	divPuestoV.appendChild(mas);
		        	divPuestoV.appendChild(menos);
		        	divPuestoV.appendChild(interior);
		        	divPuestoV.appendChild(number);
		        	divPuestoV.appendChild(boxV);
		        	divPuestoV.appendChild(contenidoV);
		        	
		        	
		        	divMando.appendChild(divPuestoV);
		        	
		        	i++;
	    		}
	    	}
	    	
	    	if(i==0){
	    		let divPuestoV = document.createElement("div");
	    		divPuestoV.style.marginTop = "40px";
	    		
	    		var noInfo = document.createElement("span");
	    		noInfo.style.position = "absolute";
	    		noInfo.style.left = "0px";
	    		noInfo.style.marginTop = "5px";
	    		noInfo.style.fontFamily = "pantonLight";
	    		noInfo.style.fontSize = '10px';
	    		noInfo.style.textAlign = "center";
	    		noInfo.style.color = '#fff';
	    		noInfo.indice = i;
	    		
	    		var n;
	        	if(game.global.idioma == 'eng'){
	        		n = document.createTextNode("To manage settlers you must build houses and other buildings. The workshop, the generators or the extraction platform are some of the buildings that need settlers. Go to the Construction section on the left side of the screen.");
	        	}else{
	        		n = document.createTextNode("Para administrar colonos debe construir viviendas y otros EDIFICIOS. El taller, los generadores o la plataforma de extracción son algunos de los EDIFICIOS que necesitan colonos. Ve a la sección de Construcción que se encuentra en la parte izquierda de la pantalla.");
	        	}
	        	noInfo.appendChild(n);
	        	
	        	divPuestoV.appendChild(noInfo);
	        	
	        	
	        	divMando.appendChild(divPuestoV);
	    	}
	        
	    	edificiosContainer.add(elementV);
	    	

			/////////////////////////////////////SECCION PARA INVESTIGACIONES /////////////////////////////////////////////////////
	    	var element = this.add.dom(-370, 280).createFromCache('centroMandoEMenu');
	        element.setPerspective(800);
	        
	        var divExpansion = document.getElementById("divExpansion");
	        var i = 0;
	        
	        var desc = document.createElement("span");
	        desc.style.position = "absolute";
	        desc.style.left = "0px";
	        desc.style.marginTop = "-290px";
	        desc.style.width = '250px';
	        desc.style.color = '#fff';
	        desc.style.fontSize = '10px';
	        desc.style.fontFamily = 'pantonLight';
	        
	        var desctxt;
    		if(game.global.idioma == 'esp'){
    			desctxt = document.createTextNode("Aquí puedes desbloquear nuevas expansiones para tu territorio");
    			desc.appendChild(desctxt);
        	}else{
        		desctxt = document.createTextNode("Here you can unlock new expansions for your territory");
        		desc.appendChild(desctxt);
        	}
	        
	    	for(i = 0;i<4;i++){
	    		    		
		    		let divPuestoV = document.createElement("div");
		    		divPuestoV.style.marginTop = "40px";
		    		
		    		/*la imagen*/
		    		let boxV = document.createElement("img");
		        	boxV.src = "assets/interface/Gameplay/Mando/rect.png";
		        	boxV.style.marginLeft ="0px";
		        	boxV.style.marginTop = "0px";
		        	boxV.style.width = '98%';
		        	boxV.style.height = 'auto';
		        	boxV.indice = i;
		        	
		    		let enviar = document.createElement("img");
		    		enviar.src = 'assets/interface/Gameplay/Mando/botonComprar.png';
		    		enviar.style.position = "absolute";
		    		enviar.style.left = "135px";
		    		enviar.style.marginTop = "40px";
		    		enviar.style.width = '70px';
		    		enviar.style.heigth = 'auto';
		    		enviar.style.cursor = "pointer";
		    		enviar.indice = i;
		    		
		    		let verMapa = document.createElement("img");
		    		verMapa.src = 'assets/interface/Gameplay/Mando/buttonMapa.png';
		    		verMapa.style.position = "absolute";
		    		verMapa.style.left = "55px";
		    		verMapa.style.marginTop = "37px";
		    		verMapa.style.width = '70px';
		    		verMapa.style.heigth = 'auto';
		    		verMapa.style.cursor = "pointer";
		    		verMapa.indice = i;
		    		
		    		let mapaicon = document.createElement("img");
		    		var aux1 = i+1;
		    		mapaicon.src = 'assets/interface/Gameplay/Mando/sector'+aux1+'.png';
		    		mapaicon.style.position = "absolute";
		    		mapaicon.style.left = "5px";
		    		mapaicon.style.marginTop = "13px";
		    		mapaicon.style.width = '45px';
		    		mapaicon.style.heigth = 'auto';
		    		mapaicon.indice = i;
		    		
		    		var timetxt = document.createElement("span");
		    		timetxt.style.position = "absolute";
		    		timetxt.style.left = "85px";
		    		timetxt.style.marginTop = "4px";
		    		timetxt.style.width = '100px';
		    		timetxt.style.fontSize = '10px';
		    		timetxt.style.fontFamily = 'pantonBlack';
		    		timetxt.style.color = '#fff';
		    		timetxt.indice = i;
		    		var textAux = document.createTextNode("ZONA NOROESTE");
	    			timetxt.appendChild(textAux);
	    			
	    			var casillas = document.createElement("span");
	    			casillas.style.position = "absolute";
	    			casillas.style.left = "75px";
	    			casillas.style.marginTop = "20px";
	    			casillas.style.width = '100px';
	    			casillas.style.fontSize = '10px';
	    			casillas.style.fontFamily = 'pantonLight';
	    			casillas.style.color = '#fff';
	    			casillas.indice = i;
	    			var textAux1 = document.createTextNode("30 Casillas");
	    			casillas.appendChild(textAux1);
	    			
	    			var coste = document.createElement("span");
	    			coste.style.position = "absolute";
	    			coste.style.left = "160px";
	    			coste.style.marginTop = "20px";
	    			coste.style.width = '100px';
	    			coste.style.fontSize = '10px';
	    			coste.style.fontFamily = 'pantonLight';
	    			coste.style.color = '#fff';
	    			coste.indice = i;
	    			var textAux2 = document.createTextNode("10k");
	    			coste.appendChild(textAux2);
	    			
	    			let billete = document.createElement("img");
	    			billete.src = 'assets/interface/Gameplay/creditosFloat.png';
	    			billete.style.position = "absolute";
	    			billete.style.left = "180px";
	    			billete.style.marginTop = "18px";
	    			billete.style.width = '15px';
	    			billete.style.heigth = 'auto';
	    			billete.indice = i;
		    
		        	enviar.onmouseover = function(){
		        		enviar.src = 'assets/interface/Gameplay/Mando/botonComprarHover.png';
		        	}
		        	enviar.onmouseout = function(){
		        		enviar.src = 'assets/interface/Gameplay/Mando/botonComprar.png';
		        	}
		        	enviar.onmousedown = function(){
		        		//Aqui debe hacerse que se borre la expansion del listado y salga la expansion concedida en el mapa, ademas de reducir sus recursos
		        		Swal.fire({
	        			  title: '¿Estás seguro/a?',
	        			  //text: "You won't be able to revert this!",
	        			  icon: 'warning',
	        			  showCancelButton: true,
	        			  confirmButtonColor: '#3085d6',
	        			  cancelButtonColor: '#d33',
	        			  confirmButtonText: 'Si, comprar!'
	        			}).then((result) => {
	        			  if (result.value) {
	        			    Swal.fire(
	        			      '¡Enhorabuena!',
	        			      'Has conseguido un nuevo terreno',
	        			      'success'
	        			    )
			        		enviar.style.cursor = 'no-drop';
			        		enviar.style.opacity = '0.5';
	        			  }
	        			})
		        		
		        		//Aqui hacer que se envie el colono a la expedición
		        	}
		        	
		        	
		        	verMapa.onmouseover = function(){
		        		verMapa.src = 'assets/interface/Gameplay/Mando/buttonMapaHover.png';
		        	}
		        	verMapa.onmouseout = function(){
		        		verMapa.src = 'assets/interface/Gameplay/Mando/buttonMapa.png';
		        	}
		        	verMapa.onmousedown = function(){
		        		
		        	}
		        	
		        	/*el div de los span*/
		        	var contenidoV = document.createElement("div");
		        	contenidoV.style.cssText = "position:relative;color:white;margin-top:-30px;margin-left:15px;";
		        	
		        	divPuestoV.appendChild(desc);
		        	divPuestoV.appendChild(timetxt);
		        	divPuestoV.appendChild(enviar);
		        	divPuestoV.appendChild(verMapa);
		        	divPuestoV.appendChild(casillas);
		        	divPuestoV.appendChild(coste);
		        	divPuestoV.appendChild(billete);
		        	divPuestoV.appendChild(mapaicon);
		        	divPuestoV.appendChild(boxV);
		        	divPuestoV.appendChild(contenidoV);
		        	
		        	
		        	divExpansion.appendChild(divPuestoV);
		     
	    		
	    	}
	    	
	    	if(i==0){
	    		let divPuestoV = document.createElement("div");
	    		divPuestoV.style.marginTop = "40px";
	    		
	    		var noInfo = document.createElement("span");
	    		noInfo.style.position = "absolute";
	    		noInfo.style.left = "0px";
	    		noInfo.style.marginTop = "5px";
	    		noInfo.style.fontFamily = "pantonLight";
	    		noInfo.style.fontSize = '10px';
	    		noInfo.style.textAlign = "center";
	    		noInfo.style.color = '#fff';
	    		noInfo.indice = i;
	    		
	    		var n;
	        	if(game.global.idioma == 'eng'){
	        		n = document.createTextNode("To manage settlers you must build houses and other buildings. The workshop, the generators or the extraction platform are some of the buildings that need settlers. Go to the Construction section on the left side of the screen.");
	        	}else{
	        		n = document.createTextNode("Para administrar colonos debe construir viviendas y otros EDIFICIOS. El taller, los generadores o la plataforma de extracción son algunos de los EDIFICIOS que necesitan colonos. Ve a la sección de Construcción que se encuentra en la parte izquierda de la pantalla.");
	        	}
	        	noInfo.appendChild(n);
	        	
	        	divPuestoV.appendChild(noInfo);
	        	
	        	
	        	divExpansion.appendChild(divPuestoV);
	    	}
	        
	    	expansionContainer.add(element);
	    	
	    	function aux(edificioCons){
	    		if(!game.global.construyendo){
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
	    	var mover = this.add.image(400, 800, 'btnMover').setOrigin(0.5,0.5).setInteractive();
	    	var destruir = this.add.image(180, 800, 'btnDestruir').setOrigin(0.5,0.5).setInteractive();
	    	
	    	destruir.on('pointerover',function(pointer){
	    		destruir.setFrame(1);
	    	})
	    	destruir.on('pointerout',function(pointer){
	    		destruir.setFrame(0);
	    	})
	    	
	    	destruir.on('pointerdown', function(pointer, localX, localY, event){
	    		game.global.effects.pulsarBoton.play();
	    		game.global.effects.pulsarBoton.setVolume(game.global.myPlayer.config.volEffects/100); 
	    		if(!game.global.construyendo){
					/*game.scene.pause();
					data.miEdificio.move();
					game.scene.stop('CentroMandoMenu');
					setTimeout(function(){ game.global.inMenu = false; }, 500);*/
	    			Swal.fire({
	    				  title: 'Are you sure?',
	    				  text: "You won't be able to revert this! It will be returned to you:", //Aqui hay que añadir los recursos que se le devolveran
	    				  icon: 'warning',
	    				  showCancelButton: true,
	    				  confirmButtonColor: '#3085d6',
	    				  cancelButtonColor: '#d33',
	    				  confirmButtonText: 'Yes, delete it!'
	    				}).then((result) => {
	    				  if (result.value) {
	    				    Swal.fire(
	    				      'Deleted!',
	    				      'Your building has been deleted.',
	    				      'success'
	    				    )
	    				  }
					});
	    		}
	    	});
	    	
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
	    	detallesContainer.add(destruir);
	    	
	    	//	CONTENEDOR MEJORAS
	    	// Se añade el titulo de siguiente mejora
	    	textoDesdeXml = this.cache.xml.get(game.global.idioma).getElementsByTagName('sigMejora')[0].childNodes[0].nodeValue;
	    	this.titulo = this.add.text(300, 180, textoDesdeXml, { fontFamily: '"Roboto Condensed"', color: 'white' , fontSize: '24px', fontWeight: 'bold'}).setOrigin(0.5, 0.5);
	    	this.arrowleft = this.add.image(100, 280, 'arrow').setOrigin(0.5, 0.5).setInteractive().setFlip(true,false);
	    	this.arrowright = this.add.image(450, 280, 'arrow').setOrigin(0.5, 0.5).setInteractive();
	    	game.scene.getScene('CentroMandoMenu').arrowleft.visible = false;
	    	mejorasContainer.add(this.arrowleft);
	    	mejorasContainer.add(this.arrowright);
	    	mejorasContainer.add(this.titulo);
	    	
	    	this.arrowleft.on('pointerover',function(pointer){
	    		this.setFrame(1);
	    	})
	    	
	    	this.arrowleft.on('pointerout',function(pointer){
		    		this.setFrame(0);
		    })
		    
		    this.arrowright.on('pointerover',function(pointer){
	    		this.setFrame(1);
	    	})
	    	
	    	this.arrowright.on('pointerout',function(pointer){
		    		this.setFrame(0);
		    })
		    
		    
	    	/*si nuestro edificio tiene todavia opcion de seguir subiendo de nivel...*/
	    	if(data.miEdificio.level < data.miEdificio.levelMax){
	        	// Se añade la imagen de siguiente nivel
	    		var edificioSigNivel = this.add.image(300, 280, this.miEdificio.sprite).setOrigin(0.5, 0.5).setScale(0.8, 0.8).setFrame(this.miEdificio.level);
	    		mejorasContainer.add(edificioSigNivel);
	    		this.nivelEdifSprite = this.miEdificio.level+1;
	    		
	    		// Se añade la descripción del siguiente nivel
	    		textoDesdeXml = this.cache.xml.get(game.global.idioma).getElementsByTagName('cmmejoraNivel' + (this.miEdificio.level + 1))[0].childNodes[0].nodeValue;
	    		
	    		this.descSigNivel = this.add.text(80, 360, justifica(textoDesdeXml), { fontFamily: '"Roboto Condensed"', color: 'white' , fontSize: '24px', fontWeight: 'bold'});
	        	mejorasContainer.add(this.descSigNivel);
	        	
	    		this.subirNivel = this.add.image(300,800, 'btnSubirNivel').setOrigin(0.5,0.5).setInteractive();
	    		this.nivelSuperior = this.add.text(340, 799, this.nivelEdifSprite, { fontFamily: '"pantonBlack"', color: 'white' , fontSize: '18px'}).setOrigin(0.5, 0.5);
		    		    	
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
		    	
		    	this.arrowleft.on('pointerdown', function(pointer, localX, localY, event){
		    		game.global.effects.pulsarBoton.play();
		    		game.global.effects.pulsarBoton.setVolume(game.global.myPlayer.config.volEffects/100); 
		    		
		    		scene.nivelEdifSprite-=1;
		    		game.scene.getScene('CentroMandoMenu').arrowright.visible = true;

	    			edificioSigNivel.setFrame(scene.nivelEdifSprite-1);
		    		if(scene.nivelEdifSprite <= data.miEdificio.level+1){
		    			game.scene.getScene('CentroMandoMenu').arrowleft.visible = false;
		    		}
		    		
		    		/*scene.tweens.add({
				        targets: this.edificioSigNivel,
				        duration: 1500,
				        ease: 'Linear'
				    });*/
		    		
		    	});
		    	
		    	this.arrowright.on('pointerdown', function(pointer, localX, localY, event){
		    		game.global.effects.pulsarBoton.play();
		    		game.global.effects.pulsarBoton.setVolume(game.global.myPlayer.config.volEffects/100); 
		    		
		    		game.scene.getScene('CentroMandoMenu').arrowleft.visible = true;
		    		scene.nivelEdifSprite+=1;
		    		edificioSigNivel.setFrame(scene.nivelEdifSprite-1);
		    		if(scene.nivelEdifSprite == data.miEdificio.levelMax){
		    			game.scene.getScene('CentroMandoMenu').arrowright.visible = false;
		    		}
		    		if(scene.nivelEdifSprite-data.miEdificio.level > 1){
		    			//edificioSigNivel.setFrame(6);
		    		}
		    	});
		    	
		    	
	
				
				mejorasContainer.add(this.subirNivel);
				mejorasContainer.add(this.nivelSuperior);
	    	}
	    	else{
	    		textoDesdeXml = this.cache.xml.get(game.global.idioma).getElementsByTagName('cmmejoraNivel' + (this.miEdificio.level + 1))[0].childNodes[0].nodeValue;
	    		this.descSigNivel = this.add.text(300, 210, textoDesdeXml, { fontFamily: '"Roboto Condensed"', color: 'white' , fontSize: '24px', fontWeight: 'bold'}).setOrigin(0.5, 0.5);
	        	mejorasContainer.add(this.descSigNivel);
	        	game.scene.getScene('CentroMandoMenu').arrowright.visible = false;
	    	}
	
	    	
    	
	    	// Desactivamos al inicio los otros dos contenedores
			detallesContainer.visible= false;
			mejorasContainer.visible= false;
			expansionContainer.visible= false;
	    }
    	else {
    		let msg = new Object();
			msg.event = 'GET FINISH CONSTRUCTION PRICE';
			msg.id = this.miEdificio.id;
			game.global.socket.send(JSON.stringify(msg));		
    		
    		if(game.global.idioma == "eng"){
    			enconst.visible = true;
    			btnFinishConstruccion.visible = true;
    			txtTerminarAhora.visible = true;
    			this.costoMonedas.visible = true;
    			iconMonedas.visible = true;
    		}else{
    			enconstEsp.visible = true;
    			btnFinishConstruccion.visible = true;
    			txtTerminarAhora.visible = true;
    			this.costoMonedas.visible = true;
    			iconMonedas.visible = true;
    		}
    		
    		btnFinishConstruccion.on('pointerover',function(pointer){
    	    	btnFinishConstruccion.setFrame(1);
        	});
        	
    	    btnFinishConstruccion.on('pointerout',function(pointer){
    	    	btnFinishConstruccion.setFrame(0);
        	});
        	
    	    btnFinishConstruccion.on('pointerdown', function(pointer, localX, localY, event){
        		game.global.effects.pulsarBoton.play();
        		game.global.effects.pulsarBoton.setVolume(game.global.myPlayer.config.volEffects/100);
        		
        		Swal.fire({
    				text: game.scene.getScene('GameInterface').cache.xml.get(game.global.idioma).getElementsByTagName('construirahora')[0].childNodes[0].nodeValue + scene.price + game.scene.getScene('GameInterface').cache.xml.get(game.global.idioma).getElementsByTagName('construirahora2')[0].childNodes[0].nodeValue,
    				icon: 'question',
    				showCancelButton: true,
    				confirmButtonColor: '#3085d6',
    				cancelButtonColor: '#d33',
    				confirmButtonText: game.scene.getScene('GameInterface').cache.xml.get(game.global.idioma).getElementsByTagName('btnSwConfirmar')[0].childNodes[0].nodeValue
    			}).then((result) => {
    				if (result.value) {
    					//Aqui hacer lo que se requiera de terminar construccion
    					let msg = new Object();
    					msg.event = 'FINISH CONSTRUCTION';
    					msg.id = scene.miEdificio.id;
    					game.global.socket.send(JSON.stringify(msg));
    				}
    			})
        	});
    		
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
	    
    }
    update(time, delta) {
    	//this.nivelSuperior.text = this.nivelEdifSprite;
    	/*si nuestro edificio tiene todavia opcion de seguir subiendo de nivel...*/
    	if(this.miEdificio.level >= 3 && this.subirNivel !== null && typeof this.subirNivel !== "undefined"){
    		this.subirNivel.destroy();
    	}
    }
}