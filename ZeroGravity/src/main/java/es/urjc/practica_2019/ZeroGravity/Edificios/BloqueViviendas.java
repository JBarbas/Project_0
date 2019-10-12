package es.urjc.practica_2019.ZeroGravity.Edificios;

public class BloqueViviendas extends Edificio {

	// Establecemos los costes por cada nivel: Energia, Metal, Ceramica, Creditos
	private static final int[] nivel1 = { 1, 0, 0, 0 };
	private static final int[] nivel2 = { 2, 0, 0, 0 };
	private static final int[] nivel3 = { 3, 0, 0, 0 };
	private static final int[][] costs = { nivel1, nivel2, nivel3 };
	private static final int[] capacidad = {5, 10, 15};
	
	private int colonos;

	public BloqueViviendas(int x, int y, Edificio depends, int id) {

		this.id = id;
		this.x = x;
		this.y = y;
		this.height = 1;
		this.width = 1;
		this.level = 1;
		this.buildingDependsOn = depends;
		this.sprite = "bloqueViviendas";
	}

	public int getCapacidad() {
		return capacidad[level-1];
	}

	public int getColonos() {
		return colonos;
	}

	public void setColonos(int colonos) {
		this.colonos = colonos;
	}

	@Override
	public void levelUp() {
		// TODO Auto-generated method stub

	}

	@Override
	public void showMenu() {
		// TODO Auto-generated method stub

	}
}
