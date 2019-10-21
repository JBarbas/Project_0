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
		this.recursos = [[4, 2],
						[40, 15],
						[100, 30]];
	}
}