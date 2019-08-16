package com.revature.models;

import org.springframework.beans.factory.annotation.Autowired;

public class ProductCountWrapper {
	  private Product product;
	  private long count;
	public ProductCountWrapper(Product product, long count) {
		super();
		this.product = product;
		this.count = count;
	}
	public Product getProduct() {
		return product;
	}
	public void setProduct(Product product) {
		this.product = product;
	}
	public long getCount() {
		return count;
	}
	public void setCount(long count) {
		this.count = count;
	}
	  
}
