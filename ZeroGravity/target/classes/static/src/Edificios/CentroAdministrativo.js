class CentroAdministrativo extends Edificio{
	
	constructor(x, y){
		
		super(x, y)
		super.height = 1;
		super.width = 2;
		super.level = 1;
		super.numColonos = 0;
		super.sprite = 'centroAdministrativo';
		super.buildingSprite = 'enConstruccion2';
		super.menuScene = 'CentroAdministrativoMenu';
		super.listImage = 'assets/sprites/Edificios/Sprite_Administrativo.png';
		super.nameEsp = 'Centro administrativo';
		super.nameEng = 'Administrative center';
		super.originX = 0.67;
		this.costes = [[5, 0],
			[5, 0],
			[5, 0]];
	}
}