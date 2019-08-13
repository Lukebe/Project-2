package com.revature.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.revature.models.Category;
import com.revature.models.Job;
@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer>{
	public Page<Category> findAll(Pageable pageable);
}
