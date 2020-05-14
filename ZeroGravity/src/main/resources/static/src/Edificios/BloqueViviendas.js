class BloqueViviendas extends Edificio{
	
	constructor(x, y){
		
		super(x, y)
		super.height = 1;
		super.width = 1;
		super.level = 1;
		super.numColonos = 0;
		super.sprite = 'bloqueViviendas';
		super.sprites = ['apartamentos1', 'apartamentos1', 'apartamentos1', 'apartamentos1',
			'apartamentos2', 'apartamentos2', 'apartamentos2', 'apartamentos2', 'apartamentos2',
			'apartamentos3', 'apartamentos3', 'apartamentos3', 'apartamentos3', 'apartamentos3',
			'apartamentos4'];
		super.buildingSprite = 'enConstruccion1';
		super.menuScene = 'BloqueViviendasMenu';
		super.listImage = 'assets/sprites/Edificios/Edificio_Viviendas.png';
		super.nameEsp = 'Bloque de viviendas';
		super.nameEng = 'Block of apartments';
		this.costes = [[2, 0],
			[2, 0],
			[2, 0]];
	}
}