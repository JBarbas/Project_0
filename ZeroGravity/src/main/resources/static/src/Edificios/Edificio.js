class Edificio {
	
	constructor(x, y){
		
		this.id = 0;
		this.x = x;
		this.y = y;
		this.height = 1;
		this.width = 1;
		this.level = 1;
		this.sprite = 'edificio';
		this.buildingSprite = 'enConstruccion1';
		this.enConstruccion = false;
		this.inicioConstruccion = Date.now();
		this.timeText = null;
		this.gameObject = null;
		this.originX = 0.5; // Porcentaje a lo ancho de la imagen desde donde se comenzara a pintar
		this.menuScene = ''; // La key de la escena del menu de este edificio
		this.costes =  [[5, 0],
						[5, 0],
						[5, 0]];
		this.interval = null;
	}
	
	build(scene) {
		pedirPuntuaciones()
		if (this.gameObject !== null) {
			this.gameObject.destroy();
		}
		var position = new Phaser.Geom.Point(this.x*tile_width/2, this.y*tile_height);
		position = cartesianToIsometric(position);
		position.x += tileMap_width*tile_width/2;
		if (this.enConstruccion) {
			this.gameObject = scene.add.image(position.x, position.y, this.buildingSprite).setOrigin(this.originX, 1);
		}
		else {
			this.gameObject = scene.add.image(position.x, position.y, this.sprite).setOrigin(this.originX, 1);
		}
		this.gameObject.setFrame(this.level -1);
		this.gameObject.depth = this.y + this.x + 1/Math.max(this.height, this.width);
		
		if (this instanceof GeneradorRecursos) {
			if (this.lleno) {
				if (this.recolectIcon !== null) {
					this.recolectIcon.destroy();
				}
				this.recolectIcon = scene.add.image(position.x, position.y - 100, this.resourceSprite).setOrigin(0.5, 1);
				this.recolectIcon.depth = this.y + this.x + 1/Math.max(this.height, this.width);		
				scene.tweens.add({
			        targets: this.recolectIcon,
			        y: position.y - 150,
			        duration: 2000,
			        ease: 'Power2',
			        yoyo: true,
			        loop: -1
			    });
				let e = this
				this.recolectIcon.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
		    		this.destroy();
		    		e.lleno = false;
		    		let msg = new Object();
		    		msg.event = 'RECOLECT';
		    		msg.id = e.id;
		    		game.global.socket.send(JSON.stringify(msg));
		    	});
			}
		}
		if (this.timeText !== null) {
			this.timeText.destroy();
		}
		if (this.enConstruccion) {
			this.timeText = scene.add.text(position.x, position.y - 115, 
					Math.floor(this.costes[this.level-1][0] - (Date.now() - this.inicioConstruccion)/60000) + " mins",
					{ fontFamily: '"Roboto Condensed"', color: 'white' , fontSize: '24px', fontWeight: 'bold', textShadow: "2px 2px 15px #000000, 2px 2px 15px #000000"}).setOrigin(0.5, 0.5);
			this.timeText.depth = this.y + this.x + 1/Math.max(this.height, this.width);
			var that = this;
			this.interval = setInterval(function() {
				updateTimeText(that);
			}, 30000);
		}
	}
	
	move () {
		this.gameObject.alpha = 0.5;
		this.gameObject.setTexture(this.sprite);
		for (var i = this.y-this.height+1; i <= this.y; i++) {
			for (var j = this.x-this.width+1; j <= this.x; j++) {
				if (typeof game.global.grid[i] !== 'undefined') {
					if (typeof game.global.grid[i][j] !== 'undefined') {
						game.global.grid[i][j].type = 0
					}
				}
			}
		}
		game.global.construyendo = true;
		game.scene.getScene('GameScene').gridContainer.setAlpha(0.5);
		game.global.edificioEnConstruccion = this;
		
		if (this instanceof GeneradorRecursos) {
			if (this.recolectIcon !== null) {
				this.recolectIcon.destroy();
			}
		}
	}
	
	previsualizar(scene) {
		this.gameObject = scene.add.image(this.x, this.y, this.sprite).setOrigin(this.originX, 1);
		this.gameObject.alpha = 0.5;
	}
	
	destroy() {
		if (this.gameObject !== null) {
			this.gameObject.destroy();
		}
	}
}

function updateTimeText(edificio) {
	edificio.timeText.text = Math.floor(edificio.costes[edificio.level-1][0] - (Date.now() - edificio.inicioConstruccion)/60000) + " mins";
}

