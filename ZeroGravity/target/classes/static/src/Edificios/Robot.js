class Robot {
	
	constructor(id, date){
		
		this.id = id;
		this.sprite = 'robotNv';
		this.nivel = 0;
		this.ausente = false;
		if (typeof date === 'undefined') {
			this.inicioProduccion = Date.now();
		}
		else {
			this.inicioProduccion = date;
		}
		this.recursos = [[5, 5],
						[12, 300],
						[20, 420]];
	}
}