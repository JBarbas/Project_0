//encajar los edificios en las celdas donde se quedarían al construirse
function toggle(edificio, scene){
	scene.lol = scene.add.image(edificio.x, edificio.y, edificio.sprite);
	scene.lol.alpha = 0.5;
	
	// Se pintaran de forma diferente los edificios cuadrados de los rectangulares
	switch(edificio.width/edificio.height) {	
	case 1:
		scene.lol.setOrigin(0.5, 1);
		break;
	default:
		break;
	}
}

// Asigna los tiles al array del mapa
function createGrid(scene) {
	for (var i = 0; i < game.global.grid.length; i++) {
		for (var j = 0; j < game.global.grid[i].length; j++) {
			var position = new Phaser.Geom.Point(j*tile_width/2, i*tile_height);
			position = cartesianToIsometric(position);
			switch(game.global.grid[i][j].type) {
			case -2:
				game.global.grid[i][j].image = scene.add.image(tileMap_width*tile_width/2 + position.x, position.y, 'tile_prototipo_-2').setOrigin(0.5, 1);
				break;
			case -1:
				game.global.grid[i][j].image = scene.add.image(tileMap_width*tile_width/2 + position.x, position.y, 'tile_prototipo_-1').setOrigin(0.5, 1);
				break;
			default:
				game.global.grid[i][j].image = scene.add.image(tileMap_width*tile_width/2 + position.x, position.y, 'tile_prototipo_0').setOrigin(0.5, 1);
				break;
			}
		}
	}
	var edificiosIterator = game.global.edificios.values();
	var edificio = edificiosIterator.next();
	while (!edificio.done) {
		edificio.value.build(scene);
		edificio = edificiosIterator.next();
	}
}

function refreshGrid(scene, newGrid) {
	for (var i = 0; i < game.global.grid.length; i++) {
		for (var j = 0; j < game.global.grid[i].length; j++) {
			if (game.global.grid[i][j].type !== newGrid[i][j]) {
				game.global.grid[i][j].type = newGrid[i][j];				
				game.global.grid[i][j].image.destroy();
				var position = new Phaser.Geom.Point(j*tile_width/2, i*tile_height);
				position = cartesianToIsometric(position);
				switch(game.global.grid[i][j].type) {
				case -2:
					game.global.grid[i][j].image = scene.add.image(tileMap_width*tile_width/2 + position.x, position.y, 'tile_prototipo_-2').setOrigin(0.5, 1);
					break;
				case -1:
					game.global.grid[i][j].image = scene.add.image(tileMap_width*tile_width/2 + position.x, position.y, 'tile_prototipo_-1').setOrigin(0.5, 1);
					break;
				default:
					game.global.grid[i][j].image = scene.add.image(tileMap_width*tile_width/2 + position.x, position.y, 'tile_prototipo_0').setOrigin(0.5, 1);
					break;
				}
			}
		}
	}
	var edificiosIterator = game.global.edificios.values();
	var edificio = edificiosIterator.next();
	while (!edificio.done) {
		edificio.value.build(scene);
		edificio = edificiosIterator.next();
	}
}

function construir(i, j, scene, edificio) {
	//Comprobamos si se puede construir en la celda seleccionada
	if (game.global.grid[i][j].type === 0) {
		
		game.global.construyendo = false;
		
		// recogemos las coordenadas isometricas de la celda para pintar ahi el edificio
		let x = game.global.grid[i][j].image.x;
		let y = game.global.grid[i][j].image.y;
    	edificio.x = x;
    	edificio.y = y;
    	
    	// Cambiamos el tile de la malla por la nueva imagen
    	game.global.grid[i][j].image.destroy();
    	game.global.grid[i][j].image = scene.add.image(edificio.x, edificio.y, edificio.sprite).setOrigin(0.5, 1);
    	
    	// Actualizamos la malla
    	game.global.grid[i][j].type = 2;
    	
    	// Configuramos la profundidad para que no se pinte por encima de los edificios que tiene debajo
    	game.global.grid[i][j].image.depth = i*tileMap_width + j;
    	
    	// Borramos la previsualización del edificio
    	game.global.edificioEnConstruccion.gameObject.alpha = 1;
    	
    	// Informamos al servidor de la construccion, para que este la valide o la descarte
    	let msg = new Object();
		msg.event = 'BUILD';
		msg.x = j;
		msg.y = i;
		msg.edificio = edificio.sprite;
		msg.id = edificio.id;
		game.global.socket.send(JSON.stringify(msg));
	}
}

// Mueve el edificio con el raton cambiando su sprite a rojo cuando este en una posicion invalida
function previsualizarEdificio(edificio, scene) {
	var position = new Phaser.Geom.Point(scene.main_camera.getWorldPoint(scene.input.x, scene.input.y).x - tileMap_width*tile_width/2, scene.main_camera.getWorldPoint(scene.input.x, scene.input.y).y);
	
	// Convertimos las coordenadas de isometricas a cartesianas para poder utilizar los ejes cartesianos "x" e "y"
	position = isometricToCartesian(position);
	
	// Una vez en coordenadas cartesianas comprobamos a que celda de la malla corresponde el click (Utilizamos su indice en el mapGrid, que está en coordenadas cartesianas)
	let i = Math.trunc(position.y/tile_height + 1);
	let j = Math.trunc(position.x/(tile_width/2) + 1);
	
	if (typeof game.global.grid[i] !== 'undefined') {
		if (typeof game.global.grid[i][j] !== 'undefined') {
			edificio.gameObject.setFrame(0);
			for (var a = i-edificio.height+1; a <= i; a++) {
				for (var b = j-edificio.width+1; b <= j; b++) {
					if (typeof game.global.grid[i] !== 'undefined') {
						if (typeof game.global.grid[i][j] !== 'undefined') {
							if (game.global.grid[a][b].type !== 0) {
								edificio.gameObject.setFrame(1);
								break;
							}
						}
					}
				}
			}
    		
    		// recogemos las coordenadas isometricas de la celda para pintar ahi el edificio
			edificio.gameObject.x = game.global.grid[i][j].image.x;
			edificio.gameObject.y = game.global.grid[i][j].image.y;
    		
			edificio.x = game.global.grid[i][j].image.x;
			edificio.y = game.global.grid[i][j].image.y;
			
			edificio.gameObject.depth = i*tileMap_width + j + 0.1;
		}
	}
}

// Control del zoom
window.addEventListener("wheel", event => {
    const delta = zoomSpeed*(-Math.sign(event.deltaY));
    zoom += delta;
    if (zoom < 1) {
    	zoom = 1;
    }
    else if (zoom > maxZoom) {
    	zoom = maxZoom;
    }
});

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