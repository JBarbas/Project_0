package es.urjc.practica_2019.ZeroGravity;

import java.awt.List;
import java.io.IOException;
import java.util.Collection;
import java.util.LinkedList;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

import org.bson.BsonDocument;
import org.bson.Document;
import org.bson.conversions.Bson;
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
	
	private MongoClientOptions options = MongoClientOptions.builder().connectionsPerHost(100).build();
	private MongoClient client = new MongoClient(new ServerAddress(), options);

	private MongoDatabase db = client.getDatabase("POLARIS").withReadPreference(ReadPreference.secondary());
	private MongoCollection<Document> coll = db.getCollection("Users", Document.class);
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		Player player = new Player(session, ObjectId.get());
		session.getAttributes().put(PLAYER_ATTRIBUTE, player);
	}
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {		
		try {
			JsonNode node = mapper.readTree(message.getPayload());
			ObjectNode msg = mapper.createObjectNode();
			Player player = (Player) session.getAttributes().get(PLAYER_ATTRIBUTE);
			
			switch (node.get("event").asText()) {
			case "LOG IN":
				player.setUsername(node.get("name").asText());
				player.setPassword(node.get("password").asText());
				Bson filter = new Document("name", player.getUsername()).append("password", player.getPassword());
				Document myPlayer = coll.find(filter).first();
				if (myPlayer != null) {
					player.setId(myPlayer.getObjectId("_id"));
					player.updateGrid((Collection<Document>) myPlayer.get("grid"));
					player.setEdificioId(myPlayer.getInteger("edificioId", 0));
					player.updateEdificios((Collection<Document>) myPlayer.get("edificios"));
					msg.put("event", "LOGGED");
					player.getSession().sendMessage(new TextMessage(msg.toString()));
				}
				break;
			case "REGISTER":
				player.setUsername(node.get("name").asText());
				player.setEmail(node.get("email").asText());
				player.setPassword(node.get("password").asText());
				Document dbPlayer = new Document();
				dbPlayer.append("_id", player.getId());
				dbPlayer.append("name", player.getUsername());			
				dbPlayer.append("email", player.getEmail());		
				dbPlayer.append("password", player.getPassword());		
				coll.insertOne(dbPlayer);				
				msg.put("event", "LOGGED");
				player.getSession().sendMessage(new TextMessage(msg.toString()));
				break;
			case "ASK PLAYER INFO":
				updateInfo(player, "PLAYER INFO");
				break;
			case "BUILD":		
				// Construimos el edificio, si se puede
				player.build(node.get("x").asInt(), node.get("y").asInt(), node.get("edificio").asText(), node.get("id").asInt());	
				// Pedimos al cliente que refresque el grid con la nueva info
				updateInfo(player, "REFRESH GRID");
				break;
			default:
				break;
			}

		} catch (Exception e) {
			System.err.println("Exception processing message " + message.getPayload());
			e.printStackTrace(System.err);
		}
	}
	
	// Informa al cliente y a la BDD de una actualizacion en la informacion del jugador (Grid y edificios)
	private void updateInfo(Player player, String event) {
		ObjectNode msg = mapper.createObjectNode();
		try {
			msg.put("event", event);
			ArrayNode playerGrid = mapper.createArrayNode(); // JSON para el cliente
			LinkedList<Document> dbGrid = new LinkedList<>(); // Bson para MongoDB
			int[][] grid = player.getGrid();
			for (int i = 0; i < grid.length; i++) {
				ArrayNode gridColumn = mapper.createArrayNode();
				Document dbGridColumn = new Document();
				for (int j = 0; j < grid[i].length; j++) {						
					gridColumn.add(grid[i][j]);
					dbGridColumn.append(Integer.toString(j), grid[i][j]);
				}
				playerGrid.addPOJO(gridColumn);
				dbGrid.add(dbGridColumn);
			}
			msg.putPOJO("grid", playerGrid);
			ArrayNode arrayNodeEdificios = mapper.createArrayNode(); // JSON para el cliente
			LinkedList<Document> dbEdificios = new LinkedList<>(); // Bson para MongoDB
			for (Edificio e : player.getEdificios()) {
				// JSON para el cliente
				ObjectNode jsonEdificio = mapper.createObjectNode();
				jsonEdificio.put("id", e.getId());
				jsonEdificio.put("x", e.getX());
				jsonEdificio.put("y", e.getY());
				jsonEdificio.put("sprite", e.getSprite());
				arrayNodeEdificios.addPOJO(jsonEdificio);
				
				// Bson para MongoDB
				Document dbEdificio = new Document();
				dbEdificio.append("id", e.getId());
				dbEdificio.append("x", e.getX());
				dbEdificio.append("y", e.getY());
				dbEdificio.append("sprite", e.getSprite());
				dbEdificios.add(dbEdificio);
			}
			msg.putPOJO("edificios", arrayNodeEdificios);
			// Enviamos el mensaje al cliente
			player.getSession().sendMessage(new TextMessage(msg.toString()));
			// Actualizamos la info en la BDD
			coll.updateOne(new Document("_id", player.getId()), new Document("$set", 
					new Document("grid", dbGrid)
					.append("edificios", dbEdificios)
					.append("edificioId", player.getEdificioId())));
		} catch (Exception e) {
			System.err.println("Exception sending message " + msg.toString());
			e.printStackTrace(System.err);
		}
	}
}
