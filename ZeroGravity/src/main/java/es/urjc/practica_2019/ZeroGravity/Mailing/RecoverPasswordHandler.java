package es.urjc.practica_2019.ZeroGravity.Mailing;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.HashMap;
import java.util.Random;
import java.util.concurrent.Executors;

import org.bson.Document;
import org.bson.conversions.Bson;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Controller;

import com.mongodb.client.MongoCollection;

import es.urjc.practica_2019.ZeroGravity.MailContentBuilder;
import es.urjc.practica_2019.ZeroGravity.WebsocketGameHandler;


@Controller
public class RecoverPasswordHandler extends MailingHandler{
	
	@Autowired
	private RecoverPasswordHandler(){
		super();
		this.subject = "Password Recovery";//Aqui lo mismmo que arriba pero con el asunto.	
		this.layout = "PasswordRecover";//Nombre del archivo que sirve de plantilla en la carpeta resources/templates	
	}
		 
	public void execute(String to) {
		executor.execute(()->recoverPassword(to));
	}
	
	private void recoverPassword(String to) {
		//Generamos una contraseña
		String newPassword = generatePassword();
		
		//Ciframos la contraseña
		byte [] passwordBytes = cifratePassword(newPassword);
		
		//Cambiamos el valor en base de datos
		MongoCollection<Document> mongoCollection = WebsocketGameHandler.getColl();
		Bson filterEmail = new Document("email", to);
		Document myPlayerEmail = mongoCollection.find(filterEmail).first();
		ObjectId objectId = myPlayerEmail.getObjectId("_id");
		mongoCollection.updateOne(new Document("_id", objectId), 
                new Document("$set", new Document("password", passwordBytes)));
		
		//Añadimos la contraseña al mensaje y lo mandamos
		HashMap<String,String> auxHashmap =  new HashMap<String, String>(fixedContentAtributes);
		auxHashmap.put("pass", newPassword);
		String content = MailContentBuilder.build(auxHashmap,layout);
		emailService.prepareAndSend(to,from, subject,content,fixedResourcesEmbebed);
	}
	
	private String generatePassword() {
		String password = null;
		try {
		String[] symbols = {"0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"};
		int length = 10;
		Random random;
		random = SecureRandom.getInstanceStrong();
		StringBuilder sb = new StringBuilder(length);
		for (int i = 0; i < length; i++) {
		    int indexRandom = random.nextInt( symbols.length );
		    sb.append( symbols[indexRandom] );
		}
		password = sb.toString();
		} catch (NoSuchAlgorithmException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} // as of JDK 8, this should return the strongest algorithm available to the JVM
		return password;
	}
	
	private byte [] cifratePassword(String password) {
		byte [] passwordBytes = password.getBytes();
		try {
			passwordBytes = MessageDigest.getInstance("MD5").digest(passwordBytes);
		} catch (NoSuchAlgorithmException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return passwordBytes;
	}
}
