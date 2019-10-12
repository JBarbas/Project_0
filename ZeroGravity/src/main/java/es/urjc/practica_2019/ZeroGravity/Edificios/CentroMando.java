package es.urjc.practica_2019.ZeroGravity.Edificios;

public class CentroMando extends Edificio {

	//Establecemos los costes por cada nivel: Energia, Metal, Ceramica, Creditos
	public static final int[] NIVEL1 = { 1, 0, 0, 0 };
	public static final int[] NIVEL2 = { 2, 0, 0, 0 };
	public static final int[] NIVEL3 = { 3, 0, 0, 0 };
	public static final int[][] COSTS = { NIVEL1, NIVEL2, NIVEL3};
	
	public CentroMando(int x, int y, int id) {
		
		this.id = id;
		this.x = x;
		this.y = y;
		this.height = 2;
		this.width = 2;
		this.level = 1;
		this.buildingDependsOn = null;
		this.sprite = "centroDeMando";
	}
	
	public CentroMando(int id) {
		
		this.id = id;
		this.height = 2;
		this.width = 2;
		this.level = 1;
		this.buildingDependsOn = null;
		this.sprite = "centroDeMando";
	}
}
