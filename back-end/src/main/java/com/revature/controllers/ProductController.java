package com.revature.controllers;
import java.sql.SQLException;
import java.util.List;

import javax.validation.ConstraintViolationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.revature.models.Product;
import com.revature.services.ProductService;

@RestController
@RequestMapping("products")
@CrossOrigin(allowedHeaders = "*", methods = {RequestMethod.POST,RequestMethod.GET,RequestMethod.PATCH,RequestMethod.DELETE})
public class ProductController {
	ProductService productService;
	@Autowired
	public ProductController(ProductService productService) {
		this.productService = productService;
	}
	@PostMapping("")
	public  Product createProduct(@RequestBody Product product) {
		Product newProduct = productService.createProduct(product);
		return newProduct;
	}
	@GetMapping("")
	public Page<Product> getAllProducts(Pageable pageable) {
		Page<Product> productList = productService.selectAllProducts(pageable);
		return productList;
	}
	@GetMapping("/{id}")
	public Product getProductById(@PathVariable int id) {
		Product product = productService.selectProductById(id);
		return product;
	}
	@PatchMapping("")
	public  Product updateProduct(@RequestBody Product product) {
		Product updatedProduct = productService.updateProduct(product.getProductId(), product);
		return updatedProduct;
	}
	@DeleteMapping("/{id}")
	public String deleteProductById(@PathVariable int id) {
		String result = productService.deleteProduct(id);
		return result;
	}
	/* EXCEPTION HANDLERS */
	  @ResponseStatus(value=HttpStatus.INTERNAL_SERVER_ERROR) //500
	  @ExceptionHandler({SQLException.class,DataAccessException.class})
	  public String databaseError() {
	    return "Database Error";
	  }
	  @ExceptionHandler(EmptyResultDataAccessException.class)
	  @ResponseStatus(value=HttpStatus.NOT_FOUND,reason="Resource not found")
	  public void notFound() { }
	  
	  @ExceptionHandler({NumberFormatException.class, HttpMessageNotReadableException.class,
		  ConstraintViolationException.class})
	  @ResponseStatus(value=HttpStatus.BAD_REQUEST)
	  public void badRequest() { }
}
