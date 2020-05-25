package es.urjc.practica_2019.ZeroGravity.Edificios;

import java.io.IOException;
import java.util.Collection;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.web.socket.TextMessage;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import es.urjc.practica_2019.ZeroGravity.Player;
import es.urjc.practica_2019.ZeroGravity.Task;
import es.urjc.practica_2019.ZeroGravity.TaskMaster;
import es.urjc.practica_2019.ZeroGravity.WebsocketGameHandler;
import es.urjc.practica_2019.ZeroGravity.Robots.Robot;
import es.urjc.practica_2019.ZeroGravity.Robots.RobotEstandar;

public class Taller extends GeneradorRecursos{
	
	private static final TaskMaster TASKMASTER = TaskMaster.INSTANCE;

	// Establecemos los costes por cada nivel: Energia, Metal, Ceramica, Creditos, Tiempo
	public static final int[] NIVEL1 = { 2, 0, 0, 0, 2};
	public static final int[] NIVEL2 = { 7, 0, 0, 0, 16};
	public static final int[] NIVEL3 = { 11, 0, 0, 0, 43};
	public static final int[] NIVEL4 = { 11, 0, 0, 0, 83};
	public static final int[] NIVEL5 = { 11, 0, 0, 0, 134};
	public static final int[] NIVEL6 = { 11, 0, 0, 0, 198};
	public static final int[] NIVEL7 = { 11, 0, 0, 0, 275};
	public static final int[] NIVEL8 = { 11, 0, 0, 0, 364};
	public static final int[] NIVEL9 = { 11, 0, 0, 0, 465};
	public static final int[] NIVEL10 = { 11, 0, 0, 0, 579};
	public static final int[] NIVEL11 = { 11, 0, 0, 0, 705};
	public static final int[] NIVEL12 = { 11, 0, 0, 0, 844};
	public static final int[] NIVEL13 = { 11, 0, 0, 0, 995};
	public static final int[] NIVEL14 = { 11, 0, 0, 0, 1158};
	public static final int[] NIVEL15 = { 11, 0, 0, 0, 1334};
	public static final int[][] COSTS = { NIVEL1, NIVEL2, NIVEL3, NIVEL4, NIVEL5,
										  NIVEL6, NIVEL7, NIVEL8, NIVEL9, NIVEL10,
										  NIVEL11, NIVEL12, NIVEL13, NIVEL14, NIVEL15};
	
	//Establecemos los recursos que generan según su nivel
	private final static int[] RECURSOS_NIVEL1 = {0, 0, 1};
	private final static int[] RECURSOS_NIVEL2 = {0, 0, 4};
	private final static int[] RECURSOS_NIVEL3 = {0, 0, 7};
	private final static int[] RECURSOS_NIVEL4 = {0, 0, 10};
	private final static int[] RECURSOS_NIVEL5 = {0, 0, 13};
	private final static int[] RECURSOS_NIVEL6 = {0, 0, 17};
	private final static int[] RECURSOS_NIVEL7 = {0, 0, 20};
	private final static int[] RECURSOS_NIVEL8 = {0, 0, 23};
	private final static int[] RECURSOS_NIVEL9 = {0, 0, 26};
	private final static int[] RECURSOS_NIVEL10 = {0, 0, 29};
	private final static int[] RECURSOS_NIVEL11 = {0, 0, 32};
	private final static int[] RECURSOS_NIVEL12 = {0, 0, 35};
	private final static int[] RECURSOS_NIVEL13 = {0, 0, 38};
	private final static int[] RECURSOS_NIVEL14 = {0, 0, 41};
	private final static int[] RECURSOS_NIVEL15 = {0, 0, 45};
	private final static int [][] RECURSOS_GENERADOS = {RECURSOS_NIVEL1, RECURSOS_NIVEL2, RECURSOS_NIVEL3, RECURSOS_NIVEL4, RECURSOS_NIVEL5,
														RECURSOS_NIVEL6, RECURSOS_NIVEL7, RECURSOS_NIVEL8, RECURSOS_NIVEL9, RECURSOS_NIVEL10,
														RECURSOS_NIVEL11, RECURSOS_NIVEL12, RECURSOS_NIVEL13, RECURSOS_NIVEL14, RECURSOS_NIVEL15};
	
	private int capacidadRobots;
	private HashMap<Integer, Robot> robots = new HashMap<>();
	private AtomicInteger robotId = new AtomicInteger();
	
