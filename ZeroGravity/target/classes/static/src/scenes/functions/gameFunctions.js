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
			if (game.global.grid[i][j].type < 0) {
				game.global.grid[i][j].image = scene.add.image(tileMap_width*tile_width/2 + position.x, position.y, 'tile_-1').setOrigin(0.5, 1);
			}
			else {
				game.global.grid[i][j].image = scene.add.image(tileMap_width*tile_width/2 + position.x, position.y, 'tile_0').setOrigin(0.5, 1);
			}
			scene.gridContainer.add(game.global.grid[i][j].image);
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
				scene.gridContainer.remove(game.global.grid[i][j].image, true);
				var position = new Phaser.Geom.Point(j*tile_width/2, i*tile_height);
				position = cartesianToIsometric(position);
				if (game.global.grid[i][j].type < 0) {
					game.global.grid[i][j].image = scene.add.image(tileMap_width*tile_width/2 + position.x, position.y, 'tile_-1').setOrigin(0.5, 1);
				}
				else {
					game.global.grid[i][j].image = scene.add.image(tileMap_width*tile_width/2 + position.x, position.y, 'tile_0').setOrigin(0.5, 1);
				}
				scene.gridContainer.add(game.global.grid[i][j].image);
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
	var puedoConstruir = true;
	for (var a = i-edificio.height+1; a <= i; a++) {
		for (var b = j-edificio.width+1; b <= j; b++) {
			if (typeof game.global.grid[a] !== 'undefined') {
				if (typeof game.global.grid[a][b] !== 'undefined') {
					if (game.global.grid[a][b].type !== 0 && game.global.grid[a][b].type !== edificio.id) {
						puedoConstruir = false
						break;
					}
				}
			}
		}
	}
	if (puedoConstruir) {
		
		game.global.construyendo = false;
		scene.gridContainer.setAlpha(0);
    	
    	// Borramos la previsualización del edificio
    	edificio.alpha = 1;
    	edificio.gameObject.destroy();
    	if (edificio.clone !== null) {
    		edificio.clone.destroy();
    	}
    	
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

function editarCiudad() {
	game.global.construyendo = false;
	game.scene.getScene('GameScene').gridContainer.setAlpha(0);
	let msg = new Object();
	msg.event = 'EDIT';
	msg.edificios = [];
	for (var index in game.global.buildingsEdited) {
		if (game.global.buildingsEdited[index].bienSituado) {
			var puedoConstruir = true;
			for (var a = game.global.buildingsEdited[index].i-game.global.buildingsEdited[index].height+1; a <= game.global.buildingsEdited[index].i; a++) {
				for (var b = game.global.buildingsEdited[index].j-game.global.buildingsEdited[index].width+1; b <= game.global.buildingsEdited[index].j; b++) {
					if (typeof game.global.grid[a] !== 'undefined') {
						if (typeof game.global.grid[a][b] !== 'undefined') {
							if (game.global.grid[a][b].type !== 0 && game.global.grid[a][b].type !== game.global.buildingsEdited[index].id) {
								puedoConstruir = false
								break;
							}
						}
					}
				}
			}
			if (puedoConstruir) {
		    	// Borramos la previsualización del edificio
				game.global.buildingsEdited[index].alpha = 1;
				game.global.buildingsEdited[index].gameObject.destroy();
		    	if (game.global.buildingsEdited[index].clone !== null) {
		    		game.global.buildingsEdited[index].clone.destroy();
		    	}
		    	
		    	// Informamos al servidor de la construccion, para que este la valide o la descarte
		    	let msgEdificio = new Object();
				msgEdificio.x = game.global.buildingsEdited[index].j;
				msgEdificio.y = game.global.buildingsEdited[index].i;
				msgEdificio.edificio = game.global.buildingsEdited[index].sprite;
				msgEdificio.id = game.global.buildingsEdited[index].id;
				msg.edificios.push(msgEdificio);
			}
		}
	}
	game.global.socket.send(JSON.stringify(msg));
}

function cancelConstruir (scene, edificio) {
	game.global.construyendo = false;
	scene.gridContainer.setAlpha(0);
	
	// Borramos la previsualización del edificio
	edificio.alpha = 1;
	edificio.gameObject.destroy();
	if (edificio.clone !== null) {
		edificio.clone.destroy();
	}
	
	let msg = new Object();
	msg.event = 'REFRESH GRID';
	game.global.socket.send(JSON.stringify(msg));
}

function situarEdificio(scene, edificio) {
	edificio.situado = true;
	if (edificio.clone === null) {
		edificio.clone = scene.add.image(edificio.gameObject.x, edificio.gameObject.y, edificio.sprites[edificio.level]).setOrigin(edificio.originX, 1);
	}
	else {
		edificio.clone.destroy();
		edificio.clone = scene.add.image(edificio.gameObject.x, edificio.gameObject.y, edificio.sprites[edificio.level]).setOrigin(edificio.originX, 1);
	}
	edificio.clone.depth = edificio.gameObject.depth;
	edificio.clone.alpha = 0.6;
	if (game.global.canBuild) {
		edificio.bienSituado = true;
	}
	else {
		edificio.bienSituado = false;
		//edificio.clone.setFrame(edificio.level -1 + 3);
		edificio.gameObject.tint = '0xff0000';
	}
	
	var position = new Phaser.Geom.Point(scene.main_camera.getWorldPoint(scene.input.x, scene.input.y).x - tileMap_width*tile_width/2, scene.main_camera.getWorldPoint(scene.input.x, scene.input.y).y);
	
	// Convertimos las coordenadas de isometricas a cartesianas para poder utilizar los ejes cartesianos "x" e "y"
	position = isometricToCartesian(position);
	
	// Una vez en coordenadas cartesianas comprobamos a que celda de la malla corresponde el click (Utilizamos su indice en el mapGrid, que está en coordenadas cartesianas)
	let i = Math.trunc(position.y/tile_height + 1);
	let j = Math.trunc(position.x/(tile_width/2) + 1);
	
	edificio.i = i;
	edificio.j = j;
}

function situarEdificioEdit(scene, edificio) {
	
	var situado = false;
	
	var position = new Phaser.Geom.Point(scene.main_camera.getWorldPoint(scene.input.x, scene.input.y).x - tileMap_width*tile_width/2, scene.main_camera.getWorldPoint(scene.input.x, scene.input.y).y);
	
	// Convertimos las coordenadas de isometricas a cartesianas para poder utilizar los ejes cartesianos "x" e "y"
	position = isometricToCartesian(position);
	
	// Una vez en coordenadas cartesianas comprobamos a que celda de la malla corresponde el click (Utilizamos su indice en el mapGrid, que está en coordenadas cartesianas)
	let i = Math.trunc(position.y/tile_height + 1);
	let j = Math.trunc(position.x/(tile_width/2) + 1);
	
	if (typeof game.global.grid[i] !== 'undefined') {
		if (typeof game.global.grid[i][j] !== 'undefined') {
			
			for (var a = i-edificio.height+1; a <= i; a++) {
				for (var b = j-edificio.width+1; b <= j; b++) {
					if (typeof game.global.grid[a] !== 'undefined') {
						if (typeof game.global.grid[a][b] !== 'undefined') {
							if (game.global.grid[a][b].type <= 0) {
								game.global.grid[a][b].type = edificio.id;
								situado = true;
							}
						}
					}
				}
			}
			if (situado) {
				edificio.situado = true;
				edificio.gameObject.alpha = 0.6;
				if (game.global.canBuild) {
					edificio.bienSituado = true;
				}
				else {
					edificio.bienSituado = false;
				}
				
				edificio.i = i;
				edificio.j = j;
				game.global.buildingsEdited.push(edificio);
			}
		}
	}
	return situado;
	
}

// Mueve el edificio con el raton cambiando su sprite a rojo cuando este en una posicion invalida
function previsualizarEdificio(edificio, scene) {
	var position = new Phaser.Geom.Point(scene.main_camera.getWorldPoint(scene.input.x, scene.input.y).x - tileMap_width*tile_width/2, scene.main_camera.getWorldPoint(scene.input.x, scene.input.y).y);
	
	// Convertimos las coordenadas de isometricas a cartesianas para poder utilizar los ejes cartesianos "x" e "y"
	position = isometricToCartesian(position);
	
	// Una vez en coordenadas cartesianas comprobamos a que celda de la malla corresponde el click (Utilizamos su indice en el mapGrid, que está en coordenadas cartesianas)
	let i = Math.trunc(position.y/tile_height + 1);
	let j = Math.trunc(position.x/(tile_width/2) + 1);
	
	game.global.canBuild = true;
	
	if (typeof game.global.grid[i] !== 'undefined') {
		if (typeof game.global.grid[i][j] !== 'undefined') {
			//edificio.gameObject.setFrame(edificio.level-1);
			edificio.gameObject.tint = '0xFFFFFF';
			for (var a = i-edificio.height+1; a <= i; a++) {
				for (var b = j-edificio.width+1; b <= j; b++) {
					if (typeof game.global.grid[a] !== 'undefined') {
						if (typeof game.global.grid[a][b] !== 'undefined') {
							if (game.global.grid[a][b].type !== 0) {
								//edificio.gameObject.setFrame(edificio.level -1 + 3);
								edificio.gameObject.tint = '0xFF0000';
								game.global.canBuild = false;
								break;
							}
						}
					}
				}
			}
    		
    		// recogemos las coordenadas isometricas de la celda para pintar ahi el edificio
			edificio.gameObject.x = game.global.grid[i][j].image.x;
			edificio.gameObject.y = game.global.grid[i][j].image.y;
    		
			//edificio.x = game.global.grid[i][j].image.x;
			//edificio.y = game.global.grid[i][j].image.y;
			
			edificio.x = j;
			edificio.y = i;
			
			if (game.global.grid[i][j].type > 0) {
				edificio.gameObject.depth = 1000;
			}
			else {
				edificio.gameObject.depth = i + j + 0.1 + 1/edificio.height;
			}
		}
	}
}

// Cambia el sprite de la celda sobre la que se encuentra el raton
var lastCell = null; // El GameObject de la ultima celda que se pinto
function previsualizarExpansion(scene) {
	game.scene.getScene('GameScene').gridContainer.setAlpha(0.5);
	if (lastCell !== null) {
		if (lastCell.type < 0) {
			lastCell.image.setTexture('tile_-1');
		}
	}
	
	var position = new Phaser.Geom.Point(scene.main_camera.getWorldPoint(scene.input.x, scene.input.y).x - tileMap_width*tile_width/2, scene.main_camera.getWorldPoint(scene.input.x, scene.input.y).y);
	
	// Convertimos las coordenadas de isometricas a cartesianas para poder utilizar los ejes cartesianos "x" e "y"
	position = isometricToCartesian(position);
	
	// Una vez en coordenadas cartesianas comprobamos a que celda de la malla corresponde el click (Utilizamos su indice en el mapGrid, que está en coordenadas cartesianas)
	let i = Math.trunc(position.y/tile_height + 1);
	let j = Math.trunc(position.x/(tile_width/2) + 1);
	
	if (typeof game.global.grid[i] !== 'undefined') {
		if (typeof game.global.grid[i][j] !== 'undefined') {
			if (game.global.grid[i][j].type < 0) {
				lastCell = game.global.grid[i][j];
				lastCell.image.setTexture('tile_0');
			}
		}
	}
}

function askTutorialIntro(tipo) {
	let msg = new Object();
	switch(tipo){
		case 'intro':
			msg.event = 'GET TUTORIAL INTRO';
		break;
		case 'cdm':
			msg.event = 'GET CENTRO DE MANDO MENU';
		break;
		case 'cdo':
			msg.event = 'GET CENTRO DE OPERACIONES MENU';
		break;
		case 'ca':
			msg.event = 'GET CENTRO ADMINISTRATIVO MENU';
		break;
		case 'cdc':
			msg.event = 'GET CENTRO DE COMERCIO MENU';
		break;
		default:
		break;
	}
	
	game.global.socket.send(JSON.stringify(msg));
}

// Control del zoom
window.addEventListener("wheel", event => {
	if (!game.global.inMenu/* || !(game.scene.getScene('GameScene').game.input.activePointer.position.x > game.global.buildingMenu.x && 
			game.scene.getScene('GameScene').game.input.activePointer.position.x < game.global.buildingMenu.x + game.global.buildingMenu.width && 
			game.scene.getScene('GameScene').game.input.activePointer.position.y > game.global.buildingMenu.y && 
			game.scene.getScene('GameScene').game.input.activePointer.position.y < game.global.buildingMenu.y + game.global.buildingMenu.height &&
            !game.global.inZoom)*/) {
				const delta = zoomSpeed*(-Math.sign(event.deltaY));
			    zoom += delta;
			    if (zoom < minZoom) {
			    	zoom = minZoom;
			    }
			    else if (zoom > maxZoom) {
			    	zoom = maxZoom;
			    }
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

function validarEmailReg(mail) 
{
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
	{
	    return (true);
	}
	Swal.fire({
		  icon: 'error',
		  title: game.scene.getScene('RegisterScene').cache.xml.get(game.global.idioma).getElementsByTagName('errorRegTit')[0].childNodes[0].nodeValue,
		  text: game.scene.getScene('RegisterScene').cache.xml.get(game.global.idioma).getElementsByTagName('errorRegDes')[0].childNodes[0].nodeValue
	});
	    return (false);
}