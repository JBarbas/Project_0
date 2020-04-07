package es.urjc.practica_2019.ZeroGravity;

public class Config {
	
	private int volMusic;
	private int volEffects;
	private String lang;
	
	public Config() {
		volMusic = 100;
		volEffects = 100;
		lang = "eng";
	}
	
	public int getVolMusic() {
		return volMusic;
	}
	public void setVolMusic(int volMusic) {
		this.volMusic = volMusic;
	}
	public int getVolEffects() {
		return volEffects;
	}
	public void setVolEffects(int volEffects) {
		this.volEffects = volEffects;
	}
	public String getLang() {
		return lang;
	}
	public void setLang(String lang) {
		this.lang = lang;
	}

}
