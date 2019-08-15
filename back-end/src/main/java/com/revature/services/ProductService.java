package com.revature.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import com.revature.models.Job;
import com.revature.models.Product;
import com.revature.utils.Utils;

@Service
public class ProductService {
	ProductRepository productRepository;

	@Autowired
	public ProductService(ProductRepository productRepository) {
		super();
		this.productRepository = productRepository;
	}
	public Product createProduct(Product product) {
		// Business Logic
		// Ensuring the user has the privileges to create this thing
		// Ensuring that the values passed are valid
		System.out.println("PRODUCT CREATED WITH PID: " + product.getProductId());
		return productRepository.save(product);
	}
	public Page<Product> selectAllProducts(Pageable pageable) {
		System.out.println("ALL PRODUCTS SELECTED");
		return productRepository.findAll(pageable);
	}
	public Product selectProductById(int id) {
		System.out.println("PRODUCT SELECTED WITH PID: " + id);
		return productRepository.findById(id).orElseThrow(() -> 
		new HttpClientErrorException(HttpStatus.NOT_FOUND));
	}
	public Product updateProduct(int id, Product product) {
		System.out.println("PRODUCT UPDATED WITH PARAMS: " + product.toString());
		Product oldProduct = productRepository.findById(id).orElseThrow(() ->
		new HttpClientErrorException(HttpStatus.NOT_FOUND));
		Product newProduct = (Product) Utils.merge(oldProduct, product);
		//Save the product
		return productRepository.save(newProduct);
		//Retrieve it again to show joined values correctly
		//return productRepository.findById(id).orElseThrow(() ->
		//new HttpClientErrorException(HttpStatus.NOT_FOUND));
	}
	public String deleteProduct(int id) {
		System.out.println("PRODUCT DELETED WITH PID: " + id);
		if(productRepository.existsById(id)) {
			productRepository.deleteById(id);
			return "DELETED PRODUCT WITH PID: " + id;
		} else {
			throw new HttpClientErrorException(HttpStatus.NOT_FOUND);
		}
	}
	public Page<Product> performSearch(Specification<Product> spec, Pageable pageable) {
		return productRepository.findAll(spec, pageable);
	}


}
