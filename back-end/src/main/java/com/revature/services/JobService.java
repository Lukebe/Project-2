package com.revature.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import com.revature.models.Job;
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
		
		return jobRepository.save(job);
	}
	public List<Job> selectAllJobs() {
		System.out.println("ALL JOBS SELECTED");
		return jobRepository.findAll();
	}
	public Job selectJobById(int id) {
		System.out.println("JOB SELECTED WITH JID: " + id);
		return jobRepository.findById(id).orElseThrow(() -> 
		new HttpClientErrorException(HttpStatus.NOT_FOUND));
	}
	public Job updateJob(int id, Job job) {
		System.out.println("JOB UPDATED WITH PARAMS: " + job.toString());
		if(jobRepository.existsById(id)) {
			return jobRepository.save(job);
		} else {
			throw new HttpClientErrorException(HttpStatus.NOT_FOUND);
		}
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


}
