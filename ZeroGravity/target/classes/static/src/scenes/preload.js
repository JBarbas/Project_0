var preloadConfig = {
    key: 'PreloadScene'
};

class PreloadScene extends Phaser.Scene {

    constructor (preloadConfig) {
        super(preloadConfig);
    }

    init(data) {}
    preload () {
    	this.load.image('Lharys', 'assets/sprites/Lharys.png');
    }
    create (data)  {
    	var image = this.add.image(200, 300, 'Lharys');
    }
    update(time, delta) {
    	
    }

}