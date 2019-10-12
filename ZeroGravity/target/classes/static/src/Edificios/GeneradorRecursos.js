class GeneradorRecursos extends Edificio{
	
	constructor(x, y){		
		super(x, y);
		this.lleno = false;
		this.produciendo = false;
		this.recolectIcon = null;
		this.resourceSprite = '';
		this.inicioProduccion = Date.now();
	}
}