package com.revature.controllers;

import java.sql.SQLException;

import javax.validation.ConstraintViolationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;

import com.revature.models.Job;
import com.revature.services.JobService;

@RestController
@RequestMapping("jobs")
@CrossOrigin(allowedHeaders = "*", methods = {RequestMethod.POST,RequestMethod.GET,RequestMethod.PATCH,RequestMethod.DELETE})
public class JobController {
	JobService jobService;
	@Autowired
	public JobController(JobService jobService) {
		this.jobService = jobService;
	}
	@GetMapping("")
	public Page<Job> getAllJobs(Pageable pageable) {
		System.out.println("ALL JOBS SELECTED");
		Page<Job> jobsList = jobService.selectAllJobs(pageable);
		return jobsList;
	}
	@PostMapping("")
	public  Job createJob(@RequestBody Job job) {
		Job newJob = jobService.createJob(job);
		return newJob;
	}
	@PatchMapping("")
	public  Job updateJob(@RequestBody Job job) {
		Job updatedJob = jobService.updateJob(job.getJobId(), job);
		return updatedJob;
	}
	@DeleteMapping("/{id}")
	public String deleteJobById(@PathVariable int id) {
		String result = jobService.deleteJob(id);
		return result;
	}
	@GetMapping("/{id}")
	public Job getJobById(@PathVariable int id) {
		Job job = jobService.selectJobById(id);
		return job;
	}
	@GetMapping("/useraccepted/{id}")
	public Page<Job> getJobsByUserAcceptedId(@PathVariable int id,Pageable pageable) {
		Page<Job> jobsList = jobService.selectJobByUserAcceptedId(id,pageable);
		return jobsList;
	}
	@GetMapping("/usercreated/{id}")
	public Page<Job> getJobsByUserCreatedId(@PathVariable int id, Pageable pageable) {
		Page<Job> jobsList = jobService.selectJobByUserCreatedId(id,pageable);
		return jobsList;
	}
	/* EXCEPTION HANDLERS */
	  @ExceptionHandler({SQLException.class,DataAccessException.class})
	  public ResponseEntity<String> databaseError() {
		  return ResponseEntity
				  .status(500)
				  .body("Database Error");
	  }
	  @ExceptionHandler(HttpClientErrorException.class)
	  public ResponseEntity<String> handleClientError(HttpClientErrorException e) {
		  return ResponseEntity
				  .status(e.getStatusCode())
				  .body(e.getMessage());
	  }
	  @ExceptionHandler(HttpServerErrorException.class)
	  public ResponseEntity<String> handleServerError(HttpServerErrorException e) {
		  return ResponseEntity
				  .status(e.getStatusCode())
				  .body(e.getMessage());
	  }
	  @ExceptionHandler({NumberFormatException.class, HttpMessageNotReadableException.class,
		  ConstraintViolationException.class})
	  public ResponseEntity<String> badRequest() {
		  return ResponseEntity
				  .status(400)
				  .body("Bad Parameters");
	  }

}
