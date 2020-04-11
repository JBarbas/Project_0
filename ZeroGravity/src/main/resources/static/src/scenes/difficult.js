class DifficultScene extends Phaser.Scene {
	
	constructor() {
		super({
			key: "DifficultScene",
		});
	}
	
	init(data){
		if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **CHOOSE DIFFICULTY** scene");
		}
	}
	
	preload () {
		
    }
    create (data)  {
    	
    	
    	var background = this.add.image(960, 540, 'backgroundDifficulty');
    	var backgroundEng = this.add.image(960, 540, 'backgroundDifficultyEng');
    	
    	var button = this.add.image(150, 100, 'back').setInteractive();
    	var buttonEng = this.add.image(150, 100, 'backEng').setInteractive();
    	
    	var element = this.add.dom(400, 600).createFromCache('difficultform');

        element.setPerspective(800);
        

    	if(game.global.idioma === "eng"){
    		background.setVisible(false);
    		button.setVisible(false);
    	}else{
    		backgroundEng.setVisible(false);
    		buttonEng.setVisible(false);
    	}
        
        var boxe = element.node.children[1];
        boxe.children[0].children[0].children[0].children[0].children[1].innerHTML = game.cache.xml.get(game.global.idioma).getElementsByTagName('prin')[0].childNodes[0].nodeValue;
        boxe.children[0].children[0].children[1].children[0].children[0].innerHTML = game.cache.xml.get(game.global.idioma).getElementsByTagName('prinDesc')[0].childNodes[0].nodeValue;
    	
        var boxe = element.node.children[1];
        boxe.children[0].children[1].children[0].children[0].children[1].innerHTML = game.cache.xml.get(game.global.idioma).getElementsByTagName('vet')[0].childNodes[0].nodeValue;
        boxe.children[0].children[1].children[1].children[0].children[0].innerHTML = game.cache.xml.get(game.global.idioma).getElementsByTagName('vetDesc')[0].childNodes[0].nodeValue;
    	
        var boxe = element.node.children[1];
        boxe.children[0].children[2].children[0].children[0].children[1].innerHTML = game.cache.xml.get(game.global.idioma).getElementsByTagName('exp')[0].childNodes[0].nodeValue;
        boxe.children[0].children[2].children[1].children[0].children[0].innerHTML = game.cache.xml.get(game.global.idioma).getElementsByTagName('expDesc')[0].childNodes[0].nodeValue;
        
    	document.getElementById("dificultad").style.visibility = 'visible';
    	
    	$( "#selectNivel" ).click(function() {
    		game.global.effects.dificultadMenu.play();
    		game.global.effects.dificultadMenu.setVolume(game.global.myPlayer.config.volEffects/100);
    		game.scene.run('PreloadGameScene');
    		game.scene.stop('DifficultScene');
    	});
    		

    	button.on('pointerover',function(pointer){
    	    button.setFrame(1);
    	})

    	button.on('pointerout',function(pointer){
    	    button.setFrame(0);
    	})
    	
    	buttonEng.on('pointerover',function(pointer){
    		buttonEng.setFrame(1);
    	})

    	buttonEng.on('pointerout',function(pointer){
    		buttonEng.setFrame(0);
    	})
    	
    	button.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
    		game.global.effects.pulsarBoton.play();
    		game.global.effects.pulsarBoton.setVolume(game.global.myPlayer.config.volEffects/100);
    		document.getElementById("dificultad").style.visibility = 'hidden';
    		game.scene.run('MenuScene');
    		game.scene.stop('DifficultScene');
    	});
    	
    	buttonEng.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
    		game.global.effects.pulsarBoton.play();
    		game.global.effects.pulsarBoton.setVolume(game.global.myPlayer.config.volEffects/100);
    		document.getElementById("dificultad").style.visibility = 'hidden';
    		game.scene.run('MenuScene');
    		game.scene.stop('DifficultScene');
    	});
    }
    update(time, delta) {
    	
    }
    
    
}