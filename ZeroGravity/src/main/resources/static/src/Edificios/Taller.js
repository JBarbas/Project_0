class Taller extends Edificio{
	
	constructor(x, y){
		
		super(x, y)
		super.height = 2;
		super.width = 1;
		super.level = 1;
		super.sprite = 'taller';
		super.menuScene = 'TallerMenu';
		super.originX = 0.32;
	}
}