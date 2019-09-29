class LogInScene extends Phaser.Scene {
	
	constructor() {
		super({
			key: "LogInScene",
		});
	}
	
	init(data){
		if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **LOG IN** scene");
		}
	}
	
	preload () {
		
    }
    create (data)  {
    	var background = this.add.image(960, 540, 'backgroundLogIn');
    	
    	var button = this.add.image(960, 800, 'btn').setInteractive();

    	var registro = this.add.text(920, 900, 'REGÍSTRATE', { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif' });
    	
    	button.on('pointerover',function(pointer){
    	    button.setFrame(1);
    	})

    	button.on('pointerout',function(pointer){
    	    button.setFrame(0);
    	})
    	
    	button.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
    		game.scene.run('MenuScene');
    		game.scene.stop('LogInScene');
    	});
    	
    	
    	var	size = '20px';
    	
    	var colorYellow = '#ffd213';
    	var colorWhite = '#fff';

    	registro.setFontSize(size);
    	
    	registro.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
    		game.scene.run('RegisterScene');
    		game.scene.stop('LogInScene');
    	});
    	
    	registro.setInteractive().on('pointerover', function(pointer, localX, localY, event){
    		registro.setFill(colorYellow);
    	});
    	registro.setInteractive().on('pointerout', function(pointer, localX, localY, event){
    		registro.setFill(colorWhite);
    	});
    }
    update(time, delta) {
    	
    }
}