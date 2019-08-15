package com.revature.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.revature.models.Job;
@Repository
public interface JobRepository extends JpaRepository<Job, Integer>, JpaSpecificationExecutor<Job>{
	public Page<Job> findAllByUserAcceptedUserId(int useraccepted, Pageable pageable);
	public Page<Job> findAllByUserCreatedUserId(int usercreated, Pageable pageable);
	public Page<Job> findAllByCategoryCategoryId(int category, Pageable pageable);
	public Page<Job> findAllByProductProductId(int product, Pageable pageable);
	public Page<Job> findAllByStatusStatusId(int status, Pageable pageable);
	public Page<Job> findAll(Pageable pageable);
	public Page<Job> findAll (Specification<Job> specification, Pageable pageable);

}
