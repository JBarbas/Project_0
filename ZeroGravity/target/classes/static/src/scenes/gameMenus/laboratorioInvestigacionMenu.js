class LaboratorioInvestigacionMenu extends Phaser.Scene {

	constructor() {
        super({
            key: 'LaboratorioInvestigacionMenu',
        });
    }

    init(data) {
    	if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **LABORATORIO_INVESTIGACION** menu");
		}
    	let msg = new Object();
		msg.event = 'GET LABORATORIO INVESTIGACION MENU';
		msg.id = data.miEdificio.id;
		game.global.socket.send(JSON.stringify(msg));
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

    	game.scene.getScene('GameInterface').panel.setTexture('panelLInvestigacion');
    	
    	
    	if(game.global.idioma == 'eng'){
    		game.scene.getScene('GameInterface').panel.setTexture('laboratory');
    	}else{
    		game.scene.getScene('GameInterface').panel.setTexture('panelLInvestigacion');
    	}
		
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
			// Añadimos el numero de colonos trabajando en este edificio
			this.colonos = this.add.text(100, 200, "Cargando...", { fontFamily: '"Roboto Condensed"', color: 'white' });
			edificiosContainer.add(this.colonos);
			// Añadimos la energía necesaria y suministrada en este edificio
			this.energia = this.add.text(100, 230, "Cargando...", { fontFamily: '"Roboto Condensed"', color: 'white' });
			edificiosContainer.add(this.energia);
			// Añadimos el tiempo restante para producir
			this.timeLeft = 'Quedan ' + Math.floor(this.miEdificio.recursos[this.miEdificio.level-1][1] - (Date.now() - this.miEdificio.inicioProduccion)/60000) + ' minutos';
			this.timeLeftText = this.add.text(100, 260, this.timeLeft, { fontFamily: '"Roboto Condensed"', color: 'white' });
			edificiosContainer.add(this.timeLeftText);
			
			//  CONTENEDOR DETALLES
			// Se añade la descripción del edificio
			textoDesdeXml = this.cache.xml.get(game.global.idioma).getElementsByTagName('labdetalles')[0].childNodes[0].nodeValue;
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
					game.scene.stop('LaboratorioInvestigacionMenu');
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
				textoDesdeXml = this.cache.xml.get(game.global.idioma).getElementsByTagName('labmejoraNivel' + (this.miEdificio.level + 1))[0].childNodes[0].nodeValue;let textoEntrante2 = "Lorem ipsum dolor sit amet consectetur adipiscing elit aptent, augue consequat torquent facilisis morbi elementum varius urna, vitae inceptos ligula libero in aenean nostra. Dapibus diam nibh lectus turpis nec eu nunc sem fringilla hac, donec velit integer tempor litora massa dictum a aptent in potenti, mattis rutrum gravida vitae viverra cursus montes blandit maecenas. Nunc bibendum nullam rutrum volutpat inceptos et rhoncus cum faucibus euismod aptent fames litora, condimentum varius mus laoreet ac a erat hac auctor nisi mi id.";
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
    		game.global.effects.pulsarBoton.play();
    		game.global.effects.pulsarBoton.setVolume(game.global.myPlayer.config.volEffects/100); 
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
        	
        	if (this.miEdificio.produciendo) {
    	    	this.timeLeft = Math.floor(this.miEdificio.recursos[this.miEdificio.levelProduciendo-1][1] - (Date.now() - this.miEdificio.inicioProduccion)/60000);
    	    	if (this.miEdificio.lleno) {
    	    		this.timeLeftText.text = this.miEdificio.recursos[this.miEdificio.levelProduciendo-1][0] + this.cache.xml.get(game.global.idioma).getElementsByTagName('recoCred')[0].childNodes[0].nodeValue;
    	    	}
    	    	else if (this.timeLeft < 1) {
    	    		this.timeLeftText.text = this.cache.xml.get(game.global.idioma).getElementsByTagName('almCred')[0].childNodes[0].nodeValue;
    	    	}
    	    	else {
    	    		this.timeLeftText.text = this.cache.xml.get(game.global.idioma).getElementsByTagName('tiemporestante')[0].childNodes[0].nodeValue + this.timeLeft + this.cache.xml.get(game.global.idioma).getElementsByTagName('tiempominutos')[0].childNodes[0].nodeValue;
    	    	}
    	    	this.timeLeftText.visible = !this.miEdificio.lleno;
        	}
	    	else {
	    		this.timeLeftText.visible = false;
	    	}
    	}
    }

}