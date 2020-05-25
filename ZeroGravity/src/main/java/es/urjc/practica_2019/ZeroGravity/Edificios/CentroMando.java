package es.urjc.practica_2019.ZeroGravity.Edificios;

import java.io.IOException;
import java.time.LocalDateTime;

import org.bson.Document;
import org.springframework.web.socket.TextMessage;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import es.urjc.practica_2019.ZeroGravity.Player;
import es.urjc.practica_2019.ZeroGravity.Task;
import es.urjc.practica_2019.ZeroGravity.TaskMaster;
import es.urjc.practica_2019.ZeroGravity.WebsocketGameHandler;

public class CentroMando extends Edificio {
	
	private static final TaskMaster TASKMASTER = TaskMaster.INSTANCE;

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
	
	private ObjectMapper mapper = new ObjectMapper();
	
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
		this.maxLevel = 3;
	}
	
	public CentroMando(int id) {
		
		this.id = id;
		this.height = 2;
		this.width = 2;
		this.level = 1;
		this.buildingDependsOn = null;
		this.sprite = "centroDeMando";
		this.maxLevel = 3;
	}
	
	@Override
	public void levelUp() {
		ObjectNode msg = mapper.createObjectNode();
		msg.put("event", "EDIFICIO CONSTRUIDO");
		msg.put("id", this.getId());
		msg.put("level", this.getLevel()+1);
		Task task = null;
		Thread callback = new Thread(() -> this.callbackConstruir());
		callback.start();
		task = new Task(this.player, BloqueViviendas.COSTS[this.getLevel()][4], msg.deepCopy(), callback);
		task.setId(player.getId().toString() + this.id + 0); //Identificador global, la ultima cifra depende de si va a construir (0) o a producir (1)
		TASKMASTER.addTask(task);
		this.setEnConstruccion(true);
		this.setBuildingBeginTime(task.getBeginDate());
		msg.put("event", "CONSTRUYENDO EDIFICIO");
		msg.put("construccionDateYear", this.getBuildingBeginTime().getYear());
		msg.put("construccionDateMonth", this.getBuildingBeginTime().getMonthValue());
		msg.put("construccionDateDay", this.getBuildingBeginTime().getDayOfMonth());
		msg.put("construccionDateHour", this.getBuildingBeginTime().getHour());
		msg.put("construccionDateMinute", this.getBuildingBeginTime().getMinute());
		try {
			if (player.getSession().isOpen()) {
				player.getSession().sendMessage(new TextMessage(msg.toString()));
			}
		} catch (IOException e) {
			System.err.println("Exception sending message " + msg.toString());
			e.printStackTrace(System.err);
		}
	}
	
	public void callbackConstruir() {
		try {
			Thread.currentThread().join();
		} catch (InterruptedException e) {
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
			if (this.player.getSession().isOpen()) {
				this.setEnConstruccion(false);
				this.player.saveRecursos();
				this.player.saveEdificios();
				ObjectNode msg = mapper.createObjectNode();
				msg.put("event", "GET_PLAYER_RESOURCES");
				msg.put("metal", player.getMetal());
				msg.put("energia", player.getEnergia());
				msg.put("ceramica", player.getCeramica());
				msg.put("creditos", player.getCreditos());
				msg.put("punctuacion", player.getPuntuacion());
				msg.put("unionCoins", player.getUnionCoins());
				msg.put("colonos", player.getColonos() + "/" + player.getColonosMax());
				try {
					this.player.getSession().sendMessage(new TextMessage(msg.toString()));
				} catch (IOException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
			} else {
				Player p = WebsocketGameHandler.getPlayers().get(this.player.getId());
				if (p != null) {
					p.getEdificio(this.getId()).setEnConstruccion(false);
					p.saveRecursos();
					p.saveEdificios();
					ObjectNode msg = mapper.createObjectNode();
					msg.put("event", "GET_PLAYER_RESOURCES");
					msg.put("metal", p.getMetal());
					msg.put("energia", p.getEnergia());
					msg.put("ceramica", p.getCeramica());
					msg.put("creditos", p.getCreditos());
					msg.put("punctuacion", p.getPuntuacion());
					msg.put("unionCoins", p.getUnionCoins());
					msg.put("colonos", p.getColonos() + "/" + player.getColonosMax());
					try {
						p.getSession().sendMessage(new TextMessage(msg.toString()));
					} catch (IOException e1) {
						// TODO Auto-generated catch block
						e1.printStackTrace();
					}
				}
			}
		}
	}
	
	@Override
	public void logInUpdate() {
		if (player.getSession() != null) {
			if (this.enConstruccion) {
				ObjectNode msg = mapper.createObjectNode();
				msg.put("event", "EDIFICIO CONSTRUIDO");
				msg.put("level", this.getLevel()+1);
				msg.put("id", this.getId());
				try {
					if (player.getSession().isOpen()) {
						player.getSession().sendMessage(new TextMessage(msg.toString()));
					}
				} catch (IOException e) {
					System.err.println("Exception sending message " + msg.toString());
					e.printStackTrace(System.err);
				}
				Task task = null;
				Thread callback = new Thread(() -> this.callbackConstruir());
				task = new Task(this.player, BloqueViviendas.COSTS[this.getLevel()][4], msg, callback);
				task.setId(player.getId().toString() + this.id + 0); //Identificador global, la ultima cifra depende de si va a construir (0) o a producir (1)
				task.setBeginDate(buildingBeginTime);
				if (TASKMASTER.addTask(task)) {
					callback.start();
				}
			}
			player.saveEdificios();
		}
	}
}
