// Justifica el texto en los contenedores del menú de edificios
function justifica(textoEntrante){
	let textoSalida = "";
	let i = 0;
	let j = 0;
	let inicio = 0;
	/*while(i < textoEntrante.length){
		j = i + 43;
		if(j >= textoEntrante.length){
			j = textoEntrante.length;
			textoSalida += textoEntrante.slice(i, j);
		}
		else{
			while(textoEntrante[j] !== ' ' && textoEntrante[j] && textoEntrante[j] !== '.' && textoEntrante[j] !== ',')
				j--;
			textoSalida += textoEntrante.slice(i, j + 1) + '\n';
		}
		i = j + 1;
	}*/
	// Version que tiene en cuenta los saltos de linea y espacios de xml
	while(i < textoEntrante.length){
		if(textoEntrante[i] === '\n'){
			if(j == 0){
				inicio = i + 1;
				j = -1;
			}
			else{
				textoSalida += textoEntrante.slice(inicio, i + 1);
				inicio = i + 1;
				j = -1;
			}
		}
		else if(j > 43){
			while(textoEntrante[i] !== ' ' &&  textoEntrante[i] !== '.' && textoEntrante[i] !== ',' && textoEntrante[i] !== '\n'){
				i--;
			}
			if(textoEntrante[i] === '\n')
				textoSalida += textoEntrante.slice(inicio, i + 1);
			else
				textoSalida += textoEntrante.slice(inicio, i + 1) + '\n';
			inicio = i + 1;
			j = -1;
		}
		j++;
		i++;
		
		/*while (j < 43 && textoEntrante[i + j] !== '\n') {
			j++;
		}
		if(textoEntrante[i + j] === '\n'){
			textoSalida += textoEntrante.slice(i, i + j + 1);
			i = i + j + 1;
			j = 0;
		}
		else{
			while(textoEntrante[i + j] !== ' ' &&  textoEntrante[i + j] !== '.' && textoEntrante[i + j] !== ','){
				j--;
				i--;
			}
			textoSalida += textoEntrante.slice(i, i + j + 1) + '\n';
			i = i + j + 1;
			j = 0;
		}*/
		
	}
	return textoSalida;
}
function justificaHasta(textoEntrante, width){
	let textoSalida = "";
	let i = 0;
	let j = 0;
	let inicio = 0;
	while(i < textoEntrante.length){
		if(textoEntrante[i] === '\n'){
			if(j == 0){
				inicio = i + 1;
				j = -1;
			}
			else{
				textoSalida += textoEntrante.slice(inicio, i + 1);
				inicio = i + 1;
				j = -1;
			}
		}
		else if(j > width){
			while(textoEntrante[i] !== ' ' &&  textoEntrante[i] !== '.' && textoEntrante[i] !== ',' && textoEntrante[i] !== '\n'){
				i--;
			}
			if(textoEntrante[i] === '\n')
				textoSalida += textoEntrante.slice(inicio, i + 1);
			else
				textoSalida += textoEntrante.slice(inicio, i + 1) + '\n';
			inicio = i + 1;
			j = -1;
		}
		j++;
		i++;
		
	}
	return textoSalida;
}

function leerTutorial(scene,idTuto){
	//Reseteo de objetos para siguiente texto
	
	var textoDesdeXml;
	
	var container = scene.add.image(560, 840, 'contTextTut').setOrigin(0, 0);
	var binette = scene.add.image(1460, 380, 'binette').setOrigin(0, 0);
	var celso = scene.add.image(1460, 380, 'celso').setOrigin(0, 0);
	var jakob = scene.add.image(1460, 380, 'jakob').setOrigin(0, 0);
	var priya = scene.add.image(1460, 380, 'priya').setOrigin(0, 0);
	
	celso.setVisible(false);
	binette.setVisible(false);
	jakob.setVisible(false);
	priya.setVisible(false);
	container.setVisible(false);
	
	scene.cortina = scene.add.image(0, 0, 'cortina').setOrigin(0, 0);
	
	var cort = scene.cortina;
	cort.setVisible(false);
	cort.alpha = 0.4;
	cort.depth = -2;
	
	
	container.scale = 0.8;
	container.depth = -1;
	
	if (idTuto != -1 && game.global.idTuto != -1){
		textoDesdeXmlTut = scene.cache.xml.get(game.global.idioma + "Tut").getElementsByTagName('tut' + idTuto)[0].childNodes[0].nodeValue;
		var elemento = scene.cache.xml.get(game.global.idioma + "Tut").getElementsByTagName('tut' + idTuto)[0];
		game.global.textoTut = scene.add.text(600, 900, textoDesdeXmlTut, { fontFamily: '"Roboto Condensed"', color: 'white' , fontSize: '24px', fontWeight: 'bold'});
		
		game.global.idTuto = elemento.getAttribute("nextMsg");
		var position = elemento.getAttribute("pos");
		game.global.containerTut = container;
		game.global.cortina = cort;
		
		switch (elemento.getAttribute("character")){
			case 'celso':
				celso.setVisible(true);
				binette.setVisible(false);
				jakob.setVisible(false);
				priya.setVisible(false);


				cort.setVisible(true);
				container.setVisible(true);
				
				game.global.imgChar = celso;
				if(position == 'iz'){
					container.setFlip(true,false);
					celso.setFlip(true,false);
					celso.x = '275';
				}
			break;
			case 'binnette':
				celso.setVisible(false);
				binette.setVisible(true);
				jakob.setVisible(false);
				priya.setVisible(false);
				cort.setVisible(true);
				container.setVisible(true);
				game.global.imgChar = binette;
				if(position == 'iz'){
					container.setFlip(true,false);
					binette.setFlip(true,false);
					binette.x = '260';
				}
			break;
			case 'jakob':
				celso.setVisible(false);
				binette.setVisible(false);
				jakob.setVisible(true);
				priya.setVisible(false);
				cort.setVisible(true);
				container.setVisible(true);
				game.global.imgChar = jakob;
				if(position == 'iz'){
					container.setFlip(true,false);
					jakob.setFlip(true,false);
					jakob.x = '260';
				}
			break;
			case 'priya':
				celso.setVisible(false);
				binette.setVisible(false);
				jakob.setVisible(false);
				priya.setVisible(true);
				cort.setVisible(true);
				container.setVisible(true);
				game.global.imgChar = priya;
				
				if(position == 'iz'){
					container.setFlip(true,false);
					priya.setFlip(true,false);
					priya.x = '260';
				}
			break;
		}
	}
}