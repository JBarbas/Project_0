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

public class Generador extends GeneradorRecursos {

	private static final TaskMaster TASKMASTER = TaskMaster.INSTANCE;

	// Establecemos los costes por cada nivel: Energia, Metal, Ceramica, Creditos,
	// Duracion (mins)
	public static final int[] NIVEL1 = { 0, 0, 0, 0, 2};
	public static final int[] NIVEL2 = { 0, 0, 0, 0, 11};
	public static final int[] NIVEL3 = { 0, 0, 0, 0, 28};
	public static final int[] NIVEL4 = { 0, 0, 0, 0, 52};
	public static final int[] NIVEL5 = { 0, 0, 0, 0, 84};
	public static final int[] NIVEL6 = { 0, 0, 0, 0, 122};
	public static final int[] NIVEL7 = { 0, 0, 0, 0, 169};
	public static final int[] NIVEL8 = { 0, 0, 0, 0, 222};
	public static final int[] NIVEL9 = { 0, 0, 0, 0, 283};
	public static final int[] NIVEL10 = { 0, 0, 0, 0, 351};
	public static final int[] NIVEL11 = { 0, 0, 0, 0, 427};
	public static final int[] NIVEL12 = { 0, 0, 0, 0, 510};
	public static final int[] NIVEL13 = { 0, 0, 0, 0, 600};
	public static final int[] NIVEL14 = { 0, 0, 0, 0, 698};
	public static final int[] NIVEL15 = { 0, 0, 0, 0, 803};
	public static final int[][] COSTS = { NIVEL1, NIVEL2, NIVEL3, NIVEL4, NIVEL5,
										  NIVEL6, NIVEL7, NIVEL8, NIVEL9, NIVEL10,
										  NIVEL11, NIVEL12, NIVEL13, NIVEL14, NIVEL15};

	// Establecemos los recursos que generan según su nivel
	private final static int[] RECURSOS_NIVEL1 = {5, 0, 1};
	private final static int[] RECURSOS_NIVEL2 = {10, 0, 4};
	private final static int[] RECURSOS_NIVEL3 = {15, 0, 6};
	private final static int[] RECURSOS_NIVEL4 = {20, 0, 9};
	private final static int[] RECURSOS_NIVEL5 = {25, 0, 11};
	private final static int[] RECURSOS_NIVEL6 = {30, 0, 14};
	private final static int[] RECURSOS_NIVEL7 = {35, 0, 16};
	private final static int[] RECURSOS_NIVEL8 = {40, 0, 19};
	private final static int[] RECURSOS_NIVEL9 = {45, 0, 22};
	private final static int[] RECURSOS_NIVEL10 = {50, 0, 24};
	private final static int[] RECURSOS_NIVEL11 = {55, 0, 27};
	private final static int[] RECURSOS_NIVEL12 = {60, 0, 29};
	private final static int[] RECURSOS_NIVEL13 = {65, 0, 32};
	private final static int[] RECURSOS_NIVEL14 = {70, 0, 35};
	private final static int[] RECURSOS_NIVEL15 = {75, 0, 37};
	private final static int [][] RECURSOS_GENERADOS = {RECURSOS_NIVEL1, RECURSOS_NIVEL2, RECURSOS_NIVEL3, RECURSOS_NIVEL4, RECURSOS_NIVEL5,
														RECURSOS_NIVEL6, RECURSOS_NIVEL7, RECURSOS_NIVEL8, RECURSOS_NIVEL9, RECURSOS_NIVEL10,
														RECURSOS_NIVEL11, RECURSOS_NIVEL12, RECURSOS_NIVEL13, RECURSOS_NIVEL14, RECURSOS_NIVEL15};
	
	private ObjectMapper mapper = new ObjectMapper();

	public Generador(Player player, int x, int y, Edificio depends, int id) {

		this.player = player;
		this.id = id;
		this.x = x;
		this.y = y;
		this.height = 1;
		this.width = 1;
		this.level = 0;
		this.buildingDependsOn = depends;
		this.sprite = "generador";
		this.maxLevel = 15;
	}

	public Generador(int id) {

		this.id = id;
		this.height = 1;
		this.width = 1;
		this.level = 0;
		this.buildingDependsOn = null;
		this.sprite = "generador";
		this.maxLevel = 15;
	}

	@Override
	public void addColono() {
		if (this.getJobs() > 0 && this.player.getColonosMax() - this.player.getColonos() > 0) {
			this.setColonos(this.getColonos() + 1);
			this.player.addColono();
		}
	}
	
	@Override
	public void quitarColono() {
		if (this.getColonos() > 0) {
			this.setColonos(this.getColonos() - 1);
			this.player.quitarColono();
		}
	}
	
	@Override
	public String getColonosString() {
		if (this.getLevel() > 0) {
			return this.getColonos() + "/" + this.RECURSOS_GENERADOS[this.level - 1][2];
		}
		else {
			return "";
		}
	}

	public int getEnergy() {
		if (this.getLevel() > 0) {
			return this.getColonos() * this.RECURSOS_GENERADOS[this.level - 1][0]
					/ this.RECURSOS_GENERADOS[this.level - 1][2];
		}
		else {
			return 0;
		}
	}

	@Override
	public int getJobs() {
		if (!this.isEnConstruccion() && this.getLevel() > 0) {
			return Generador.RECURSOS_GENERADOS[this.level-1][2] - this.getColonos();
		}
		else {
			return 0;
		}
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
		msg.put("jobs", this.getJobs());
		Task task = null;
		Thread callback = new Thread(() -> this.callbackConstruir());
		callback.start();
		task = new Task(this.player, Generador.COSTS[this.getLevel()][4], msg, callback);
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
