class OptionsScene extends Phaser.Scene {
	
	constructor() {
		super({
			key: "OptionsScene",
		});
	}
	
	init(data){
		if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **OPTIONS** scene");
		}
	}
	
	preload () {
		
    }
    create (data)  {
    	
    	
    	var background = this.add.image(960, 540, 'backgroundOptionsAccount');
    	
    	var button = this.add.image(150, 100, 'back').setInteractive();
    	var btnIdioma = this.add.image(1400, 250, 'btnIdioma').setInteractive();
    	var btnSonido = this.add.image(960, 250, 'btnSonido').setInteractive();
    	var btnCuenta = this.add.image(550, 250, 'btnCuenta').setInteractive();
    	
    	var txtCuenta = this.add.image(950, 650, 'txtCuenta');
    	var txtSonido = this.add.image(650, 650, 'txtSonido');
    	var txtIdioma = this.add.image(650, 650, 'txtIdioma');
    	
    	txtCuenta.setVisible(true);
		txtSonido.setVisible(false);
		txtIdioma.setVisible(false);
    	
		
		
    	//Default cuenta
    	btnCuenta.setFrame(1);
    	
    	button.on('pointerover',function(pointer){
    	    button.setFrame(1);
    	})

    	button.on('pointerout',function(pointer){
    	    button.setFrame(0);
    	})
    	
    	btnCuenta.on('pointerdown',function(pointer){
    		btnCuenta.setFrame(1);
    		btnSonido.setFrame(0);
    		btnIdioma.setFrame(0);
    		txtCuenta.setVisible(true);
    		txtSonido.setVisible(false);
    		txtIdioma.setVisible(false);
    		
    	})
    	
    	btnSonido.on('pointerdown',function(pointer){
    		btnCuenta.setFrame(0);
    		btnSonido.setFrame(1);
    		btnIdioma.setFrame(0);
    		txtCuenta.setVisible(false);
    		txtSonido.setVisible(true);
    		txtIdioma.setVisible(false);
    	})
    	
    	btnIdioma.on('pointerdown',function(pointer){
    		btnCuenta.setFrame(0);
    		btnSonido.setFrame(0);
    		btnIdioma.setFrame(1);
    		txtCuenta.setVisible(false);
    		txtSonido.setVisible(false);
    		txtIdioma.setVisible(true);
    	})
    	
    	button.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
    		game.scene.run('MenuScene');
    		game.scene.stop('OptionsScene');
    	});
    	
    	var element = this.add.dom(400, 600).createFromCache('optionsform');

        element.setPerspective(800);
        
        var fSYes = document.getElementById('fullScreenYes');
		var fSNo = document.getElementById('fullScreenNo');
		
		fSYes.addEventListener("click", function(){
			if(this.scale.isFullscreen){
				this.scale.stopFullscreen();
			}else{
				this.scale.startFullscreen();
			}
		}, this);
    
    	
    }
    update(time, delta) {
    	
    }
}