package com.revature.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
		
		// TODO Auto-generated constructor stub
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
		new EmptyResultDataAccessException(0));
	}
	public Page<Job> selectJobByUserCreatedId(int userCreatedId, Pageable pageable) {
		System.out.println("JOBS SELECTED WITH USER CREATED ID: " + userCreatedId);
		return jobRepository.findAllByUserCreatedUserId(userCreatedId, pageable);
	}
	public Page<Job> selectJobByUserAcceptedId(int userAcceptedId, Pageable pageable) {
		System.out.println("JOBS SELECTED WITH USER ACCEPTED ID: " + userAcceptedId);
		return jobRepository.findAllByUserAcceptedUserId(userAcceptedId, pageable);
	}
	public Job updateJob(int id, Job job) {
		System.out.println("JOB UPDATED WITH PARAMS: " + job.toString());
		Job oldJob = jobRepository.findById(id).orElseThrow(() ->
		new EmptyResultDataAccessException(0));
		Job newJob = (Job) Utils.merge(oldJob, job);
		//Save the job
		return jobRepository.save(newJob);
		//Retrieve it again to show joined values correctly
		//return jobRepository.findById(id).orElseThrow(() ->
		//new HttpClientErrorException(HttpStatus.INTERNAL_SERVER_ERROR));
	}
	public String deleteJob(int id) {
		System.out.println("JOB DELETED WITH JID: " + id);
		if(jobRepository.existsById(id)) {
			jobRepository.deleteById(id);
			return "DELETED JOB WITH JID: " + id;
		} else {
			throw new EmptyResultDataAccessException(0);
		}
	}


}
