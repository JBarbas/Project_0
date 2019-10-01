package es.urjc.practica_2019.ZeroGravity;

import java.io.IOException;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import es.urjc.practica_2019.ZeroGravity.Clases.Edificio;
import es.urjc.practica_2019.ZeroGravity.Clases.Player;

public class WebsocketGameHandler extends TextWebSocketHandler{
	
	private static final String PLAYER_ATTRIBUTE = "PLAYER";

	private ObjectMapper mapper = new ObjectMapper();
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		Player player = new Player(session);
		session.getAttributes().put(PLAYER_ATTRIBUTE, player);
		
		ObjectNode msg = mapper.createObjectNode();
		msg.put("event", "TEST");
		player.getSession().sendMessage(new TextMessage(msg.toString()));
	}
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {		
		try {
			JsonNode node = mapper.readTree(message.getPayload());
			ObjectNode msg = mapper.createObjectNode();
			Player player = (Player) session.getAttributes().get(PLAYER_ATTRIBUTE);
			
			switch (node.get("event").asText()) {
			case "LOG IN":
				msg.put("event", "LOGGED");
				player.getSession().sendMessage(new TextMessage(msg.toString()));
				break;
			case "ASK PLAYER INFO":
				msg.put("event", "PLAYER INFO");
				ArrayNode playerGrid = mapper.createArrayNode();
				int[][] grid = player.getGrid();
				for (int i = 0; i < grid.length; i++) {
					ArrayNode gridColumn = mapper.createArrayNode();
					for (int j = 0; j < grid[i].length; j++) {						
						gridColumn.add(grid[i][j]);
					}
					playerGrid.addPOJO(gridColumn);
				}
				msg.putPOJO("grid", playerGrid);
				ObjectNode idMap = mapper.createObjectNode();
				for (Edificio e : player.getEdificios()) {
					idMap.put(Integer.toString(e.getX()) + Integer.toString(e.getY()), e.getId());
				}
				msg.putPOJO("idMap", idMap);
				player.getSession().sendMessage(new TextMessage(msg.toString()));
				break;
			case "BUILD":		
				// Construimos el edificio, si se puede
				player.build(node.get("i").asInt(), node.get("j").asInt(), node.get("edificio").asText(), node.get("id").asInt());	
				// Pedimos al cliente que refresque el grid con la nueva info
				msg.put("event", "REFRESH GRID");
				ArrayNode newGrid = mapper.createArrayNode();
				grid = player.getGrid();
				for (int i = 0; i < grid.length; i++) {
					ArrayNode gridColumn = mapper.createArrayNode();
					for (int j = 0; j < grid[i].length; j++) {
						gridColumn.add(grid[i][j]);
					}
					newGrid.addPOJO(gridColumn);
				}
				msg.putPOJO("grid", newGrid);
				ObjectNode newIdMap = mapper.createObjectNode();
				for (Edificio e : player.getEdificios()) {
					newIdMap.put(Integer.toString(e.getX()) + Integer.toString(e.getY()), e.getId());
				}
				msg.putPOJO("idMap", newIdMap);
				player.getSession().sendMessage(new TextMessage(msg.toString()));
				break;
			default:
				break;
			}

		} catch (Exception e) {
			System.err.println("Exception processing message " + message.getPayload());
			e.printStackTrace(System.err);
		}
	}
}
