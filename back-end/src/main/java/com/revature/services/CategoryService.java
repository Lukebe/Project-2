package com.revature.services;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import com.revature.models.Category;
@Service
public class CategoryService {
	CategoryRepository categoryRepository;
	@Autowired
	public CategoryService(CategoryRepository categoryRepository) {
		this.categoryRepository = categoryRepository;

		// TODO Auto-generated constructor stub
	}
	public Category createCategory(Category category) {
		// Business Logic
		// Ensuring the user has the privileges to create this thing
		// Ensuring that the values passed are valid
		System.out.println("CATEGORY CREATED WITH CID: " + category.getCategoryId());
		return categoryRepository.save(category);
	}
	public Page<Category> listAll(Pageable pageable) {
		System.out.println("ALL CATEGORIES SELECTED");
		return categoryRepository.findAll(pageable);
	}
	public Category getById(int id) {
		System.out.println("CATEGORY SELECTED WITH CID: " + id);
		return categoryRepository.findById(id)
				.orElseThrow(() -> 
				new HttpClientErrorException(HttpStatus.NOT_FOUND));
	}
	public String deleteCategory(int id) {
		System.out.println("CATEGORY DELETED WITH CID: " + id);
		if(categoryRepository.existsById(id)) {
			categoryRepository.deleteById(id);
			return "DELETED CATEGORY WITH CID: " + id;
		} else {
			throw new HttpClientErrorException(HttpStatus.NOT_FOUND);
		}
	}
}