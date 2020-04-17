package es.urjc.practica_2019.ZeroGravity.Mailing;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

import javax.mail.Quota.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;

import es.urjc.practica_2019.ZeroGravity.EmailService;
import es.urjc.practica_2019.ZeroGravity.MailContentBuilder;


//Patron Singleton utilizado
@Controller
public class RecoverPasswordHandler {

	//private static RecoverPasswordHandler recoverpasswordhandeler; 
	private Executor executor;
	private String from , subject, layout;
	private HashMap<String,String> fixedContentAtributes;
	private HashMap<String, org.springframework.core.io.Resource> fixedResourcesEmbebed;
	
	/*
	 public  static RecoverPasswordHandler getRecoverPassword() {
		 if (recoverpasswordhandeler==null) {
			 recoverpasswordhandeler=new RecoverPasswordHandler();
		 }
		 return recoverpasswordhandeler;
		 }
	*/
	
	@Autowired
	private RecoverPasswordHandler(){
		this.executor = Executors.newFixedThreadPool(10);
		this.from = "zerogravity@exampleEmail.com"; //Aqui se debe aportar el email de zero gravity (aunque quiza mejor leerlo de algun archivo)
		this.subject = "Este es un ejemplo de asunto";//Aqui lo mismmo que arriba pero con el asunto.	
		this.layout = "EmailRecover";//Nombre del archivo que sirve de plantilla en la carpeta resources/templates
		this.fixedContentAtributes = new HashMap<String,String>();
		this.fixedResourcesEmbebed = new HashMap<String,org.springframework.core.io.Resource>();
		
		//Añadimos los atributos fijos de este tipo de mensajes, principalmente imagenes
		fixedContentAtributes.put("logo", "logo");
		fixedContentAtributes.put("cabecera", "cabecera");
		fixedContentAtributes.put("twitter", "twitter");
		fixedContentAtributes.put("youtube", "youtube");
		fixedContentAtributes.put("instagram", "instagram");
		fixedContentAtributes.put("mail", "mail");
		
		//Añadimos la referencia a los archivos(resources)
		fixedResourcesEmbebed.put("logo",new ClassPathResource("mailing/images/logo.png"));
		fixedResourcesEmbebed.put("cabecera",new ClassPathResource("mailing/images/cabecera.png"));
		fixedResourcesEmbebed.put("twitter",new ClassPathResource("mailing/images/twitter-circle-colored.png"));
		fixedResourcesEmbebed.put("youtube",new ClassPathResource("mailing/images/youtube-circle-colored.png"));
		fixedResourcesEmbebed.put("instagram",new ClassPathResource("mailing/images/instagram-circle-colored.png"));
		fixedResourcesEmbebed.put("mail",new ClassPathResource("mailing/images/mail-circle-colored.png"));
		
	}
		 
	@Autowired
    private EmailService emailService;
	
	public void execute(String to) {
		executor.execute(()->RecoverPassword(to));
	}
	
	private void RecoverPassword(String to) {
		HashMap<String,String> auxHashmap =  new HashMap<String, String>(fixedContentAtributes);
		String content = MailContentBuilder.build(auxHashmap,layout);
		emailService.prepareAndSend(to,from, subject,content,fixedResourcesEmbebed);
	}
}
