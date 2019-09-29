package es.urjc.practica_2019.ZeroGravity.Clases;

public class CentroMando extends Edificio {

	public CentroMando() {
		
		//Establecemos los costes por cada nivel: Energia, Metal, Ceramica, Creditos
		int[] nivel1 = {1, 0, 0, 0};
		int[] nivel2 = {2, 0, 0, 0};
		int[] nivel3 = {3, 0, 0, 0};
		int[][] costs = {nivel1, nivel2, nivel3};
		this.setCosts(costs);
		
		this.setHeight(2);
		this.setWidth(2);
		this.setLevel(1);
		this.setBuildingDependsOn(null);
		this.setSprite("assets/sprites/Edificio.png");
	}
	
	
}
