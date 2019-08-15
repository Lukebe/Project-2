package com.revature.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import com.revature.models.Job;
import com.revature.utils.Utils;
@Service
public class JobService {
	JobRepository jobRepository;
	@Autowired
	public JobService(JobRepository jobRepository) {
		super();
		this.jobRepository = jobRepository;
		
	}
	
	public Job createJob(Job job) {
		// Business Logic
		// Ensuring the user has the privileges to create this thing
		// Ensuring that the values passed are valid
		System.out.println("JOB CREATED WITH JID: " + job.getJobId());
		System.out.println("JOB USER ACCEPTED: " + job.getUserAccepted() + " USER CREATED: " + job.getUserCreated());
		return jobRepository.save(job);
	}
	public Page<Job> selectAllJobs(Pageable pageable) {
		System.out.println("ALL JOBS SELECTED");
		return jobRepository.findAll(pageable);
	}
	public Job selectJobById(int id) {
		System.out.println("JOB SELECTED WITH JID: " + id);
		return jobRepository.findById(id).orElseThrow(() -> 
		new HttpClientErrorException(HttpStatus.NOT_FOUND));
	}
	public Page<Job> selectJobsByUserCreatedId(int userCreatedId, Pageable pageable) {
		System.out.println("JOBS SELECTED WITH USER CREATED ID: " + userCreatedId);
		return jobRepository.findAllByUserCreatedUserId(userCreatedId, pageable);
	}
	public Page<Job> selectJobsByUserAcceptedId(int userAcceptedId, Pageable pageable) {
		System.out.println("JOBS SELECTED WITH USER ACCEPTED ID: " + userAcceptedId);
		return jobRepository.findAllByUserAcceptedUserId(userAcceptedId, pageable);
	}
	public Page<Job> selectJob(int userAcceptedId, Pageable pageable) {
		System.out.println("JOBS SELECTED WITH USER ACCEPTED ID: " + userAcceptedId);
		return jobRepository.findAllByUserAcceptedUserId(userAcceptedId, pageable);
	}
	public Page<Job> selectJobsByCategoryId(int categoryId, Pageable pageable) {
		System.out.println("JOBS SELECTED WITH CATEGORY ID: " + categoryId);
		return jobRepository.findAllByCategoryCategoryId(categoryId, pageable);
	}
	public Page<Job> selectJobsByProductId(int productId, Pageable pageable) {
		System.out.println("JOBS SELECTED WITH PRODUCT ID: " + productId);
		return jobRepository.findAllByCategoryCategoryId(productId, pageable);
	}
	public Page<Job> selectJobsByStatusId(int statusId, Pageable pageable) {
		System.out.println("JOBS SELECTED WITH STATUS ID: " + statusId);
		return jobRepository.findAllByCategoryCategoryId(statusId, pageable);
	}
	public Job updateJob(int id, Job job) {
		System.out.println("JOB UPDATED WITH PARAMS: " + job.toString());
		Job oldJob = jobRepository.findById(id).orElseThrow(() ->
		new HttpClientErrorException(HttpStatus.NOT_FOUND));
		Job newJob = (Job) Utils.merge(oldJob, job);
		//Save the product
		return jobRepository.save(newJob);
		//Retrieve it again to show joined values correctly
		//return productRepository.findById(id).orElseThrow(() ->
		//new HttpClientErrorException(HttpStatus.NOT_FOUND));
	}
	public String deleteJob(int id) {
		System.out.println("JOB DELETED WITH JID: " + id);
		if(jobRepository.existsById(id)) {
			jobRepository.deleteById(id);
			return "DELETED JOB WITH JID: " + id;
		} else {
			throw new HttpClientErrorException(HttpStatus.NOT_FOUND);
		}
	}
	public Page<Job> performSearch(Specification<Job> spec, Pageable pageable) {
		return jobRepository.findAll(spec, pageable);
	}


}
