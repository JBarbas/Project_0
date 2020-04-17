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