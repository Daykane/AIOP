package main.java.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="Activity")

public class Activity {
	
	@Id
	@GeneratedValue
	@NotNull
	@Column(name = "id_activity")
	private long id_activity;
	@Column(name = "activity_name")
	private String activity_name;
	@Column(name = "activity_short_desc")
	private String activity_short_desc;
	@Column(name = "activity_long_desc")
	private String activity_long_desc;
	
	public Activity(){
		
	}
	
	public Activity(long id_activity, String activity_name, String activity_short_desc, String activity_long_desc) {
		super();
		this.id_activity = id_activity;
		this.activity_name = activity_name;
		this.activity_short_desc = activity_short_desc;
		this.activity_long_desc = activity_long_desc;
	}

	public long getId_activity() {
		return id_activity;
	}

	public void setId_activity(long id_activity) {
		this.id_activity = id_activity;
	}

	public String getActivity_name() {
		return activity_name;
	}

	public void setActivity_name(String activity_name) {
		this.activity_name = activity_name;
	}

	public String getActivity_short_desc() {
		return activity_short_desc;
	}

	public void setActivity_short_desc(String activity_short_desc) {
		this.activity_short_desc = activity_short_desc;
	}

	public String getActivity_long_desc() {
		return activity_long_desc;
	}

	public void setActivity_long_desc(String activity_long_desc) {
		this.activity_long_desc = activity_long_desc;
	}
	
	
	

}
