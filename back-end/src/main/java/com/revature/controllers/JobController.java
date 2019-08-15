package com.revature.controllers;

import java.sql.SQLException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.validation.ConstraintViolationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;

import com.revature.filter.GenericFilterBuilder;
import com.revature.models.Job;
import com.revature.services.JobService;

@RestController
@RequestMapping("jobs")
@CrossOrigin
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
		Page<Job> jobsList = jobService.selectJobsByUserAcceptedId(id,pageable);
		return jobsList;
	}
	@GetMapping("/usercreated/{id}")
	public Page<Job> getJobsByUserCreatedId(@PathVariable int id, Pageable pageable) {
		Page<Job> jobsList = jobService.selectJobsByUserCreatedId(id,pageable);
		return jobsList;
	}
	@GetMapping("/category/{id}")
	public Page<Job> getJobsByCategoryId(@PathVariable int id, Pageable pageable) {
		Page<Job> jobsList = jobService.selectJobsByCategoryId(id,pageable);
		return jobsList;
	}
	@GetMapping("/product/{id}")
	public Page<Job> getJobsByProductId(@PathVariable int id, Pageable pageable) {
		Page<Job> jobsList = jobService.selectJobsByProductId(id, pageable);
		return jobsList;
	}
	@GetMapping("/status/{id}")
	public Page<Job> getJobsByStatusId(@PathVariable int id, Pageable pageable) {
		Page<Job> jobsList = jobService.selectJobsByStatusId(id, pageable);
		return jobsList;
	}
    @GetMapping("/search")
    public Page<Job> search(@RequestParam(value = "query") String search, Pageable pageable) {
        GenericFilterBuilder<Job> builder = new GenericFilterBuilder<Job>();
        Pattern pattern = Pattern.compile("(\\w+?)(:|<|>|!)(\\w+?),");
        Matcher matcher = pattern.matcher(search + ",");
        while (matcher.find()) {
            builder.with(matcher.group(1), matcher.group(2), matcher.group(3));
        }
        Specification<Job> spec = builder.build();
        return jobService.performSearch(spec, pageable);
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
		  ConstraintViolationException.class,InvalidDataAccessApiUsageException.class})
	  public ResponseEntity<String> badRequest() {
		  return ResponseEntity
				  .status(400)
				  .body("Bad Parameters");
	  }
	  

}
