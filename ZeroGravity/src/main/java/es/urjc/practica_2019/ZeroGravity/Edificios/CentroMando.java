package es.urjc.practica_2019.ZeroGravity.Edificios;

import org.bson.Document;

import es.urjc.practica_2019.ZeroGravity.Player;
import es.urjc.practica_2019.ZeroGravity.WebsocketGameHandler;

public class CentroMando extends Edificio {

	//Establecemos los costes por cada nivel: Energia, Metal, Ceramica, Creditos
	public static final int[] NIVEL1 = { 0, 0, 0, 0 };
	public static final int[] NIVEL2 = { 0, 500, 500, 5000 };
	public static final int[] NIVEL3 = { 0, 10000, 10000, 50000 };
	public static final int[][] COSTS = { NIVEL1, NIVEL2, NIVEL3};
	
	private Player player;
	
	public CentroMando(Player player, int x, int y, int id) {
		this.player = player;
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
	
	@Override
	public void levelUp() {
		this.setLevel(this.getLevel()+1);
		
		if (this.getLevel() == 2) {
			player.setCdcBlocked(false);
			WebsocketGameHandler.getColl().updateOne(new Document("_id", player.getId()), new Document("$set", 
					new Document("cdcBlocked", false)
					.append("labBlocked", false)));
		}
		else if (this.getLevel() == 3) {
			player.setCdoBlocked(false);
			WebsocketGameHandler.getColl().updateOne(new Document("_id", player.getId()), new Document("$set", 
					new Document("cdoBlocked", false)));
		}
	}
}
