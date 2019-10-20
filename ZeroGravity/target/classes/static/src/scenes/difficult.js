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
    	
    	document.getElementById("dificultad").style.visibility = 'visible';
    	
    	$( "#selectNivel" ).click(function() {
    		game.global.sound = game.sound.play('dificultadMenu');
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
    		game.global.sound = game.sound.play('pulsarBoton');
    		document.getElementById("dificultad").style.visibility = 'hidden';
    		game.scene.run('MenuScene');
    		game.scene.stop('DifficultScene');
    	});
    }
    update(time, delta) {
    	
    }
    
    
}