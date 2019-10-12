package es.urjc.practica_2019.ZeroGravity;

import java.time.LocalDateTime;

import com.fasterxml.jackson.databind.node.ObjectNode;

public class Task {

		private int id;
		private Player player;
		private LocalDateTime beginDate;
		private int duration;
		private ObjectNode msg;
		private Thread callback;
		
		public Task(Player player, int duration, ObjectNode msg) {
			super();			
			this.beginDate = LocalDateTime.now();
			this.player = player;
			this.duration = duration;
			this.msg = msg;
		}
		
		public Task(Player player, int duration, ObjectNode msg, Thread callback) {
			super();			
			this.beginDate = LocalDateTime.now();
			this.player = player;
			this.duration = duration;
			this.msg = msg;
			this.callback = callback;
		}

		public int getId() {
			return id;
		}

		public void setId(int id) {
			this.id = id;
		}

		public LocalDateTime getBeginDate() {
			return beginDate;
		}

		public int getDuration() {
			return duration;
		}

		public Player getPlayer() {
			return player;
		}

		public ObjectNode getMsg() {
			return msg;
		}

		public Thread getCallback() {
			return callback;
		}
		
}
