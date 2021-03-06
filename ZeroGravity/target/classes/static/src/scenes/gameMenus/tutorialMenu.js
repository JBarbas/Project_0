class TutorialScene extends Phaser.Scene {

	constructor() {
        super({
            key: "TutorialScene",
        });
    }

    init(data) {
    	if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **TUTORIAL** menu");
		}
    }
    
    preload () {
    	
    }
    create (data)  {
    	
    	game.global.inStrictMenu = true;
    	
    	var scene = this;
    	
    	var cont = 0;
    	this.mode = "tutorial";
    	game.global.inMenu = true;
    	
    	var textoDesdeXml,textoDesdeXmlTut, textoTut;
    	
    	var cdm=false,ca=false,cdo=false,cdc=false;
    	
    	
		textoDesdeXml = this.cache.xml.get(game.global.idioma).getElementsByTagName('omitir')[0].childNodes[0].nodeValue;
		var omitirTut = this.add.text(1400, 845, textoDesdeXml, { fontFamily: '"pantonBlack"', color: 'white' , fontSize: '25px', fontWeight: 'bold'}).setInteractive();
		
		
		textoDesdeXml = this.cache.xml.get(game.global.idioma).getElementsByTagName('siguiente')[0].childNodes[0].nodeValue;
		var sigTut = this.add.text(1350, 1000, textoDesdeXml, { fontFamily: '"pantonBlack"', color: 'white' , fontSize: '25px', fontWeight: 'bold'}).setInteractive();
		
		/*textoDesdeXml = this.cache.xml.get(game.global.idioma).getElementsByTagName('anterior')[0].childNodes[0].nodeValue;
		var antTut = this.add.text(1130, 1000, textoDesdeXml, { fontFamily: '"pantonBlack"', color: 'white' , fontSize: '25px', fontWeight: 'bold'}).setInteractive();
		*/
    	
    	if(!game.global.tutorial.intro){
    		askTutorialIntro('intro');
    		leerTutorial(this,game.global.idTuto);
    		
    	}/*else if(game.scene.isActive('CentroMandoMenu') && !game.global.tutorial.cdm){
    		game.global.idTuto = 3;
    		game.scene.stop('CentroMandoMenu');
    		askTutorialIntro('cdm');
    		cdm = true;
    		
    	}else if(game.scene.isActive('CentroAdministrativoMenu') && !game.global.tutorial.ca){
    		game.scene.stop('CentroAdministrativoMenu');
    		askTutorialIntro('ca');
    		ca = true;
    		
    	}else if(game.scene.isActive('CentroComercioMenu') && !game.global.tutorial.cdc){
    		game.scene.stop('CentroComercioMenu');
    		askTutorialIntro('cdc');
    		cdc = true;
    		
    		
    	}else if(game.scene.isActive('CentroOperacionesMenu') && !game.global.tutorial.cdo){
    		game.scene.stop('CentroOperacionesMenu');
    		askTutorialIntro('co');
    		co = true;
    	}*/
    
    	
    	var colorBlue = '#0CB7F2';
    	var colorWhite = '#fff';
    	
    	omitirTut.on('pointerout', function(pointer, localX, localY, event){
    		omitirTut.setFill(colorBlue);
	 	})
	
	 	omitirTut.on('pointerout',function(pointer, localX, localY, event){
	 		omitirTut.setFill(colorWhite);
	 	})
	 	
    	omitirTut.on('pointerdown', function(pointer){
    		game.global.effects.pulsarBoton.play();
    		game.global.effects.pulsarBoton.setVolume(game.global.myPlayer.config.volEffects/100); 
    		game.scene.getScene('GameInterface').panel.alpha = 1.0;
    		//stop scene
    		game.global.inMenu = false;
    		game.global.inStrictMenu = false;
    		game.scene.stop('TutorialScene');
    	})
    	
    	//Anterior
    	/*antTut.on('pointerout', function(pointer, localX, localY, event){
    		antTut.setFill(colorBlue);
	 	})
	
	 	antTut.on('pointerout',function(pointer, localX, localY, event){
	 		antTut.setFill(colorWhite);
	 	})
	 	
    	antTut.on('pointerdown', function(pointer){
    		game.global.effects.pulsarBoton.play();
    		game.global.effects.pulsarBoton.setVolume(game.global.myPlayer.config.volEffects/100); 
    		game.scene.getScene('GameInterface').panel.alpha = 1.0;

    		cont--;
    		if(cont == 0){
    			textoDesdeXmlTut = scene.cache.xml.get(game.global.idioma + "Tut").getElementsByTagName('tut')[0].childNodes[0].nodeValue;
    			textoTut.text = textoDesdeXmlTut;
    			
    		}else{
    			textoDesdeXmlTut = scene.cache.xml.get(game.global.idioma + "Tut").getElementsByTagName('tut' + cont)[0].childNodes[0].nodeValue;
    			textoTut.text = textoDesdeXmlTut;
    		}
    	})*/
    	
    	//Siguiente
    	sigTut.on('pointerout', function(pointer, localX, localY, event){
    		sigTut.setFill(colorBlue);
	 	})
	
	 	sigTut.on('pointerout',function(pointer, localX, localY, event){
	 		sigTut.setFill(colorWhite);
	 	})
	 	
    	sigTut.on('pointerdown', function(pointer){
    		game.global.effects.pulsarBoton.play();
    		game.global.effects.pulsarBoton.setVolume(game.global.myPlayer.config.volEffects/100); 
    		game.scene.getScene('GameInterface').panel.alpha = 1.0;
    		if(game.global.idTuto === '-1'){
    			game.scene.getScene('GameInterface').panel.alpha = 1.0;
        		//stop scene
        		game.global.inMenu = false;
        		game.global.inStrictMenu = false;
        		game.scene.stop('TutorialScene');
        		
    		}
    		game.global.cortina.destroy();
    		game.global.textoTut.destroy();
    		game.global.imgChar.destroy();
    		game.global.containerTut.destroy();
    		leerTutorial(scene,game.global.idTuto);
    		
    	})
    	
    }
    update(time, delta) {
    	
    }

}