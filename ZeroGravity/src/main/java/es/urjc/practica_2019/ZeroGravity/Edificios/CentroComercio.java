package es.urjc.practica_2019.ZeroGravity.Edificios;

public class CentroComercio extends Edificio {

	// Establecemos los costes por cada nivel: Energia, Metal, Ceramica, Creditos
	public static final int[] NIVEL1 = { 1, 0, 0, 0 };
	public static final int[] NIVEL2 = { 2, 0, 0, 0 };
	public static final int[] NIVEL3 = { 3, 0, 0, 0 };
	public static final int[][] COSTS = { NIVEL1, NIVEL2, NIVEL3};

	public CentroComercio(int x, int y, Edificio depends, int id) {

		this.id = id;
		this.x = x;
		this.y = y;
		this.height = 1;
		this.width = 1;
		this.level = 1;
		this.buildingDependsOn = depends;
		this.sprite = "centroComercio";
	}
	
	public CentroComercio(int id) {

		this.id = id;
		this.height = 1;
		this.width = 1;
		this.level = 1;
		this.buildingDependsOn = null;
		this.sprite = "centroComercio";
	}

	public void mostrarOfertas() {

	}

	public void ofrecerIntercambio() {

	}

	public void aceptarIntercambio() {

	}
}
