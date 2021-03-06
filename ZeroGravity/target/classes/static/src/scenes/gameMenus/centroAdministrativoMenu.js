class CentroAdministrativoMenu extends Phaser.Scene {

	constructor() {
        super({
            key: "CentroAdministrativoMenu",
        });
    }

    init(data) {
    	if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **CENTRO ADMINISTRATIVO** menu");
		}
    }
    
    preload () {
    	/*let msg = new Object();
		msg.event = 'GET JOBS';
		game.global.socket.send(JSON.stringify(msg));*/
    }
    create (data)  {
    	let msg = new Object();
		msg.event = 'GET CENTRO ADMINISTRATIVO MENU';
		game.global.socket.send(JSON.stringify(msg));
		
		var scene = this;
		
		this.price = 0;
    	
    	game.global.effects.seleccionarEdificio.play();
		game.global.effects.seleccionarEdificio.setVolume(game.global.myPlayer.config.volEffects/100); 
    	//
    	this.miEdificio = data.miEdificio;
    	
    	
    	
    	// Aquí se guardan y usan los datos leidos desde xml multiidioma
    	var textoDesdeXml;

    	if(game.global.idioma == 'eng'){
    		game.scene.getScene('GameInterface').panel.setTexture('administrationCenter');
    	}else{
    		game.scene.getScene('GameInterface').panel.setTexture('panelCAdministrativo');
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
	    	
	
	    	//	CONTENEDOR EDIFICIO
	    	// Añadimos los puestos de trabajo disponibles
	    	
	    	
	    	//IMAGENES
	    	var contAdmin1 = this.add.image(44, 180, 'contAdmin').setOrigin(0, 0);
	    	var contAdmin2 = this.add.image(44, 300, 'contAdmin').setOrigin(0, 0);
	    	var contAdmin3 = this.add.image(44, 420, 'contAdmin').setOrigin(0, 0);
	    	var ficon = this.add.image(42, 180, 'fIcon').setOrigin(0, 0);
	    	var addicon = this.add.image(44, 300, 'addFIcon').setOrigin(0, 0);
	    	var rankicon = this.add.image(44, 415, 'rankFIcon').setOrigin(0, 0);
	    	ficon.scale = 0.3;
	    	addicon.scale = 0.3;
	    	rankicon.scale = 0.3;
	    	var btnVerAmigos = this.add.image(130, 180, 'btnAdministracion').setOrigin(0, 0).setInteractive();
	    	btnVerAmigos.on('pointerover',function(pointer){
	    		btnVerAmigos.setFrame(1);
	    	});
	    	btnVerAmigos.on('pointerout',function(pointer){
	    		btnVerAmigos.setFrame(0);
	    	});
	    	
	    	var btnAddAmigos = this.add.image(130, 300, 'btnAdministracion').setOrigin(0, 0).setInteractive();
	    	btnAddAmigos.on('pointerover',function(pointer){
	    		btnAddAmigos.setFrame(1);
	    	});
	    	btnAddAmigos.on('pointerout',function(pointer){
	    		btnAddAmigos.setFrame(0);
	    	});
	    	
	    	var btnRankingAmigos = this.add.image(130, 420, 'btnAdministracion').setOrigin(0, 0).setInteractive();
	    	btnRankingAmigos.on('pointerover',function(pointer){
	    		btnRankingAmigos.setFrame(1);
	    	});
	    	
	    	btnRankingAmigos.on('pointerout',function(pointer){
	    		btnRankingAmigos.setFrame(0);
	    	});
	    	
	    	btnRankingAmigos.on('pointerdown', function(pointer, localX, localY, event){
	    		game.global.effects.pulsarBoton.play();
	    		game.global.effects.pulsarBoton.setVolume(game.global.myPlayer.config.volEffects/100);
	    		game.scene.stop('CentroAdministrativoMenu');
	    		//start scene
	    		game.global.inMenu = true;
				if (game.global.menu !== null) {
					game.scene.stop(game.global.menu);
				}
				game.global.menu = 'RankingMenu';
				game.global.ranking = 'amigos';
				
				game.scene.run('RankingMenu');			
	    	});
	    	
	    	btnAddAmigos.on('pointerdown', function(pointer, localX, localY, event){
	    		game.global.effects.pulsarBoton.play();
	    		game.global.effects.pulsarBoton.setVolume(game.global.myPlayer.config.volEffects/100); 
	    		game.scene.stop('CentroAdministrativoMenu');
	    		game.global.inMenu = true;
				if (game.global.menu !== null) {
					game.scene.stop(game.global.menu);
				}
				game.global.menu = 'FriendsScene';
				game.scene.run('FriendsScene');		
	    	});
	    	
	    	btnVerAmigos.on('pointerdown', function(pointer, localX, localY, event){
	    		game.global.effects.pulsarBoton.play();
	    		game.global.effects.pulsarBoton.setVolume(game.global.myPlayer.config.volEffects/100); 
	    		game.scene.stop('CentroAdministrativoMenu');
	    		game.global.inMenu = true;
				if (game.global.menu !== null) {
					game.scene.stop(game.global.menu);
				}
				game.global.menu = 'FriendsScene';
				game.scene.run('FriendsScene');		
	    	});
	    	
	    	
	    	
	    	
	    	edificiosContainer.add(contAdmin1);
	    	edificiosContainer.add(contAdmin2);
	    	edificiosContainer.add(contAdmin3);
	    	edificiosContainer.add(addicon);
	    	edificiosContainer.add(ficon);
	    	edificiosContainer.add(rankicon);
	    	edificiosContainer.add(btnVerAmigos);
	    	edificiosContainer.add(btnAddAmigos);
	    	edificiosContainer.add(btnRankingAmigos);
	    	
	    	
	    	textoDesdeXml = this.cache.xml.get(game.global.idioma).getElementsByTagName('caveramigos')[0].childNodes[0].nodeValue;
			this.veramigostxt = this.add.text(150, 200, textoDesdeXml, { fontFamily: '"pantonBlack"', color: 'white' , fontSize: '40px', fontWeight: 'bold'});
			edificiosContainer.add(this.veramigostxt);
			
			textoDesdeXml = this.cache.xml.get(game.global.idioma).getElementsByTagName('caaddamigos')[0].childNodes[0].nodeValue;
			this.addamigostxt = this.add.text(150, 320, textoDesdeXml, { fontFamily: '"pantonBlack"', color: 'white' , fontSize: '40px', fontWeight: 'bold'});
			edificiosContainer.add(this.addamigostxt);
			
			textoDesdeXml = this.cache.xml.get(game.global.idioma).getElementsByTagName('carankamigos')[0].childNodes[0].nodeValue;
			this.rankamigostxt = this.add.text(150, 440, textoDesdeXml, { fontFamily: '"pantonBlack"', color: 'white' , fontSize: '40px', fontWeight: 'bold'});
			edificiosContainer.add(this.rankamigostxt);
	    	
	    	
	    	/*this.puestosTrabajo = this.add.text(100, 200, "Cargando...", { fontFamily: '"Roboto Condensed"', color: 'white' });
	    	this.viviendas = this.add.text(100, 230, "Cargando...", { fontFamily: '"Roboto Condensed"', color: 'white' });
	    	edificiosContainer.add(this.puestosTrabajo);
	    	edificiosContainer.add(this.viviendas);
	    	
	    	var expandir = this.add.image(170, 700, 'btnExpandir').setInteractive();
	    	expandir.on('pointerover',function(pointer){
	    		expandir.setFrame(1);
	    	});
	    	expandir.on('pointerout',function(pointer){
	    		expandir.setFrame(0);
	    	});
	    	expandir.on('pointerdown', function(pointer, localX, localY, event){
	    		game.global.effects.pulsarBoton.play();
	    		game.global.effects.pulsarBoton.setVolume(game.global.myPlayer.config.volEffects/100); 
	    		if(!game.global.expandiendo){
	    			game.global.expandiendo = true;
	    			game.scene.stop('CentroAdministrativoMenu');
	    			setTimeout(function(){ game.global.inMenu = false; }, 500);
	    		}
	    	});
	    	edificiosContainer.add(expandir);
	    	// Añadimos el boton de solicitar colonos
	    	this.colonos = this.add.image(170, 600, 'btnColonos').setInteractive();
	    	this.colonos.alpha = 0.5;
	    	this.colonos.canRequest = false;
	    	this.colonos.on('pointerover',function(pointer){
	    		if (this.canRequest) {
	    			this.setFrame(1);
	    		}
	    	});
	    	this.colonos.on('pointerout',function(pointer){
	    		this.setFrame(0);
	    	});
	    	this.colonos.on('pointerdown', function(pointer, localX, localY, event){
	    		game.global.effects.pulsarBoton.play();
	    		game.global.effects.pulsarBoton.setVolume(game.global.myPlayer.config.volEffects/100); 
	    		if (this.canRequest) {
		    		let msg = new Object();
		    		msg.event = 'PEDIR COLONOS';
		    		game.global.socket.send(JSON.stringify(msg));
	    		}
	    	});
	    	edificiosContainer.add(this.colonos);*/
	    	
	    	
	
	    	//	CONTENEDOR DETALLES
	    	// Se añade la descripción del edificio
	    	textoDesdeXml = this.cache.xml.get(game.global.idioma).getElementsByTagName('cadetalles')[0].childNodes[0].nodeValue;
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
	    		if(!game.global.construyendo){
					game.scene.pause();
					data.miEdificio.move();
					game.scene.stop('CentroAdministrativoMenu');
					setTimeout(function(){ game.global.inMenu = false; }, 500);
	    		}
	    	});
	    	detallesContainer.add(mover);
	    	detallesContainer.add(destruir);
	    	
	    	//    	CONTENEDOR MEJORAS
	    	// Se añade el titulo de siguiente mejora
	    	textoDesdeXml = this.cache.xml.get(game.global.idioma).getElementsByTagName('sigMejora')[0].childNodes[0].nodeValue;
	    	this.titulo = this.add.text(300, 180, textoDesdeXml, { fontFamily: '"Roboto Condensed"', color: 'white' , fontSize: '24px', fontWeight: 'bold'}).setOrigin(0.5, 0.5);
	    	this.arrowleft = this.add.image(100, 280, 'arrow').setOrigin(0.5, 0.5).setInteractive().setFlip(true,false);
	    	this.arrowright = this.add.image(450, 280, 'arrow').setOrigin(0.5, 0.5).setInteractive();
	    	game.scene.getScene('CentroAdministrativoMenu').arrowleft.visible = false;
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
	        	textoDesdeXml = this.cache.xml.get(game.global.idioma).getElementsByTagName('camejoraNivel' + (this.miEdificio.level + 1))[0].childNodes[0].nodeValue;let textoEntrante2 = "Lorem ipsum dolor sit amet consectetur adipiscing elit aptent, augue consequat torquent facilisis morbi elementum varius urna, vitae inceptos ligula libero in aenean nostra. Dapibus diam nibh lectus turpis nec eu nunc sem fringilla hac, donec velit integer tempor litora massa dictum a aptent in potenti, mattis rutrum gravida vitae viverra cursus montes blandit maecenas. Nunc bibendum nullam rutrum volutpat inceptos et rhoncus cum faucibus euismod aptent fames litora, condimentum varius mus laoreet ac a erat hac auctor nisi mi id.";
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
		    		game.scene.getScene('CentroAdministrativoMenu').arrowright.visible = true;

		    		edificioSigNivel.setTexture(scene.miEdificio.sprites[scene.nivelEdifSprite]);
		    		if(scene.nivelEdifSprite <= data.miEdificio.level+1){
		    			game.scene.getScene('CentroAdministrativoMenu').arrowleft.visible = false;
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
		    		
		    		game.scene.getScene('CentroAdministrativoMenu').arrowleft.visible = true;
		    		scene.nivelEdifSprite+=1;
		    		edificioSigNivel.setTexture(scene.miEdificio.sprites[scene.nivelEdifSprite]);
		    		if(scene.nivelEdifSprite == data.miEdificio.levelMax){
		    			game.scene.getScene('CentroAdministrativoMenu').arrowright.visible = false;
		    		}
		    		if(scene.nivelEdifSprite-data.miEdificio.level > 1){
		    			//edificioSigNivel.setFrame(6);
		    		}
		    	});
		    	
				mejorasContainer.add(this.subirNivel);
				mejorasContainer.add(this.nivelSuperior);
	    	}
	    	else{
	    		textoDesdeXml = this.cache.xml.get(game.global.idioma).getElementsByTagName('camejoraNivel' + (this.miEdificio.level + 1))[0].childNodes[0].nodeValue;
	    		this.descSigNivel = this.add.text(300, 210, textoDesdeXml, { fontFamily: '"Roboto Condensed"', color: 'white' , fontSize: '24px', fontWeight: 'bold'}).setOrigin(0.5, 0.5);
	        	mejorasContainer.add(this.descSigNivel);
	        	game.scene.getScene('CentroAdministrativoMenu').arrowright.visible = false;
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
    	/*si nuestro edificio tiene todavia opcion de seguir subiendo de nivel...*/
    	if(this.miEdificio.level >= 3 && this.subirNivel !== null && typeof this.subirNivel !== "undefined"){
    		this.subirNivel.destroy();
    	}
    }
}