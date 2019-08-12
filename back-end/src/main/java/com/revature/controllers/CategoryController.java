package com.revature.controllers;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
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
	public List<Category> getAllCategories() {
		List<Category> categoryList = categoryService.listAll();
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
}
