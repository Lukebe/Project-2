package com.revature.controllers;
import java.sql.SQLException;

import javax.validation.ConstraintViolationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;

import com.revature.models.Category;
import com.revature.services.CategoryService;

@RestController
@RequestMapping("categories")
@CrossOrigin(allowedHeaders = "*", methods = {RequestMethod.POST,RequestMethod.GET,RequestMethod.PATCH,RequestMethod.DELETE})
public class CategoryController {
	CategoryService categoryService;
	@Autowired
	public CategoryController(CategoryService categoryService) {
		this.categoryService = categoryService;
	}
	@PostMapping("")
	public  Category createCategory(@RequestBody Category category) {
		Category newCategory = categoryService.createCategory(category);
		return newCategory;
	}
	@GetMapping("")
	public Page<Category> getAllCategories(Pageable pageable) {
		Page<Category> categoryList = categoryService.listAll(pageable);
		return categoryList;
	}
	@DeleteMapping("/{id}")
	public String deleteCategoryById(@PathVariable int id) {
		String result = categoryService.deleteCategory(id);
		return result;
	}
	@GetMapping("/{id}")
	public Category getCategoryById(@PathVariable int id) {
		Category category = categoryService.getById(id);
		return category;
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
		  ConstraintViolationException.class})
	  public ResponseEntity<String> badRequest() {
		  return ResponseEntity
				  .status(400)
				  .body("Bad Parameters");
	  }
}
