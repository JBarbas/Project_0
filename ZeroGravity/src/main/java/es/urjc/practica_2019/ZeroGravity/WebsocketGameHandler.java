package es.urjc.practica_2019.ZeroGravity;

import java.awt.List;
import java.io.IOException;
import java.util.LinkedList;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

import org.bson.BsonDocument;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.google.gson.Gson;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientOptions;
import com.mongodb.ReadPreference;
import com.mongodb.ServerAddress;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import es.urjc.practica_2019.ZeroGravity.Edificios.*;

public class WebsocketGameHandler extends TextWebSocketHandler{
	
	private static final String PLAYER_ATTRIBUTE = "PLAYER";
	private ObjectMapper mapper = new ObjectMapper();
	private AtomicInteger playersId = new AtomicInteger();
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		Player player = new Player(session, playersId.incrementAndGet());
		session.getAttributes().put(PLAYER_ATTRIBUTE, player);
		
		MongoClientOptions options = MongoClientOptions.builder().connectionsPerHost(100).build();
		MongoClient client = new MongoClient(new ServerAddress(), options);

		MongoDatabase db = client.getDatabase("POLARIS").withReadPreference(ReadPreference.secondary());
		MongoCollection<Document> coll = db.getCollection("Users", Document.class); // generic interface
		
		Document dbPlayer = new Document();
		dbPlayer.append("id", player.getId());
		dbPlayer.append("name", "Javi");
		
		//coll.insertOne(dbPlayer);
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
				//users.save(player);
				for (int i = 0; i < grid.length; i++) {
					ArrayNode gridColumn = mapper.createArrayNode();
					for (int j = 0; j < grid[i].length; j++) {						
						gridColumn.add(grid[i][j]);
					}
					playerGrid.addPOJO(gridColumn);
				}
				msg.putPOJO("grid", playerGrid);
				ArrayNode arrayNodeEdificios = mapper.createArrayNode();
				for (Edificio e : player.getEdificios()) {
					ObjectNode jsonEdificio = mapper.createObjectNode();
					jsonEdificio.put("id", e.getId());
					jsonEdificio.put("x", e.getX());
					jsonEdificio.put("y", e.getY());
					jsonEdificio.put("sprite", e.getSprite());
					arrayNodeEdificios.addPOJO(jsonEdificio);
				}
				msg.putPOJO("edificios", arrayNodeEdificios);
				player.getSession().sendMessage(new TextMessage(msg.toString()));
				break;
			case "BUILD":		
				// Construimos el edificio, si se puede
				player.build(node.get("x").asInt(), node.get("y").asInt(), node.get("edificio").asText(), node.get("id").asInt());	
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
				arrayNodeEdificios = mapper.createArrayNode();
				for (Edificio e : player.getEdificios()) {
					ObjectNode jsonEdificio = mapper.createObjectNode();
					jsonEdificio.put("id", e.getId());
					jsonEdificio.put("x", e.getX());
					jsonEdificio.put("y", e.getY());
					jsonEdificio.put("sprite", e.getSprite());
					arrayNodeEdificios.addPOJO(jsonEdificio);
				}
				msg.putPOJO("edificios", arrayNodeEdificios);
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
