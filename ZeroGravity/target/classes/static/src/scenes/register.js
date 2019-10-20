class RegisterScene extends Phaser.Scene {
	
	constructor() {
		super({
			key: "RegisterScene",
		});
	}
	
	init(data){
		if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **REGISTER** scene");
		}
	}
	
	preload () {
		
    }
    create (data)  {
    	var background = this.add.image(960, 540, 'backgroundRegister');
    	
    	var buttonR = this.add.image(960, 900, 'btnRegister').setInteractive();
    	
    	var back = this.add.image(150, 100, 'back').setInteractive();

    	buttonR.on('pointerover',function(pointer){
    		buttonR.setFrame(1);
    	})

    	buttonR.on('pointerout',function(pointer){
    		buttonR.setFrame(0);
    	})
    	
    	back.on('pointerover',function(pointer){
    		back.setFrame(1);
    	})

    	back.on('pointerout',function(pointer){
    		back.setFrame(0);
    	})
    	
    	back.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
    		game.global.sound = game.sound.play('pulsarBoton');
    		game.scene.run('LogInScene');
    		game.scene.stop('RegisterScene');
    	});
    	
    	var element = this.add.dom(400, 600).createFromCache('registerform');

        element.setPerspective(800);
        
        var boxe = element.node.children[1];
        boxe.children[0].children[0].children[1].innerHTML = game.cache.xml.get(game.global.idioma).getElementsByTagName('user')[0].childNodes[0].nodeValue;
        boxe.children[0].children[2].children[1].innerHTML = game.cache.xml.get(game.global.idioma).getElementsByTagName('pass')[0].childNodes[0].nodeValue;
        
        buttonR.on('pointerdown', function(pointer, localX, localY, event){
        	game.global.sound = game.sound.play('pulsarBoton');
        	var inputUsername = element.getChildByName('username');
        	var inputEmail = element.getChildByName('email');
            var inputPassword = element.getChildByName('password');

            //  Have they entered anything?
            if (inputUsername.value !== '' && inputEmail.value !== '' && inputPassword.value !== '')
            {
                
                let msg = new Object();
        		msg.event = 'REGISTER';
        		msg.name = inputUsername.value;
        		msg.email = inputEmail.value;
        		msg.password = inputPassword.value;
        		game.global.socket.send(JSON.stringify(msg));
        		
        		// Esperamos la respuesta del servidor para cambiar la escena
            }
            else
            {
                //  Flash the prompt
            }
    	});
    }
    update(time, delta) {
    	
    }
}