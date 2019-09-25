var tile_width = 128;
var tile_height = 64;
var tileMap_width = 32; // Numero de tiles a lo ancho
var tileMap_height = 32; // Numero de tiles a lo largo

class GameScene extends Phaser.Scene {
	
	constructor() {
		super({
			key: "GameScene",
		});
	}
	
	init(data){
		if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **GAME** scene");
		}
	}
	
	preload () {
		
    }
    create (data)  {
    	createGrid(this, tileMap_width, tileMap_height);
    }
    update(time, delta) {
    	
    		if(game.input.mousePointer.isDown){
	    		console.log(game.input.mousePointer.x);
	    		console.log(game.input.mousePointer.y);
	    		var centroMando = new CentroMando(game.input.mousePointer.x, game.input.mousePointer.y);
	    		console.log(centroMando.x)
	    		this.add.image(centroMando.x, centroMando.y, 'CentroMando');
    		}
    	
    }

}

function randomGrid(width, height) {
	var randomGrid = new Array();
	for (var i = 0; i < height; i++) {
		randomGrid.push(new Array());
		for (var j = 0; j < width; j++) {
			if (i === 0 || i === height - 1 || j === 0 || j === width - 1) {
				randomGrid[i].push(-2);
			}
			else if (i === 1 || i === height - 2 || j === 1 || j === width - 2) {
				randomGrid[i].push(-1);
			}
			else {
				randomGrid[i].push(0);
			}
		}
	}
	return randomGrid;
}

function createGrid(scene, width, height) {
	var newGrid = randomGrid(width, height)
	for (var i = 0; i < newGrid.length; i++) {
		for (var j = 0; j < newGrid[i].length; j++) {
			var position = new Phaser.Geom.Point(j*tile_width/2, i*tile_height);
			position = cartesianToIsometric(position);
			let tile = scene.add.image(tileMap_width*tile_width/2 + position.x, position.y, 'tile_prototipo_' + newGrid[i][j]).setOrigin(0.5, 0);
		}
	}
}

/* Codigo extraido de https://gamedevelopment.tutsplus.com/tutorials/creating-isometric-worlds-primer-for-game-developers-updated--cms-28392
 * by Juwal Bose - 11 May 2017
 */
function cartesianToIsometric(cartPt){
    var tempPt=new Phaser.Geom.Point(0, 0);
    tempPt.x=cartPt.x-cartPt.y;
    tempPt.y=(cartPt.x+cartPt.y)/2;
    return (tempPt);
}

function isometricToCartesian(isoPt){
    var tempPt=new Phaser.Geom.Point(0, 0);
    tempPt.x=(2*isoPt.y+isoPt.x)/2;
    tempPt.y=(2*isoPt.y-isoPt.x)/2;
    return (tempPt);
}