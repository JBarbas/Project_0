package es.urjc.practica_2019.ZeroGravity.Edificios;

import java.io.IOException;

import org.springframework.web.socket.TextMessage;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import es.urjc.practica_2019.ZeroGravity.Player;
import es.urjc.practica_2019.ZeroGravity.Task;
import es.urjc.practica_2019.ZeroGravity.TaskMaster;
import es.urjc.practica_2019.ZeroGravity.WebsocketGameHandler;

public class BloqueViviendas extends Edificio {
	
	private static final TaskMaster TASKMASTER = TaskMaster.INSTANCE;

	// Establecemos los costes por cada nivel: Energia, Metal, Ceramica, Creditos, tiempo
	public static final int[] NIVEL1 = { 2, 0, 0, 0, 2};
	public static final int[] NIVEL2 = { 6, 0, 0, 0, 11};
	public static final int[] NIVEL3 = { 9, 0, 0, 0, 28};
	public static final int[] NIVEL4 = { 13, 0, 0, 0, 52};
	public static final int[] NIVEL5 = { 16, 0, 0, 0, 84};
	public static final int[] NIVEL6 = { 20, 0, 0, 0, 122};
	public static final int[] NIVEL7 = { 23, 0, 0, 0, 169};
	public static final int[] NIVEL8 = { 27, 0, 0, 0, 222};
	public static final int[] NIVEL9 = { 31, 0, 0, 0, 283};
	public static final int[] NIVEL10 = { 34, 0, 0, 0, 351};
	public static final int[] NIVEL11 = { 38, 0, 0, 0, 427};
	public static final int[] NIVEL12 = { 41, 0, 0, 0, 510};
	public static final int[] NIVEL13 = { 45, 0, 0, 0, 600};
	public static final int[] NIVEL14 = { 49, 0, 0, 0, 698};
	public static final int[] NIVEL15 = { 52, 0, 0, 0, 803};
	public static final int[][] COSTS = { NIVEL1, NIVEL2, NIVEL3, NIVEL4, NIVEL5,
										  NIVEL6, NIVEL7, NIVEL8, NIVEL9, NIVEL10,
										  NIVEL11, NIVEL12, NIVEL13, NIVEL14, NIVEL15};
	public static final int[] capacidad = {5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75};	
	
	private int colonos;
	
	private ObjectMapper mapper = new ObjectMapper();

	public BloqueViviendas(Player player, int x, int y, Edificio depends, int id) {

		this.player = player;
		this.id = id;
		this.x = x;
		this.y = y;
		this.height = 1;
		this.width = 1;
		this.level = 0;
		this.buildingDependsOn = depends;
		this.sprite = "bloqueViviendas";
		this.maxLevel = 15;
	}
	
	public BloqueViviendas(int id) {
		this.id = id;
		this.height = 1;
		this.width = 1;
		this.level = 0;
		this.buildingDependsOn = null;
		this.sprite = "bloqueViviendas";
		this.maxLevel = 15;
	}

	public int getCapacidad() {
		if (!this.isEnConstruccion() && this.getLevel() > 0) {
			return capacidad[this.getLevel()-1];
		}
		else {
			return 0;
		}
	}

	public int getColonos() {
		return colonos;
	}
	
	public String getColonosString() {
		return colonos + "/" + getCapacidad();
	}

	public void setColonos(int colonos) {
		this.colonos = colonos;
	}
	
	@Override
	public int[][] build(int[][] grid, int x, int y) {
		for (int i = y - this.getHeight() + 1; i <= y; i++) {
			for (int j = x - this.getWidth() + 1; j <= x; j++) {
				if (i > 0 && i < grid.length) {
					if (j > 0 && j < grid[i].length) {
						if (grid[i][j] == 0) {
							grid[i][j] = this.id;
						} else {
							return null;
						}
					} else {
						return null;
					}
				} else {
					return null;
				}
			}
		}
		ObjectNode msg = mapper.createObjectNode();
		msg.put("event", "CONSTRUYENDO EDIFICIO");
		msg.put("id", this.getId());
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
		msg.put("event", "EDIFICIO CONSTRUIDO");
		msg.put("level", this.getLevel()+1);
		Task task = null;
		Thread callback = new Thread(() -> this.callbackConstruir());
		callback.start();
		task = new Task(this.player, BloqueViviendas.COSTS[this.getLevel()][4], msg, callback);
		task.setId(player.getId().toString() + this.id + 0); //Identificador global, la ultima cifra depende de si va a construir (0) o a producir (1)
		TASKMASTER.addTask(task);
		this.setEnConstruccion(true);
		this.setBuildingBeginTime(task.getBeginDate());
		return grid;
	}

	public void callbackConstruir() {
		try {
			Thread.currentThread().join();
		} catch (InterruptedException e) {
			this.setLevel(this.getLevel()+1);
			if (this.player.getSession().isOpen()) {
				this.setEnConstruccion(false);
				this.player.setColonosMax(this.player.getColonosMax() + this.getCapacidad());
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
					p.setColonosMax(this.player.getColonosMax() + this.getCapacidad());
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
	public void levelUp() {
		ObjectNode msg = mapper.createObjectNode();
		msg.put("event", "CONSTRUYENDO EDIFICIO");
		msg.put("id", this.getId());
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
		msg.put("event", "EDIFICIO CONSTRUIDO");
		msg.put("level", this.getLevel()+1);
		Task task = null;
		Thread callback = new Thread(() -> this.callbackConstruir());
		callback.start();
		task = new Task(this.player, BloqueViviendas.COSTS[this.getLevel()][4], msg, callback);
		task.setId(player.getId().toString() + this.id + 0); //Identificador global, la ultima cifra depende de si va a construir (0) o a producir (1)
		TASKMASTER.addTask(task);
		this.setEnConstruccion(true);
		this.setBuildingBeginTime(task.getBeginDate());
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
