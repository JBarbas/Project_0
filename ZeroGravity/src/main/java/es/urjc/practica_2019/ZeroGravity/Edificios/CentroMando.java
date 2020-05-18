package es.urjc.practica_2019.ZeroGravity.Edificios;

import org.bson.Document;

import es.urjc.practica_2019.ZeroGravity.Player;
import es.urjc.practica_2019.ZeroGravity.WebsocketGameHandler;

public class CentroMando extends Edificio {

	//Establecemos los costes por cada nivel: Energia, Metal, Ceramica, Creditos
	public static final int[] NIVEL1 = { 2, 0, 0, 0, 0 };
	public static final int[] NIVEL2 = { 7, 0, 0, 0, 19 };
	public static final int[] NIVEL3 = { 12, 0, 0, 0, 51 };
	public static final int[][] COSTS = { NIVEL1, NIVEL2, NIVEL3};
	
	//Establecemos los recursos que generan según su nivel
	//recurso, tiempo(minutos), colonos
	private final static int[] RECURSOS_NIVEL1 = {0, 0, 0};
	private final static int[] RECURSOS_NIVEL2 = {0, 0, 4};
	private final static int[] RECURSOS_NIVEL3 = {0, 0, 8};
	private final static int[][] RECURSOS_GENERADOS = {RECURSOS_NIVEL1, RECURSOS_NIVEL2, RECURSOS_NIVEL3};
	
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
