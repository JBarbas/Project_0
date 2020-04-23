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
    	
    	/*let msg = new Object();
		msg.event = 'GET CENTRO DE MANDO MENU';
		game.global.socket.send(JSON.stringify(msg));*/
    	
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
		if(game.global.idioma == "eng"){
			this.intUpdates = this.add.image(0, 0, 'intUpdates').setOrigin(0, 0); 
			this.intBuildings = this.add.image(0, 0, 'intBuildings').setOrigin(0, 0); 
			this.intDetails = this.add.image(0, 0, 'intDetails').setOrigin(0, 0);
			mejorasContainer.add(this.intUpdates);
			detallesContainer.add(this.intDetails);
			edificiosContainer.add(this.intBuildings);
		}else{
			this.intMejoras = this.add.image(0, 0, 'intMejoras').setOrigin(0, 0); 
			this.intDetalles = this.add.image(0, 0, 'intDetalles').setOrigin(0, 0); 
			this.intEdificios = this.add.image(0, 0, 'intEdificios').setOrigin(0, 0);
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
	    		imagen.src = edificio.listImage;
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
	        		if (this.edificio.jobs > this.edificio.numColonos && parseInt(game.global.resources.colonos.split("/")[0]) < parseInt(game.global.resources.colonos.split("/")[1])) {
		        		this.edificio.numColonos++;
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
        
    	edificiosContainer.add(elementV);
    	/*edificiosContainer.visible = false;*/  	
    	
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