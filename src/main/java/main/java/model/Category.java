package main.java.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="Category")

public class Category {
	
	@Id
	@GeneratedValue
	@NotNull
	@Column(name = "id_category")
	private long id_category;
	@Column(name = "category_name")
	private String category_name;
	@Column(name = "category_description")
	private String category_description;
	@Column(name = "validation_date")
	private Date validation_date;
	
	
	public Category() {
		super();
	}


	public Category(long id_category, String category_name, String category_description, Date validation_date) {
		super();
		this.id_category = id_category;
		this.category_name = category_name;
		this.category_description = category_description;
		this.validation_date = validation_date;
	}


	public long getId_category() {
		return id_category;
	}


	public void setId_category(long id_category) {
		this.id_category = id_category;
	}


	public String getCategory_name() {
		return category_name;
	}


	public void setCategory_name(String category_name) {
		this.category_name = category_name;
	}


	public String getCategory_description() {
		return category_description;
	}


	public void setCategory_description(String category_description) {
		this.category_description = category_description;
	}


	public Date getValidation_date() {
		return validation_date;
	}


	public void setValidation_date(Date validation_date) {
		this.validation_date = validation_date;
	}
	
	
	

}
