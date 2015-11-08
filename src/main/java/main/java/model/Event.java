package main.java.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="Event")

public class Event {

	@Id
	@GeneratedValue
	@NotNull
	@Column(name = "id_event")
	private long id_even;
	@Column(name = "event_name")
	private String event_name;
	@Column(name = "event_duration_hours")
	private String event_duration_hours;
	@Column(name = "event_price")
	private Double event_price;
	@Column(name = "event_max_numbers")
	private int event_max_numbers;


	public Event() {
		super();
	}


	public Event(long id_even, String event_name, String event_duration_hours, Double event_price,
			int event_max_numbers) {
		super();
		this.id_even = id_even;
		this.event_name = event_name;
		this.event_duration_hours = event_duration_hours;
		this.event_price = event_price;
		this.event_max_numbers = event_max_numbers;
	}


	public long getId_even() {
		return id_even;
	}


	public void setId_even(long id_even) {
		this.id_even = id_even;
	}


	public String getEvent_name() {
		return event_name;
	}


	public void setEvent_name(String event_name) {
		this.event_name = event_name;
	}


	public String getEvent_duration_hours() {
		return event_duration_hours;
	}


	public void setEvent_duration_hours(String event_duration_hours) {
		this.event_duration_hours = event_duration_hours;
	}


	public Double getEvent_price() {
		return event_price;
	}


	public void setEvent_price(Double event_price) {
		this.event_price = event_price;
	}


	public int getEvent_max_numbers() {
		return event_max_numbers;
	}


	public void setEvent_max_numbers(int event_max_numbers) {
		this.event_max_numbers = event_max_numbers;
	}





}