	private Player player;
	
	private ObjectMapper mapper = new ObjectMapper();
	
	public Taller(Player player, int x, int y, Edificio depends, int id) {
		
		this.player = player;
		this.id = id;
		this.x = x;
		this.y = y;
		this.height = 2;
		this.width = 1;
		this.level = 0;
		this.buildingDependsOn = depends;
		this.sprite = "taller";	
		this.maxLevel = 15;
	}
	
	public Taller(Player player, int id) {

		this.player = player;
		this.id = id;
		this.x = 0;
		this.y = 0;
		this.height = 2;
		this.width = 1;
		this.level = 0;
		this.buildingDependsOn = null;
		this.sprite = "taller";
		this.maxLevel = 15;
	}
	
	public Player getPlayer() {
		return player;
	}

	public void setPlayer(Player player) {
		this.player = player;
	}

	public int getCapacidadRobots() {
		return capacidadRobots;
	}

	public void setCapacidadRobots(int capacidadRobots) {
		this.capacidadRobots = capacidadRobots;
	}
	
	public int getRobotId() {
		return robotId.get();
	}
	
	public int incrementAndGetRobotId() {
		return robotId.incrementAndGet();
	}

	public void setRobotId(int id) {
		robotId.set(id);
	}
	
	public void mostrarRobots() {
		
	}
	
	public void addRobot(Robot robot) {
		robots.put(robot.getId(), robot);
	}
	
	public Robot getRobot(int id) {
		return robots.get(id);
	}
	
	public Collection<Robot> getRobots() {
		return robots.values();
	}
	
	@Override
	public boolean needsEnergy() {		
		if (!this.isEnConstruccion()) {
			return this.getEnergia() < Taller.COSTS[this.getLevel()-1][0];
		}
		else {
			return false;
		}
	}
	
	public boolean needsColonos() {
		if (this.getLevel() > 0) {
			return this.getColonos() < Taller.RECURSOS_GENERADOS[this.getLevel()-1][2];
		}
		else {
			return false;
		}
	}
	
	@Override
	public String getColonosString() {
		if (this.getLevel() > 0) {
			return this.getColonos() + "/" + Taller.RECURSOS_GENERADOS[this.getLevel()-1][2];
		}

		else {
			return "";
		}
	}
	
	@Override
	public void addEnergy() {
		this.setEnergia(this.getEnergia()+1);
	}
	
	@Override
	public void recolectar() {
		for (Robot r : getRobots()) {
			if (!r.isAusente() && r.getCarga() > 0) {
				r.recolectar();
			}
		}
		ObjectNode msg = mapper.createObjectNode();			
		msg.put("event", "METAL RECOLECTADO");
		msg.put("id", this.getId());
		ArrayNode arrayNodeRobots = mapper.createArrayNode(); // JSON para el cliente
		for (Robot r : this.getRobots()) {
			ObjectNode jsonRobot = mapper.createObjectNode();
			jsonRobot.put("id", r.getId());
			jsonRobot.put("ausente", r.isAusente());					
			jsonRobot.put("nivel", r.getNivel());	
			jsonRobot.put("carga", r.getCarga());	
			arrayNodeRobots.addPOJO(jsonRobot);
		}
		msg.putPOJO("robots", arrayNodeRobots);
		msg.put("metal", player.getMetal());
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
	public int getJobs() {
		if (!this.isEnConstruccion() && this.getLevel() > 0) {
			return Taller.RECURSOS_GENERADOS[this.level-1][2] - this.getColonos();
		}
		else {
			return 0;
		}
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
		task = new Task(this.player, Taller.COSTS[this.getLevel()][4], msg, callback);
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
			Robot r = new RobotEstandar(robotId.incrementAndGet(), this);
			robots.put(r.getId(), r);
			if (this.player.getSession().isOpen()) {
				this.setEnConstruccion(false);
				this.player.getEnergia();
				this.player.saveEdificios();
			} else {
				Player p = WebsocketGameHandler.getPlayers().get(this.player.getId());
				if (p != null) {
					p.getEdificio(this.getId()).setEnConstruccion(false);
					p.getEnergia();
					p.saveEdificios();
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
			else {
				for (Robot r : robots.values()) {
					r.logInUpdate();
				}
			}
			player.saveEdificios();
		}
	}
}
