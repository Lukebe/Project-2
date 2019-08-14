package com.revature.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.revature.models.Job;
import com.revature.models.Users;

@Repository
public interface UsersRepository extends JpaRepository<Users, Integer>, JpaSpecificationExecutor<Users>{
	public Page<Users> findAll(Pageable pageable);
	public Page<Users> findAll (Specification<Users> specification, Pageable pageable);

}

