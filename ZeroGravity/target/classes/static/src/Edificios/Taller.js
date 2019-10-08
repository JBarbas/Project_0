class Taller extends Edificio{
	
	constructor(x, y){
		
		super(x, y)
		super.height = 1;
		super.width = 1;
		super.level = 1;
		super.sprite = 'taller';
		super.menuScene = 'tallerMenu';
	}
}