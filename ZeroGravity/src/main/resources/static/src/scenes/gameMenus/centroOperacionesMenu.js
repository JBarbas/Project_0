class CentroOperacionesMenu extends Phaser.Scene {

	constructor() {
        super({
            key: "CentroOperacionesMenu",
        });
    }

    init(data) {
    	if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **CENTRO DE OPERACIONES** menu");
		}
    }
    
    preload () {
    	
    }
    create (data)  {
    	
    	var scene = this;
    	this.price = 0;
    	
    	let msg = new Object();
		msg.event = 'GET CENTRO DE OPERACIONES MENU';
		game.global.socket.send(JSON.stringify(msg));
    	
    	game.global.effects.seleccionarEdificio.play();
		game.global.effects.seleccionarEdificio.setVolume(game.global.myPlayer.config.volEffects/100);
    	//
    	this.miEdificio = data.miEdificio;
    	
    	// Aquí se guardan y usan los datos leidos desde xml multiidioma
    	var textoDesdeXml;

    	
    	if(game.global.idioma == 'eng'){
    		game.scene.getScene('GameInterface').panel.setTexture('operationsCenter');
    	}else{
    		game.scene.getScene('GameInterface').panel.setTexture('panelCOperaciones');
    	}
    	
    	var enconst = this.add.image(game.global.buildingMenu.x, game.global.buildingMenu.y, 'menuEnConstruccionEng').setOrigin(0, 0);
    	var enconstEsp = this.add.image(game.global.buildingMenu.x, game.global.buildingMenu.y, 'menuEnConstruccion').setOrigin(0, 0);
    	var btnFinishConstruccion = this.add.image(1350, 850, 'btnAdministracion').setOrigin(0, 0).setInteractive();
    	textoDesdeXml = this.cache.xml.get(game.global.idioma).getElementsByTagName('terminarahora')[0].childNodes[0].nodeValue;
		var txtTerminarAhora = this.add.text(1380, 875, textoDesdeXml, { fontFamily: '"pantonBlack"', color: 'white' , fontSize: '30px', fontWeight: 'bold'});
		var iconMonedas = this.add.image(1700, 865, 'iconoUC').setOrigin(0, 0);
    	btnFinishConstruccion.visible = false;
    	txtTerminarAhora.visible = false;
    	btnFinishConstruccion.setScale(1.1, 0.9);
    	
    	this.costoMonedas = this.add.text(1650, 875, this.price, { fontFamily: '"pantonBlack"', color: 'white' , fontSize: '30px', fontWeight: 'bold'});
    	this.costoMonedas.visible = false;
    	
	    if (!this.miEdificio.enConstruccion) {
	    	// Contenedor del panel de mejoras
	    	var mejorasContainer = this.add.container(game.global.buildingMenu.x, game.global.buildingMenu.y);
	    	// Contenedor del panel de detalles
	    	var detallesContainer = this.add.container(game.global.buildingMenu.x, game.global.buildingMenu.y);
	    	// Contenedor del panel de gestion
	    	var edificiosContainer = this.add.container(game.global.buildingMenu.x, game.global.buildingMenu.y);
	    	
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
	    	
	    	//  CONTENEDOR EDIFICIO
	    	
	    	
	    	var elementV = this.add.dom(-370, 280).createFromCache('centroMandoMenu');
	        elementV.setPerspective(800);
	        
	        var divMando = document.getElementById("divMando");
	        var i = 0;
	        
	        var desc = document.createElement("span");
	        desc.style.position = "absolute";
	        desc.style.left = "10px";
	        desc.style.marginTop = "-240px";
	        desc.style.width = '250px';
	        desc.style.color = '#fff';
	        desc.style.fontSize = '10px';
	        desc.style.fontFamily = 'pantonLight';
	        
	        var desctxt;
    		if(game.global.idioma == 'esp'){
    			desctxt = document.createTextNode("Aquí puedes enviar tus colonos a hacer expediciones");
    			desc.appendChild(desctxt);
        	}else{
        		desctxt = document.createTextNode("Here you can send your settlers to make expeditions");
        		desc.appendChild(desctxt);
        	}
	        
	    	for(let edificio of game.global.edificios.values()){
	    		if (edificio.sprite !== 'centroDeMando' && (edificio.numColonos + edificio.jobs) > 0) {	    		
		    		let divPuestoV = document.createElement("div");
		    		divPuestoV.style.marginTop = "40px";
		    		
		    		/*la imagen*/
		    		let boxV = document.createElement("img");
		        	boxV.src = "assets/interface/Gameplay/Operaciones/CajaColonos.png";
		        	boxV.style.marginLeft ="0px";
		        	boxV.style.marginTop = "0px";
		        	boxV.style.width = '98%';
		        	boxV.style.height = 'auto';
		        	boxV.indice = i;
		        	
		    		let enviar = document.createElement("img");
		    		enviar.src = 'assets/interface/Gameplay/Operaciones/botonExpedicion.png';
		    		enviar.style.position = "absolute";
		    		enviar.style.left = "200px";
		    		enviar.style.marginTop = "5px";
		    		enviar.style.width = '30px';
		    		enviar.style.heigth = 'auto';
		    		enviar.style.cursor = "pointer";
		    		enviar.indice = i;
		    		enviar.edificio = edificio;
		    		
		    		
		    		var number = document.createElement("span");
		    		number.style.position = "absolute";
		    		number.style.left = "70px";
		    		number.style.marginTop = "15px";
		    		number.style.width = '10px';
		    		number.style.color = '#fff';
		    		number.style.fontSize = '10px';
		    		number.indice = i;
		    		number.setAttribute("id", "numColonos" + edificio.id);
		 
		    		/*var name = document.createElement("span");
		    		name.style.position = "absolute";
		    		name.style.left = "50px";
		    		name.style.marginTop = "5px";
		    		name.style.width = '300px';
		    		name.style.fontSize = '10px';
		    		name.style.color = '#fff';
		    		name.indice = i;*/
		    		
		    		var timetxt = document.createElement("span");
		    		timetxt.style.position = "absolute";
		    		timetxt.style.left = "90px";
		    		timetxt.style.marginTop = "15px";
		    		timetxt.style.width = '300px';
		    		timetxt.style.fontSize = '10px';
		    		timetxt.style.color = '#fff';
		    		timetxt.indice = i;
		    		
		    		var hourstxt;
		    		if(game.global.idioma == 'esp'){
		    			hourstxt = document.createTextNode("h faltan");
		    			timetxt.appendChild(hourstxt);
		        	}else{
		        		hourstxt = document.createTextNode("h left");
		        		timetxt.appendChild(hourstxt);
		        	}
		    		
		        	
		    		var num = document.createTextNode("4:36");
		    		number.appendChild(num);
		    		var n;
		        	/*if(game.global.idioma == 'eng'){
		        		n = document.createTextNode(edificio.nameEng);
		        	}else{
		        		n = document.createTextNode(edificio.nameEsp);
		        	}
		        	name.appendChild(n);*/
		        	
		        	enviar.onmouseover = function(){
		        		enviar.src = 'assets/interface/Gameplay/Operaciones/botonExpedicionHover.png';
		        	}
		        	enviar.onmouseout = function(){
		        		enviar.src = 'assets/interface/Gameplay/Operaciones/botonExpedicion.png';
		        	}
		        	enviar.onmousedown = function(){
		        		//Icono se cambia a recolectar con menos alpha
		        		enviar.src = 'assets/interface/Gameplay/Operaciones/botonRecolectar.png';
		        		enviar.style.cursor = 'no-drop';
		        		enviar.style.opacity = '0.5';
		        		//Aqui hacer que se envie el colono a la expedición
		        	}
		        	
		        	
		        	/*el div de los span*/
		        	var contenidoV = document.createElement("div");
		        	contenidoV.style.cssText = "position:relative;color:white;margin-top:-30px;margin-left:15px;";
		        	
		        	divPuestoV.appendChild(desc);
		        	divPuestoV.appendChild(timetxt);
		        	divPuestoV.appendChild(enviar);
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
	    	
	    	
	    	//  CONTENEDOR DETALLES
	    	// Se añade la descripción del edificio
	    	textoDesdeXml = this.cache.xml.get(game.global.idioma).getElementsByTagName('codetalles')[0].childNodes[0].nodeValue;
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
					game.scene.stop('CentroOperacionesMenu');
					setTimeout(function(){ game.global.inMenu = false; }, 500);
	    		}
	    	});
	    	detallesContainer.add(mover);
	    	detallesContainer.add(destruir);
	    	
	    	//  CONTENEDOR MEJORAS
	    	// Se añade el titulo de siguiente mejora
	    	textoDesdeXml = this.cache.xml.get(game.global.idioma).getElementsByTagName('sigMejora')[0].childNodes[0].nodeValue;
	    	this.titulo = this.add.text(300, 180, textoDesdeXml, { fontFamily: '"Roboto Condensed"', color: 'white' , fontSize: '24px', fontWeight: 'bold'}).setOrigin(0.5, 0.5);
	    	this.arrowleft = this.add.image(100, 280, 'arrow').setOrigin(0.5, 0.5).setInteractive().setFlip(true,false);
	    	this.arrowright = this.add.image(450, 280, 'arrow').setOrigin(0.5, 0.5).setInteractive();
	    	game.scene.getScene('CentroOperacionesMenu').arrowleft.visible = false;
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
	    		textoDesdeXml = this.cache.xml.get(game.global.idioma).getElementsByTagName('ccmejoraNivel' + (this.miEdificio.level + 1))[0].childNodes[0].nodeValue;let textoEntrante2 = "Lorem ipsum dolor sit amet consectetur adipiscing elit aptent, augue consequat torquent facilisis morbi elementum varius urna, vitae inceptos ligula libero in aenean nostra. Dapibus diam nibh lectus turpis nec eu nunc sem fringilla hac, donec velit integer tempor litora massa dictum a aptent in potenti, mattis rutrum gravida vitae viverra cursus montes blandit maecenas. Nunc bibendum nullam rutrum volutpat inceptos et rhoncus cum faucibus euismod aptent fames litora, condimentum varius mus laoreet ac a erat hac auctor nisi mi id.";
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
		    	});
		    	
		    	this.arrowleft.on('pointerdown', function(pointer, localX, localY, event){
		    		game.global.effects.pulsarBoton.play();
		    		game.global.effects.pulsarBoton.setVolume(game.global.myPlayer.config.volEffects/100); 
		    		
		    		scene.nivelEdifSprite-=1;
		    		game.scene.getScene('CentroOperacionesMenu').arrowright.visible = true;

		    		edificioSigNivel.setTexture(scene.miEdificio.sprites[scene.nivelEdifSprite]);
		    		if(scene.nivelEdifSprite <= data.miEdificio.level+1){
		    			game.scene.getScene('CentroOperacionesMenu').arrowleft.visible = false;
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
		    		
		    		game.scene.getScene('CentroOperacionesMenu').arrowleft.visible = true;
		    		scene.nivelEdifSprite+=1;
		    		edificioSigNivel.setTexture(scene.miEdificio.sprites[scene.nivelEdifSprite]);
		    		if(scene.nivelEdifSprite == data.miEdificio.levelMax){
		    			game.scene.getScene('CentroOperacionesMenu').arrowright.visible = false;
		    		}
		    		if(scene.nivelEdifSprite-data.miEdificio.level > 1){
		    			//edificioSigNivel.setFrame(6);
		    		}
		    	});
		    	
		    	
	
				
				mejorasContainer.add(this.subirNivel);
				mejorasContainer.add(this.nivelSuperior);
	    	}
	    	else{
	    		textoDesdeXml = this.cache.xml.get(game.global.idioma).getElementsByTagName('comejoraNivel' + (this.miEdificio.level + 1))[0].childNodes[0].nodeValue;
	    		this.descSigNivel = this.add.text(300, 210, textoDesdeXml, { fontFamily: '"Roboto Condensed"', color: 'white' , fontSize: '24px', fontWeight: 'bold'}).setOrigin(0.5, 0.5);
	        	mejorasContainer.add(this.descSigNivel);
	        	game.scene.getScene('CentroOperacionesMenu').arrowright.visible = false;
	    	}
	    	
	    	// Desactivamos al inicio los otros dos contenedores
			detallesContainer.visible= false;
			mejorasContainer.visible= false;
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
    }

}