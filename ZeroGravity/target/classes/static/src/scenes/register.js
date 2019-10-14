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
    	back.setScale(.15);

    	buttonR.on('pointerover',function(pointer){
    		buttonR.setFrame(1);
    	})

    	buttonR.on('pointerout',function(pointer){
    		buttonR.setFrame(0);
    	})
    	
    	back.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
    		game.scene.run('LogInScene');
    		game.scene.stop('RegisterScene');
    	});
    	
    	var element = this.add.dom(400, 600).createFromCache('registerform');

        element.setPerspective(800);
        
        buttonR.on('pointerdown', function(pointer, localX, localY, event){
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