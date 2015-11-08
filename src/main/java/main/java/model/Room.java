package main.java.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="Room")

public class Room {

	@Id
	@GeneratedValue
	@NotNull
	@Column(name = "id_room")
	private long id_room;
	@Column(name = "room_name")
	private String room_name;
	@Column(name = "room_superficy")
	private double romm_superficy;
	
	
	public Room() {
		super();
	}


	public Room(long id_room, String room_name, double romm_superficy) {
		super();
		this.id_room = id_room;
		this.room_name = room_name;
		this.romm_superficy = romm_superficy;
	}


	public long getId_room() {
		return id_room;
	}


	public void setId_room(long id_room) {
		this.id_room = id_room;
	}


	public String getRoom_name() {
		return room_name;
	}


	public void setRoom_name(String room_name) {
		this.room_name = room_name;
	}


	public double getRomm_superficy() {
		return romm_superficy;
	}


	public void setRomm_superficy(double romm_superficy) {
		this.romm_superficy = romm_superficy;
	}
	
	
	
}
