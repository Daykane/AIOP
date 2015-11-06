package main.java.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="User")
public class User {
	
	@Id
	@GeneratedValue
	@NotNull
	@Column(name = "id")
	private long id;
	@Column(name = "password")
	private String password;
	@Column(name = "lastName")
	private String lastName;
	@Column(name = "firstName")
	private String firstName;
	@Column(name = "adr1")
	private String adr1;
	@Column(name = "adr2")
	private String adr2;
	@Column(name = "pC")
	private String pC;
	@Column(name = "town")
	private String town;
	@Column(name = "phone")
	private String phone;
	@Column(name = "mail")
	private String mail;
	
	
	public User() {		
	}
	
	public User(String password, String mail) {
		super();
		this.password = password;
		this.mail = mail;
	}

	public User(long id, String password, String lastName, String firstName, String adr1, String adr2, String pC,
			String town, String phone, String mail) {
		super();
		this.id = id;
		this.password = password;
		this.lastName = lastName;
		this.firstName = firstName;
		this.adr1 = adr1;
		this.adr2 = adr2;
		this.pC = pC;
		this.town = town;
		this.phone = phone;
		this.mail = mail;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getAdr1() {
		return adr1;
	}

	public void setAdr1(String adr1) {
		this.adr1 = adr1;
	}

	public String getAdr2() {
		return adr2;
	}

	public void setAdr2(String adr2) {
		this.adr2 = adr2;
	}

	public String getpC() {
		return pC;
	}

	public void setpC(String pC) {
		this.pC = pC;
	}

	public String getTown() {
		return town;
	}

	public void setTown(String town) {
		this.town = town;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}
	
	
}
