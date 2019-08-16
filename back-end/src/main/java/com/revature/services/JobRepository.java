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
import com.revature.models.ProductAddressCountWrapper;
import com.revature.models.ProductCountWrapper;
@Repository
public interface JobRepository extends JpaRepository<Job, Integer>, JpaSpecificationExecutor<Job>{
	public Page<Job> findAllByUserAcceptedUserIdAndStatusStatusId(int useraccepted, int status, Pageable pageable);
	public List<Job> findAllByUserAcceptedUserId(int useraccepted);
	public Page<Job> findAllByUserCreatedUserIdAndStatusStatusId(int usercreated, int status, Pageable pageable);
	public Page<Job> findAllByCategoryCategoryIdAndStatusStatusId(int category, int status, Pageable pageable);
	public Page<Job> findAllByProductProductIdAndStatusStatusId(int product, int status, Pageable pageable);
	public Page<Job> findAllByStatusStatusId(int status, Pageable pageable);
	public Page<Job> findAll(Pageable pageable);
	public Page<Job> findAll (Specification<Job> specification, Pageable pageable);
	//I hate java
	@Query(value = "SELECT new com.revature.models.ProductCountWrapper(products,count(jobs.product)) FROM Job jobs INNER JOIN Product products ON jobs.product=products.productId WHERE jobs.dateCreated >" + 
			"(current_date - ?1)" + 
			"group by products.productId"
			, nativeQuery = false)
	public List<ProductCountWrapper> selectRecentJobProductCount(int daysAgo);
	@Query(value = "SELECT new com.revature.models.ProductAddressCountWrapper(products,count(jobs.address), jobs.address) FROM Job jobs INNER JOIN Product products ON jobs.product=products.productId WHERE jobs.jobDateTime >" + 
			"(current_date - ?1)" + 
			"group by jobs.address,products.productId"
			, nativeQuery = false)
	public List<ProductAddressCountWrapper> selectPopularEvents(int daysAgo);
}
