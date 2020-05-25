class CentroAdministrativo extends Edificio{
	
	constructor(x, y){
		
		super(x, y)
		super.height = 1;
		super.width = 2;
		super.level = 0;
		super.numColonos = 0;
		super.sprite = 'centroAdministrativo';
		super.sprites = ['cAdministrativo1', 'cAdministrativo2', 'cAdministrativo3'];
		super.buildingSprite = 'enConstruccion2';
		super.menuScene = 'CentroAdministrativoMenu';
		super.listImage = 'assets/sprites/Edificios/Sprite_Administrativo.png';
		super.nameEsp = 'Centro administrativo';
		super.nameEng = 'Administrative center';
		super.originX = 0.67;
		this.costes = [[2, 0],
			[0, 0],
			[0, 0]];
	}
}