package es.urjc.practica_2019.ZeroGravity.Edificios;

import java.io.IOException;

import org.springframework.web.socket.TextMessage;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import es.urjc.practica_2019.ZeroGravity.Player;
import es.urjc.practica_2019.ZeroGravity.Task;
import es.urjc.practica_2019.ZeroGravity.TaskMaster;
import es.urjc.practica_2019.ZeroGravity.WebsocketGameHandler;

public class CentroAdministrativo extends Edificio {
	
	private static final TaskMaster TASKMASTER = TaskMaster.INSTANCE;

	// Establecemos los costes por cada nivel: Energia, Metal, Ceramica, Creditos, tiempo
	public static final int[] NIVEL1 = { 0, 0, 0, 0, 2};
	public static final int[] NIVEL2 = { 0, 0, 0, 0, 0};
	public static final int[] NIVEL3 = { 0, 0, 0, 0, 0};
	public static final int[][] COSTS = { NIVEL1, NIVEL2, NIVEL3};
	
	private ObjectMapper mapper = new ObjectMapper();

	public CentroAdministrativo(Player player, int x, int y, Edificio depends, int id) {

		this.player = player;
		this.x = x;
		this.y = y;
		this.id = id;
		this.height = 1;
		this.width = 2;
		this.level = 1;
		this.buildingDependsOn = depends;
		this.sprite = "centroAdministrativo";
		this.maxLevel = 1;
	}
	
	public CentroAdministrativo(int id) {

		this.id = id;
		this.height = 1;
		this.width = 2;
		this.level = 1;
		this.buildingDependsOn = null;
		this.sprite = "centroAdministrativo";
		this.maxLevel = 1;
	}

	public void solicitarColonos() {

	}

	public void expandirBase() {

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
		msg.put("level", 1);
		Task task = null;
		Thread callback = new Thread(() -> this.callbackConstruir());
		callback.start();
		task = new Task(this.player, CentroAdministrativo.COSTS[this.getLevel() - 1][4], msg, callback);
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
			System.out.println("Generador " + id + " construido");
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
	public void logInUpdate() {
		if (player.getSession() != null) {
			if (this.enConstruccion) {
				ObjectNode msg = mapper.createObjectNode();
				msg.put("event", "EDIFICIO CONSTRUIDO");
				msg.put("level", 1);
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
				task = new Task(this.player, CentroAdministrativo.COSTS[this.getLevel() - 1][4], msg, callback);
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
