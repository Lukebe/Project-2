package com.revature.controllers;
import java.sql.SQLException;

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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

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
