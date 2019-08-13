package com.revature.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.revature.models.Job;
@Repository
public interface JobRepository extends JpaRepository<Job, Integer>{
	public List<Job> findAllByUserAcceptedUserId(int useraccepted);
	public Page<Job> findAllByUserAcceptedUserId(int useraccepted, Pageable pageable);
	public List<Job> findAllByUserCreatedUserId(int usercreated);
	public Page<Job> findAllByUserCreatedUserId(int usercreated, Pageable pageable);
	public List<Job> findAllByAddress(String address);
	public Page<Job> findAll(Pageable pageable);


}
