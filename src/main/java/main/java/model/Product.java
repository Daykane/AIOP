package main.java.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="Product")

public class Product {

	@Id
	@GeneratedValue
	@NotNull
	@Column(name = "product_id")
	private long product_id;
	@Column(name = "product_name")
	private String product_name;
	@Column(name = "product_description")
	private String product_description;
	@Column(name = "product_quantity")
	private int product_quantity;
	@Column(name = "member_reduction")
	private double member_reduction;
	
	public Product(){
	}
	
	public Product(long product_id, String product_name, String product_description, int product_quantity, double member_reduction){
		this.product_id = product_id;
		this.product_name = product_name;
		this.product_description = product_description; 
		this.product_quantity = product_quantity;
		this.member_reduction = member_reduction; 
	}

	public long getProduct_id() {
		return product_id;
	}

	public void setProduct_id(long product_id) {
		this.product_id = product_id;
	}

	public String getActivity_name() {
		return activity_name;
	}

	public void setActivity_name(String activity_name) {
		this.activity_name = activity_name;
	}

	public String getProduct_description() {
		return product_description;
	}

	public void setProduct_description(String product_description) {
		this.product_description = product_description;
	}

	public int getProduct_quantity() {
		return product_quantity;
	}

	public void setProduct_quantity(int product_quantity) {
		this.product_quantity = product_quantity;
	}

	public double getMember_reduction() {
		return member_reduction;
	}

	public void setMember_reduction(double member_reduction) {
		this.member_reduction = member_reduction;
	}

	


}
