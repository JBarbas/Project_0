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
	public static final int[] NIVEL1 = { 0, 120, 200, 1600, 2};
	public static final int[] NIVEL2 = { 0, 800, 1200, 8500, 2};
	public static final int[] NIVEL3 = { 0, 7000, 12000, 35000, 2};
	public static final int[][] COSTS = { NIVEL1, NIVEL2, NIVEL3 };

	// Establecemos los recursos que generan según su nivel
	private final static int[] RECURSOS_NIVEL1 = { 5, 0, 1 };
	private final static int[] RECURSOS_NIVEL2 = { 12, 0, 2 };
	private final static int[] RECURSOS_NIVEL3 = { 16, 0, 3 };
	private final static int[][] RECURSOS_GENERADOS = { RECURSOS_NIVEL1, RECURSOS_NIVEL2, RECURSOS_NIVEL3 };

	private ObjectMapper mapper = new ObjectMapper();

	public Generador(Player player, int x, int y, Edificio depends, int id) {

		this.player = player;
		this.id = id;
		this.x = x;
		this.y = y;
		this.height = 1;
		this.width = 1;
		this.level = 1;
		this.buildingDependsOn = depends;
		this.sprite = "generador";

	}

	public Generador(int id) {

		this.id = id;
		this.height = 1;
		this.width = 1;
		this.level = 1;
		this.buildingDependsOn = null;
		this.sprite = "generador";

	}

	@Override
	public String getColonosString() {
		return this.getColonos() + "/" + this.RECURSOS_GENERADOS[this.level - 1][2];
	}

	public int getEnergy() {
		return this.getColonos() * this.RECURSOS_GENERADOS[this.level - 1][0]
				/ this.RECURSOS_GENERADOS[this.level - 1][2];
	}

	@Override
	public int getJobs() {
		if (!this.isEnConstruccion()) {
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
		try {
			if (player.getSession().isOpen()) {
				player.getSession().sendMessage(new TextMessage(msg.toString()));
			}
		} catch (IOException e) {
			System.err.println("Exception sending message " + msg.toString());
			e.printStackTrace(System.err);
		}
		msg.put("event", "EDIFICIO CONSTRUIDO");
		Task task = null;
		Thread callback = new Thread(() -> this.callbackConstruir());
		callback.start();
		task = new Task(this.player, Generador.COSTS[this.getLevel() - 1][4], msg, callback);
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
		if (this.enConstruccion) {
			ObjectNode msg = mapper.createObjectNode();
			msg.put("event", "EDIFICIO CONSTRUIDO");
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
			task = new Task(this.player, BloqueViviendas.COSTS[this.getLevel() - 1][4], msg, callback);
			task.setId(player.getId().toString() + this.id + 0); //Identificador global, la ultima cifra depende de si va a construir (0) o a producir (1)
			task.setBeginDate(buildingBeginTime);
			if (TASKMASTER.addTask(task)) {
				callback.start();
			}
		}
		player.saveEdificios();
	}
}
