// Justifica el texto en los contenedores del menú de edificios
function justifica(textoEntrante){
	let textoSalida = "";
	let i = 0;
	let j = 0;
	while(i < textoEntrante.length){
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
	}
	return textoSalida;
}