package com.revature.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.revature.models.Job;
import com.revature.services.JobService;

@RestController
@RequestMapping("jobs")
public class JobController {
	JobService jobService;
	@Autowired
	public JobController(JobService jobService) {
		this.jobService = jobService;
	}
	@GetMapping("")
	public List<Job> getAllJobs() {
		System.out.println("ALL JOBS SELECTED");
		List<Job> jobsList = jobService.selectAllJobs();
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

}
