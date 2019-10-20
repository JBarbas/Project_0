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
    	
    	var button = this.add.image(150, 100, 'back').setInteractive();
    	
    	var element = this.add.dom(400, 600).createFromCache('difficultform');

        element.setPerspective(800);
        
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
    		game.scene.run('PreloadGameScene');
    		game.scene.stop('DifficultScene');
    	});
    		

    	button.on('pointerover',function(pointer){
    	    button.setFrame(1);
    	})

    	button.on('pointerout',function(pointer){
    	    button.setFrame(0);
    	})
    	
    	button.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
    		document.getElementById("dificultad").style.visibility = 'hidden';
    		game.scene.run('MenuScene');
    		game.scene.stop('DifficultScene');
    	});
    }
    update(time, delta) {
    	
    }
    
    
}