package es.urjc.practica_2019.ZeroGravity.Edificios;

import java.io.IOException;
import java.time.LocalDateTime;

import org.springframework.web.socket.TextMessage;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import es.urjc.practica_2019.ZeroGravity.Player;
import es.urjc.practica_2019.ZeroGravity.Task;
import es.urjc.practica_2019.ZeroGravity.TaskMaster;
import es.urjc.practica_2019.ZeroGravity.WebsocketGameHandler;

public class CentroComercio extends Edificio {
	
	private static final TaskMaster TASKMASTER = TaskMaster.INSTANCE;

	// Establecemos los costes por cada nivel: Energia, Metal, Ceramica, Creditos, Tiempo
	public static final int[] NIVEL1 = { 1, 0, 0, 0, 2};
	public static final int[] NIVEL2 = { 5, 0, 0, 0, 15};
	public static final int[] NIVEL3 = { 9, 0, 0, 0, 39};
	public static final int[] NIVEL4 = { 13, 0, 0, 0, 75};
	public static final int[] NIVEL5 = { 18, 0, 0, 0, 122};
	public static final int[] NIVEL6 = { 22, 0, 0, 0, 179};
	public static final int[] NIVEL7 = { 26, 0, 0, 0, 248};
	public static final int[] NIVEL8 = { 30, 0, 0, 0, 328};
	public static final int[] NIVEL9 = { 34, 0, 0, 0, 420};
	public static final int[][] COSTS = { NIVEL1, NIVEL2, NIVEL3, NIVEL4, NIVEL5, NIVEL6, NIVEL7, NIVEL8, NIVEL9};
	
	//Establecemos los recursos que generan según su nivel
	//recurso, tiempo(minutos), colonos
	private final static int[] RECURSOS_NIVEL1 = {0, 0, 5};
	private final static int[] RECURSOS_NIVEL2 = {0, 0, 8};
	private final static int[] RECURSOS_NIVEL3 = {0, 0, 12};
	private final static int[] RECURSOS_NIVEL4 = {0, 0, 15};
	private final static int[] RECURSOS_NIVEL5 = {0, 0, 19};
	private final static int[] RECURSOS_NIVEL6 = {0, 0, 22};
	private final static int[] RECURSOS_NIVEL7 = {0, 0, 26};
	private final static int[] RECURSOS_NIVEL8 = {0, 0, 29};
	private final static int[] RECURSOS_NIVEL9 = {0, 0, 32};
	private final static int [][] RECURSOS_GENERADOS = {RECURSOS_NIVEL1, RECURSOS_NIVEL2, RECURSOS_NIVEL3, 
														RECURSOS_NIVEL4, RECURSOS_NIVEL5, RECURSOS_NIVEL6,
														RECURSOS_NIVEL7, RECURSOS_NIVEL8, RECURSOS_NIVEL9};
	
	private ObjectMapper mapper = new ObjectMapper();

	public CentroComercio(Player player, int x, int y, Edificio depends, int id) {

		this.player = player;
		this.id = id;
		this.x = x;
		this.y = y;
		this.height = 1;
		this.width = 1;
		this.level = 0;
		this.buildingDependsOn = depends;
		this.sprite = "centroComercio";
		this.maxLevel = 9;
	}
	
	public CentroComercio(Player player, int id) {

		this.player = player;
		this.id = id;
		this.height = 1;
		this.width = 1;
		this.level = 0;
		this.buildingDependsOn = null;
		this.sprite = "centroComercio";
		this.maxLevel = 9;
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
		task = new Task(this.player, CentroComercio.COSTS[this.getLevel()][4], msg, callback);
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
				this.player.saveEdificios();
				WebsocketGameHandler.updateInfo(player, "REFRESH GRID", player.getSession());
			} else {
				Player p = WebsocketGameHandler.getPlayers().get(this.player.getId());
				if (p != null) {
					p.getEdificio(this.getId()).setEnConstruccion(false);
					p.saveEdificios();
				}
			}
		}
	}
	
	@Override
	public void levelUp() {
		ObjectNode msg = mapper.createObjectNode();
		msg.put("id", this.getId());
		msg.put("event", "EDIFICIO CONSTRUIDO");
		msg.put("level", this.getLevel()+1);
		Task task = null;
		Thread callback = new Thread(() -> this.callbackConstruir());
		callback.start();
		task = new Task(this.player, CentroComercio.COSTS[this.getLevel()][4], msg.deepCopy(), callback);
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
				task = new Task(this.player, CentroComercio.COSTS[this.getLevel()][4], msg, callback);
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
