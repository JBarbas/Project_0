package es.urjc.practica_2019.ZeroGravity.Mailing;

import java.util.HashMap;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Controller;

import es.urjc.practica_2019.ZeroGravity.EmailService;

@Controller
public class MailingHandler {

	protected Executor executor;
	protected String from , subject, layout;
	protected HashMap<String,String> fixedContentAtributes;
	protected HashMap<String, org.springframework.core.io.Resource> fixedResourcesEmbebed;
	
	@Autowired
    protected EmailService emailService;
	
	public MailingHandler() {
		this.executor = Executors.newFixedThreadPool(10);
		this.from = "zerogravity@noreply.com"; //Aqui se debe aportar el email de zero gravity (aunque quiza mejor leerlo de algun archivo)
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
	
	public void execute() {
		
	}
}
