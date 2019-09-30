class LoadGameScene extends Phaser.Scene {
	
	constructor() {
		super({
			key: "LoadGameScene",
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
    	var background = this.add.image(960, 540, 'backgroundLoadGame');
    	
    	
    	//this.add.tween(background).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None,0, 1000, true);
    	
    	setTimeout(function(){
    		game.scene.run('LogInScene');
    		game.scene.stop('LoadGameScene');
    	}, 3000);
    	/*var time = game.time.events.add(Phaser.Timer.SECOND * 4, fadePicture, this);
    	
    	
    	function fadePicture() {

    	    game.add.tween(background).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
    	    game.scene.run('LogInScene');
    		game.scene.stop('LoadGameScene');

    	}*/
    	/*game.scene.run('LogInScene');
		game.scene.stop('RegisterScene');*/
    	
    }
    update(time, delta) {
    	
    }
}