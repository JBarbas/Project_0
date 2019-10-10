class Edificio {
	
	constructor(x, y){
		
		this.id = 0;
		this.x = x;
		this.y = y;
		this.height = 1;
		this.width = 1;
		this.level = 1;
		this.sprite = 'edificio';
		this.gameObject = null;
		this.originX = 0.5; // Porcentaje a lo ancho de la imagen desde donde se comenzara a pintar
		this.menuScene = ''; // La key de la escena del menu de este edificio
	}
	
	build(scene) {
		if (this.gameObject !== null) {
			this.gameObject.destroy();
		}
		var position = new Phaser.Geom.Point(this.x*tile_width/2, this.y*tile_height);
		position = cartesianToIsometric(position);
		position.x += tileMap_width*tile_width/2;
		this.gameObject = scene.add.image(position.x, position.y, this.sprite).setOrigin(this.originX, 1);
		this.gameObject.depth = this.y + this.x + 1/Math.max(this.height, this.width);
		
		if (this instanceof GeneradorRecursos) {
			if (this.lleno) {
				if (this.recolectIcon !== null) {
					this.recolectIcon.destroy();
				}
				this.recolectIcon = scene.add.image(position.x, position.y - 100, this.resourceSprite).setOrigin(0.5, 1);
				this.recolectIcon.setScale(0.25, 0.25);
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
	}
	
	move () {
		this.gameObject.alpha = 0.5;
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