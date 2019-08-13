package com.revature.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.revature.models.Job;
import com.revature.models.Users;

@Repository
public interface UsersRepository extends JpaRepository<Users, Integer>{
	public Page<Users> findAll(Pageable pageable);
}

