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

	// Establecemos los costes por cada nivel: Energia, Metal, Ceramica, Creditos
	public static final int[] NIVEL1 = { 0, 0, 0, 0, 5};
	public static final int[] NIVEL2 = { 0, 100, 170, 1000, 5};
	public static final int[] NIVEL3 = { 0, 1000, 1200, 5500, 5};
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
	}
	
	public CentroAdministrativo(int id) {

		this.id = id;
		this.height = 1;
		this.width = 2;
		this.level = 1;
		this.buildingDependsOn = null;
		this.sprite = "centroAdministrativo";
	}

	public void solicitarColonos() {

	}

	public void expandirBase() {

	}
	
	/*@Override
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
		task = new Task(this.player, CentroAdministrativo.COSTS[this.getLevel() - 1][4], msg, callback);
		TASKMASTER.addTask(task);
		this.setEnConstruccion(true);
		this.setBuildingBeginTime(task.getBeginDate());
		return grid;
	}*/

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
}
