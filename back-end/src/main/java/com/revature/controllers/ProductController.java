package com.revature.controllers;
import java.sql.SQLException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.validation.ConstraintViolationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;

import com.revature.filter.GenericFilterBuilder;
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
    @GetMapping("/search")
    public Page<Product> search(@RequestParam(value = "query") String search, Pageable pageable) {
        GenericFilterBuilder<Product> builder = new GenericFilterBuilder<Product>();
        Pattern pattern = Pattern.compile("(\\w+?)(:|<|>|!)(\\w+?),");
        Matcher matcher = pattern.matcher(search + ",");
        while (matcher.find()) {
            builder.with(matcher.group(1), matcher.group(2), matcher.group(3));
        }
         
        Specification<Product> spec = builder.build();
        return productService.performSearch(spec, pageable);
    }
	@GetMapping("/category/{id}")
	public Page<Product> getProductByCategoryId(@PathVariable int id, Pageable pageable) {
		Page<Product> product = productService.selectProductByCategoryId(id, pageable);
		return product;
	}
	/* EXCEPTION HANDLERS */
	  @ExceptionHandler({SQLException.class,DataAccessException.class})
	  public ResponseEntity<String> databaseError() {
		  return ResponseEntity
				  .status(500)
				  .body("Database Error");
	  }
	  @ExceptionHandler(HttpClientErrorException.class)
	  public ResponseEntity<String> handleClientError(HttpClientErrorException e) {
		  return ResponseEntity
				  .status(e.getStatusCode())
				  .body(e.getMessage());
	  }
	  @ExceptionHandler(HttpServerErrorException.class)
	  public ResponseEntity<String> handleServerError(HttpServerErrorException e) {
		  return ResponseEntity
				  .status(e.getStatusCode())
				  .body(e.getMessage());
	  }
	  @ExceptionHandler({NumberFormatException.class, HttpMessageNotReadableException.class,
		  ConstraintViolationException.class,InvalidDataAccessApiUsageException.class})
	  public ResponseEntity<String> badRequest() {
		  return ResponseEntity
				  .status(400)
				  .body("Bad Parameters");
	  }
}
