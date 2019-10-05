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
		this.load.html('loginform', 'assets/text/login-form.html');
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
    		let msg = new Object();
    		msg.event = 'LOG IN';
    		game.global.socket.send(JSON.stringify(msg));
    		
    		// Esperamos la respuesta del servidor para cambiar la escena
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
        
    	var element = this.add.dom(400, 600).createFromCache('loginform');

        element.setPerspective(800);

        element.addListener('click');

        element.on('click', function (event) {

            if (event.target.name === 'loginButton')
            {
                var inputUsername = this.getChildByName('username');
                var inputPassword = this.getChildByName('password');

                //  Have they entered anything?
                if (inputUsername.value !== '' && inputPassword.value !== '')
                {
                    //  Turn off the click events
                    this.removeListener('click');

                    //  Tween the login form out
                    this.scene.tweens.add({ targets: element.rotate3d, x: 1, w: 90, duration: 3000, ease: 'Power3' });

                    this.scene.tweens.add({ targets: element, scaleX: 2, scaleY: 2, y: 700, duration: 3000, ease: 'Power3',
                        onComplete: function ()
                        {
                            element.setVisible(false);
                        }
                    });

                    //  Populate the text with whatever they typed in as the username!
                    text.setText('Welcome ' + inputUsername.value);
                }
                else
                {
                    //  Flash the prompt
                    this.scene.tweens.add({ targets: text, alpha: 0.1, duration: 200, ease: 'Power3', yoyo: true });
                }
            }

        });
    }
    update(time, delta) {
    	
    }
    
    textAreaChanged() {
        var text = this.formUtil.getTextAreaValue("area51");
        console.log(text);
    }
}