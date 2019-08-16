package com.revature.models;

import java.util.List;

public class ProductAddressCountWrapper {
	private Product product;
	private long count;
	private String address;
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
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public ProductAddressCountWrapper(Product product, long count, String address) {
		super();
		this.product = product;
		this.count = count;
		this.address = address;
	}
	@Override
	public String toString() {
		return "ProductAddressCountWrapper [product=" + product + ", count=" + count + ", address=" + address + "]";
	}

	
}
