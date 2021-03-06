class PlataformaExtraccionMenu extends Phaser.Scene {

	constructor() {
        super({
            key: "PlataformaExtraccionMenu",
        });
    }

    init(data) {
    	if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **Plataforma de Extraccion** menu");
		}
    	
    	if (!data.miEdificio.enConstruccion) {
	    	let msg = new Object();
			msg.event = 'GET PLATAFORMA EXTRACCION MENU';
			msg.id = data.miEdificio.id;
			game.global.socket.send(JSON.stringify(msg));
    	}
    }
    
    preload () {
    	
    }
    create (data)  {
    	
    	var scene = this;
    	this.price = 0;
    	
    	game.global.effects.seleccionarEdificio.play();
		game.global.effects.seleccionarEdificio.setVolume(game.global.myPlayer.config.volEffects/100);
    	
    	//
    	this.miEdificio = data.miEdificio;
    	
    	// Aquí se guardan y usan los datos leidos desde xml multiidioma
    	var textoDesdeXml;

    	if(game.global.idioma == 'eng'){
    		game.scene.getScene('GameInterface').panel.setTexture('extractionPlatform');
    	}else{
    		game.scene.getScene('GameInterface').panel.setTexture('panelCExtraccion');
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
			this.edificiosContainer = this.add.container(game.global.buildingMenu.x, game.global.buildingMenu.y);
			
			//Se añade a cada contenedor su imagen de fondo			
			if(game.global.idioma == "eng"){
				this.intUpdates = this.add.image(0, 0, 'intUpdates').setOrigin(0, 0); 
				this.intBuildings = this.add.image(0, 0, 'intBuildings').setOrigin(0, 0); 
				this.intDetails = this.add.image(0, 0, 'intDetails').setOrigin(0, 0);
				mejorasContainer.add(this.intUpdates);
				detallesContainer.add(this.intDetails);
				this.edificiosContainer.add(this.intBuildings);
			}else{
				this.intMejoras = this.add.image(0, 0, 'intMejoras').setOrigin(0, 0); 
				this.intDetalles = this.add.image(0, 0, 'intDetalles').setOrigin(0, 0); 
				this.intEdificios = this.add.image(0, 0, 'intEdificios').setOrigin(0, 0);
				mejorasContainer.add(this.intMejoras);
				detallesContainer.add(this.intDetalles);
				this.edificiosContainer.add(this.intEdificios);
			}
			
			//Se alterna entre contenedores según el icono seleccionado
			this.iconoDetalles = this.add.image(game.global.buildingMenu.x + 170, game.global.buildingMenu.y + 10, 'iconoDetalles').setOrigin(0, 0);
			this.iconoDetalles.setInteractive().on('pointerdown', function(pointer, localX, localY, event) { 
				game.global.effects.pulsarBoton.play();
				game.global.effects.pulsarBoton.setVolume(game.global.myPlayer.config.volEffects/100);
		    	
				detallesContainer.visible= true;
				mejorasContainer.visible= false;
				scene.edificiosContainer.visible= false;
			});
			this.iconoMejoras = this.add.image(game.global.buildingMenu.x + 100, game.global.buildingMenu.y + 10, 'iconoMejoras').setOrigin(0, 0);
			this.iconoMejoras.setInteractive().on('pointerdown', function(pointer, localX, localY, event) {
				game.global.effects.pulsarBoton.play();
				game.global.effects.pulsarBoton.setVolume(game.global.myPlayer.config.volEffects/100);
				detallesContainer.visible= false;
				mejorasContainer.visible= true;
				scene.edificiosContainer.visible= false;
			});
			this.iconoEdificio = this.add.image(game.global.buildingMenu.x + 25, game.global.buildingMenu.y + 10, 'iconoEdificio').setOrigin(0, 0);
			this.iconoEdificio.setInteractive().on('pointerdown', function(pointer, localX, localY, event) {
				game.global.effects.pulsarBoton.play();
				game.global.effects.pulsarBoton.setVolume(game.global.myPlayer.config.volEffects/100);
				detallesContainer.visible= false;
				mejorasContainer.visible= false;
				scene.edificiosContainer.visible= true;
			});
			
			//  CONTENEDOR EDIFICIO
			// Añadimos el numero de colonos trabajando en este edificio
			this.colonos = this.add.text(100, 200, "Cargando...", { fontFamily: '"pantonBlack"', color: 'white',fontSize: '30px', fontWeight: 'bold' });
			scene.edificiosContainer.add(this.colonos);
			// Añadimos la energía necesaria y suministrada en este edificio
			this.energia = this.add.text(100, 250, "Cargando...", { fontFamily: '"pantonBlack"', color: 'white',fontSize: '30px', fontWeight: 'bold' });
			scene.edificiosContainer.add(this.energia);
			// Añadimos la cerámica almacenada
			this.stock = this.add.text(100, 300, "Stock: cargando", { fontFamily: '"pantonBlack"', color: 'white',fontSize: '20px' });
			scene.edificiosContainer.add(this.stock);
			
			//  CONTENEDOR DETALLES
			// Se añade la descripción del edificio
			textoDesdeXml = this.cache.xml.get(game.global.idioma).getElementsByTagName('pedetalles')[0].childNodes[0].nodeValue;
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
					game.scene.stop('PlataformaExtraccionMenu');
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
	    	game.scene.getScene('PlataformaExtraccionMenu').arrowleft.visible = false;
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
				var edificioSigNivel = this.add.image(300, 280, this.miEdificio.sprites[this.miEdificio.level]).setOrigin(0.5, 0.5).setScale(0.8, 0.8);
				mejorasContainer.add(edificioSigNivel);
				this.nivelEdifSprite = this.miEdificio.level+1;
				
				// Se añade la descripción del siguiente nivel
				textoDesdeXml = this.cache.xml.get(game.global.idioma).getElementsByTagName('pemejoraNivel' + (this.miEdificio.level + 1))[0].childNodes[0].nodeValue;let textoEntrante2 = "Lorem ipsum dolor sit amet consectetur adipiscing elit aptent, augue consequat torquent facilisis morbi elementum varius urna, vitae inceptos ligula libero in aenean nostra. Dapibus diam nibh lectus turpis nec eu nunc sem fringilla hac, donec velit integer tempor litora massa dictum a aptent in potenti, mattis rutrum gravida vitae viverra cursus montes blandit maecenas. Nunc bibendum nullam rutrum volutpat inceptos et rhoncus cum faucibus euismod aptent fames litora, condimentum varius mus laoreet ac a erat hac auctor nisi mi id.";
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
		    		game.scene.getScene('PlataformaExtraccionMenu').arrowright.visible = true;

		    		edificioSigNivel.setTexture(scene.miEdificio.sprites[scene.nivelEdifSprite]);
		    		if(scene.nivelEdifSprite <= data.miEdificio.level+1){
		    			game.scene.getScene('PlataformaExtraccionMenu').arrowleft.visible = false;
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
		    		
		    		game.scene.getScene('PlataformaExtraccionMenu').arrowleft.visible = true;
		    		scene.nivelEdifSprite+=1;
		    		edificioSigNivel.setTexture(scene.miEdificio.sprites[scene.nivelEdifSprite]);
		    		if(scene.nivelEdifSprite == data.miEdificio.levelMax){
		    			game.scene.getScene('PlataformaExtraccionMenu').arrowright.visible = false;
		    		}
		    		if(scene.nivelEdifSprite-data.miEdificio.level > 1){
		    			//edificioSigNivel.setTexture(scene.miEdificio.sprites[scene.nivelEdifSprite]);
		    		}
		    	});
		    	
				mejorasContainer.add(this.subirNivel);
				mejorasContainer.add(this.nivelSuperior);
	    		
			}
			else{
				this.descSigNivel = this.add.text(300, 210, "N/A", { fontFamily: '"Roboto Condensed"', color: 'white' , fontSize: '24px', fontWeight: 'bold'}).setOrigin(0.5, 0.5);
				mejorasContainer.add(this.descSigNivel);
				game.scene.getScene('PlataformaExtraccionMenu').arrowright.visible = false;
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
    	/*if (!this.miEdificio.enConstruccion) {	
	    	if (this.miEdificio.produciendo) {
	    		this.timeLeft = Math.floor(this.miEdificio.recursos[this.miEdificio.level-1][1] - (Date.now() - this.miEdificio.inicioProduccion)/60000);
		    	if (this.miEdificio.lleno) {
		    		this.timeLeftText.text = this.miEdificio.recursos[this.miEdificio.level-1][0] + this.cache.xml.get(game.global.idioma).getElementsByTagName('recoCera')[0].childNodes[0].nodeValue;
		    	}
		    	else if (this.timeLeft < 1) {
		    		this.timeLeftText.text = this.cache.xml.get(game.global.idioma).getElementsByTagName('almCera')[0].childNodes[0].nodeValue;
		    	}
		    	else {
		    		this.timeLeftText.text = this.cache.xml.get(game.global.idioma).getElementsByTagName('tiemporestante')[0].childNodes[0].nodeValue + this.timeLeft + this.cache.xml.get(game.global.idioma).getElementsByTagName('tiempominutos')[0].childNodes[0].nodeValue;
		    	}
		    	this.timeLeftText.visible = !this.miEdificio.lleno;
	    	}
	    	else {
	    		this.timeLeftText.visible = false;
	    	}
	    	
    	}*/
    } 
}