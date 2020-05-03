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
    	
    	var scene = this;
    	
    	var cont = 0;
    	this.mode = "tutorial";
    	game.global.inMenu = true;
    	
    	var textoDesdeXml,textoDesdeXmlTut, textoTut;
    	this.cortina = this.add.image(0, 0, 'cortina').setOrigin(0, 0);
    	
    	var container = this.add.image(560, 840, 'contTextTut').setOrigin(0, 0);
    	var binette = this.add.image(1460, 380, 'binette').setOrigin(0, 0);
    	var celso = this.add.image(1460, 380, 'celso').setOrigin(0, 0);
    	var jakob = this.add.image(1460, 380, 'jakob').setOrigin(0, 0);
    	var priya = this.add.image(1460, 380, 'priya').setOrigin(0, 0);
    	
    	binette.setVisible(false);
    	jakob.setVisible(false);
    	priya.setVisible(false);
    	
    	var cort = this.cortina;
    

		textoDesdeXmlTut = this.cache.xml.get(game.global.idioma + "Tut").getElementsByTagName('tut')[0].childNodes[0].nodeValue;
		textoTut = this.add.text(600, 905, textoDesdeXmlTut, { fontFamily: '"pantonLight"', color: 'white' , fontSize: '20px', fontWeight: 'bold'});
		
		
		textoDesdeXml = this.cache.xml.get(game.global.idioma).getElementsByTagName('omitir')[0].childNodes[0].nodeValue;
		var omitirTut = this.add.text(1400, 845, textoDesdeXml, { fontFamily: '"pantonBlack"', color: 'white' , fontSize: '25px', fontWeight: 'bold'}).setInteractive();
		
		
		textoDesdeXml = this.cache.xml.get(game.global.idioma).getElementsByTagName('siguiente')[0].childNodes[0].nodeValue;
		var sigTut = this.add.text(1350, 1000, textoDesdeXml, { fontFamily: '"pantonBlack"', color: 'white' , fontSize: '25px', fontWeight: 'bold'}).setInteractive();
		
		textoDesdeXml = this.cache.xml.get(game.global.idioma).getElementsByTagName('anterior')[0].childNodes[0].nodeValue;
		var antTut = this.add.text(1130, 1000, textoDesdeXml, { fontFamily: '"pantonBlack"', color: 'white' , fontSize: '25px', fontWeight: 'bold'}).setInteractive();
		
    	cort.alpha = 0.4;
    	container.scale = 0.8;
    	
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
    		game.scene.stop('TutorialScene');
    	})
    	
    	//Anterior
    	antTut.on('pointerout', function(pointer, localX, localY, event){
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
    	})
    	
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
    		
    		cont++;
    		textoDesdeXmlTut = scene.cache.xml.get(game.global.idioma + "Tut").getElementsByTagName('tut' + cont)[0].childNodes[0].nodeValue;
    		textoTut.text = textoDesdeXmlTut;
    		
    		
    	})
    	
    }
    update(time, delta) {
    		
    }

}