class IntroScene extends Phaser.Scene {
	
	constructor() {
		super({
			key: "IntroScene",
		});
	}
	
	init(data){
		if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **INTRO** scene");
		}
	}
	
	preload () {
		
    }
    create (data)  {
    	var background = this.add.image(960, 540, 'backgroundLoadGame');
    	background.alpha = 0;
    	
    	
    	var tween = this.tweens.add({
    	    targets: background,
    	    alpha: { from: 0, to: 1 },
    	    ease: 'Linear',
    	    duration: 2000,
    	    repeat: 0,
    	    yoyo: true
    	});
    	
    	tween.on('complete', function(tween, targets){
    		game.scene.run('LogInScene');
    		game.scene.stop('IntroScene');
    	});
    	
    }
    update(time, delta) {
    	
    }
}