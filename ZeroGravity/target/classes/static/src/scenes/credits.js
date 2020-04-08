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
    	var backgroundEng = this.add.image(960, 540, 'backgroundCreditsEng');
    	
    	var button = this.add.image(150, 100, 'back').setInteractive();
    	var buttonEng = this.add.image(150, 100, 'backEng').setInteractive();
    	
    	var link = this.add.image(1800, 50, 'link').setInteractive();
    	var linkEng = this.add.image(1800, 50, 'linkEng').setInteractive();
    	
    	//Animacion creditos saliendo
    	game.global.team = this.add.image(1010, 1800, 'team').setInteractive();
    	game.global.team.setScale(.8);
    	game.global.teamEng = this.add.image(1010, 1800, 'teamEng').setInteractive();
    	game.global.teamEng.setScale(.8);
    	
    	var creditosHover = this.add.image(960, 160, 'creditosHover');
    	var creditosHoverEng = this.add.image(960, 160, 'creditosHoverEng');

    	
    	if(game.global.idioma === "eng"){
    		game.global.team.setVisible(false);
    		link.setVisible(false);
    		background.setVisible(false);
    		button.setVisible(false);
    		creditosHover.setVisible(false);
    	}else{
    		game.global.teamEng.setVisible(false);
    		linkEng.setVisible(false);
    		backgroundEng.setVisible(false);
    		buttonEng.setVisible(false);
    		creditosHoverEng.setVisible(false);
    	}
    	
        link.on('pointerdown', openExternalLink, this);
        link.on('pointerover',function(pointer){
    	    
    	})
    	
    	linkEng.on('pointerdown', openExternalLink, this);
        linkEng.on('pointerover',function(pointer){
    	    
    	})

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
    		game.global.sound = game.sound.play('pulsarBoton');
    		game.scene.run('MenuScene');
    		game.scene.stop('CreditsScene');
    	});
        
        buttonEng.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
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
    	game.global.teamEng.y -= 1;
    }
    
    
}