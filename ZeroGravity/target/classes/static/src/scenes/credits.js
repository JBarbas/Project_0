class CreditsScene extends Phaser.Scene {
	
	constructor() {
		super({
			key: "CreditsScene",
		});
	}
	
	init(data){
		if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **CREDITS** scene");
		}
	}
	
	preload () {
		
    }
    create (data)  {
    	var background = this.add.image(960, 540, 'backgroundCredits');
    	
    	var button = this.add.image(150, 100, 'back').setInteractive();
    	
    	var link = this.add.image(1800, 50, 'link').setInteractive();
    	
    	//Animacion creditos saliendo
    	game.global.team = this.add.image(1010, 1800, 'team').setInteractive();
    	game.global.team.setScale(.8);
    	
    	var creditosHover = this.add.image(960, 160, 'creditosHover');

        link.on('pointerdown', openExternalLink, this);
        link.on('pointerover',function(pointer){
    	    
    	})

    	button.on('pointerover',function(pointer){
    	    button.setFrame(1);
    	})

    	button.on('pointerout',function(pointer){
    	    button.setFrame(0);
    	})

    
    	
    	button.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
    		game.global.sound = game.sound.play('pulsarBoton');
    		game.scene.run('MenuScene');
    		game.scene.stop('CreditsScene');
    	});
    	
    	function openExternalLink(){
    		game.global.sound = game.sound.play('pulsarBoton');
    		window.open("https://marferfer.github.io/WebSitePortfolio/", "_blank"); 
    	}
    }
    update(time, delta) {
    	game.global.team.y -= 1;
    }
    
    
}