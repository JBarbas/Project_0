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
import es.urjc.practica_2019.ZeroGravity.Robots.Robot;
import es.urjc.practica_2019.ZeroGravity.Robots.RobotEstandar;

public class Taller extends GeneradorRecursos{

	// Establecemos los costes por cada nivel: Energia, Metal, Ceramica, Creditos
	public static final int[] NIVEL1 = { 1, 0, 0, 0 };
	public static final int[] NIVEL2 = { 2, 0, 0, 0 };
	public static final int[] NIVEL3 = { 3, 0, 0, 0 };
	public static final int[][] COSTS = { NIVEL1, NIVEL2, NIVEL3};
	
	//Establecemos los recursos que generan según su nivel
	private final static int[] RECURSOS_NIVEL1 = {0, 0, 1};
	private final static int[] RECURSOS_NIVEL2 = {0, 0, 2};
	private final static int[] RECURSOS_NIVEL3 = {0, 0, 3};
	private final static int [][] RECURSOS_GENERADOS = {RECURSOS_NIVEL1, RECURSOS_NIVEL2, RECURSOS_NIVEL3};
	
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
		this.level = 1;
		this.buildingDependsOn = depends;
		this.sprite = "taller";	
	}
	
	public Taller(Player player, int id) {

		this.player = player;
		this.id = id;
		this.x = 0;
		this.y = 0;
		this.height = 2;
		this.width = 1;
		this.level = 1;
		this.buildingDependsOn = null;
		this.sprite = "taller";
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
		return this.getEnergia() < Taller.COSTS[this.level-1][0];
	}
	
	public boolean needsColonos() {
		return this.getColonos() < Taller.RECURSOS_GENERADOS[this.getLevel()-1][2];
	}
	
	@Override
	public String getColonosString() {
		return this.getColonos() + "/" + Taller.RECURSOS_GENERADOS[this.getLevel()-1][2];
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
		return Taller.RECURSOS_GENERADOS[this.level-1][2] - this.getColonos();
	}
	
	@Override
	public void levelUp() {
		this.setLevel(this.getLevel() + 1);
		Robot r = new RobotEstandar(robotId.incrementAndGet(), this);
		robots.put(r.getId(), r);
		ObjectNode msg = mapper.createObjectNode();			
		msg.put("event", "REFRESH MENU");
		msg.put("id", this.getId());
		try {	
			if (player.getSession().isOpen()) {				
				player.getSession().sendMessage(new TextMessage(msg.toString()));
			}
		} catch (IOException e) {
			System.err.println("Exception sending message " + msg.toString());
			e.printStackTrace(System.err);
		}
	}
}
