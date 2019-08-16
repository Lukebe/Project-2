package com.revature.services;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.revature.models.Job;
import com.revature.models.ProductCountWrapper;
@Repository
public interface JobRepository extends JpaRepository<Job, Integer>, JpaSpecificationExecutor<Job>{
	public Page<Job> findAllByUserAcceptedUserId(int useraccepted, Pageable pageable);
	public List<Job> findAllByUserAcceptedUserId(int useraccepted);
	public Page<Job> findAllByUserCreatedUserId(int usercreated, Pageable pageable);
	public Page<Job> findAllByCategoryCategoryId(int category, Pageable pageable);
	public Page<Job> findAllByProductProductId(int product, Pageable pageable);
	public Page<Job> findAllByStatusStatusId(int status, Pageable pageable);
	public Page<Job> findAll(Pageable pageable);
	public Page<Job> findAll (Specification<Job> specification, Pageable pageable);
	//I hate java
	@Query(value = "SELECT new com.revature.models.ProductCountWrapper(products,count(jobs.product)) FROM Job jobs INNER JOIN Product products ON jobs.product=products.productId WHERE jobs.dateCreated >" + 
			"(current_date - ?1)" + 
			"group by products.productId"
			, nativeQuery = false)
	public List<ProductCountWrapper> selectRecentJobProductCount(int daysAgo);
}
