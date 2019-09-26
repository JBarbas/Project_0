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

import es.urjc.practica_2019.ZeroGravity.Clases.Player;

public class WebsocketGameHandler extends TextWebSocketHandler{

	private ObjectMapper mapper = new ObjectMapper();
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		Player player = new Player(session);
		
		ObjectNode msg = mapper.createObjectNode();
		msg.put("event", "TEST");
		player.getSession().sendMessage(new TextMessage(msg.toString()));
	}
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		
		try {
			JsonNode node = mapper.readTree(message.getPayload());
			ObjectNode msg = mapper.createObjectNode();
			Player player = new Player(session);
			
			switch (node.get("event").asText()) {
			
			case "TEST":
				msg.put("event", "TEST");
				msg.put("mensaje", "Pa ti mi cola");
				player.getSession().sendMessage(new TextMessage(msg.toString()));
				break;
			
			case "HOLA":
				System.out.println("HOLA recibido por el servidor");
				msg.put("event", "HOLA");
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