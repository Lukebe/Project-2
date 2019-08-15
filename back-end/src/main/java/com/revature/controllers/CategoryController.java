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
import com.revature.models.Category;
import com.revature.services.CategoryService;

@RestController
@RequestMapping("categories")
@CrossOrigin
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
    @GetMapping("/search")
    public Page<Category> search(@RequestParam(value = "query") String search, Pageable pageable) {
        GenericFilterBuilder<Category> builder = new GenericFilterBuilder<Category>();
        Pattern pattern = Pattern.compile("(\\w+?)(:|<|>|!)(\\w+?),");
        Matcher matcher = pattern.matcher(search + ",");
        while (matcher.find()) {
            builder.with(matcher.group(1), matcher.group(2), matcher.group(3));
        }
         
        Specification<Category> spec = builder.build();
        return categoryService.performSearch(spec, pageable);
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
