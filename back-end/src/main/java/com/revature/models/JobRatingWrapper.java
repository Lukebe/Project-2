package com.revature.models;

import java.math.BigDecimal;
import java.time.Duration;
import java.util.Date;

import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.Range;
import org.hibernate.validator.constraints.time.DurationMax;
import org.hibernate.validator.constraints.time.DurationMin;

public class JobRatingWrapper {
	
	private int jobId;
	private Users userCreated;
	private String address;
	private String description;
	private Date dateCreated;
	private Date dateAccepted;
	private Date jobDateTime;
    private Users userAccepted;
	private BigDecimal jobEarnings;
	private Category category;
	private Duration timeEstimate;
	private Product product;
	private Status status;	    
	private double rating;
	public Job getJob() {
		return new Job(this.jobId, this.userCreated,this.address,
				this.description, this.dateCreated, this.dateAccepted,
				this.jobDateTime, this.userAccepted, this.jobEarnings,
				this.category, this.timeEstimate,
				this.product, this.status);		
	}
	public int getJobId() {
		return jobId;
	}
	public void setJobId(int jobId) {
		this.jobId = jobId;
	}
	public Users getUserCreated() {
		return userCreated;
	}
	public void setUserCreated(Users userCreated) {
		this.userCreated = userCreated;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Date getDateCreated() {
		return dateCreated;
	}
	public void setDateCreated(Date dateCreated) {
		this.dateCreated = dateCreated;
	}
	public Date getDateAccepted() {
		return dateAccepted;
	}
	public void setDateAccepted(Date dateAccepted) {
		this.dateAccepted = dateAccepted;
	}
	public Date getJobDateTime() {
		return jobDateTime;
	}
	public void setJobDateTime(Date jobDateTime) {
		this.jobDateTime = jobDateTime;
	}
	public Users getUserAccepted() {
		return userAccepted;
	}
	public void setUserAccepted(Users userAccepted) {
		this.userAccepted = userAccepted;
	}
	public BigDecimal getJobEarnings() {
		return jobEarnings;
	}
	public void setJobEarnings(BigDecimal jobEarnings) {
		this.jobEarnings = jobEarnings;
	}
	public Category getCategory() {
		return category;
	}
	public void setCategory(Category category) {
		this.category = category;
	}
	public Duration getTimeEstimate() {
		return timeEstimate;
	}
	public void setTimeEstimate(Duration timeEstimate) {
		this.timeEstimate = timeEstimate;
	}
	public Product getProduct() {
		return product;
	}
	public void setProduct(Product product) {
		this.product = product;
	}
	public Status getStatus() {
		return status;
	}
	public void setStatus(Status status) {
		this.status = status;
	}
	public double getRating() {
		return rating;
	}
	public void setRating(double rating) {
		this.rating = rating;
	}
	@Override
	public String toString() {
		return "JobRatingWrapper [jobId=" + jobId + ", userCreated=" + userCreated + ", address=" + address
				+ ", description=" + description + ", dateCreated=" + dateCreated + ", dateAccepted=" + dateAccepted
				+ ", jobDateTime=" + jobDateTime + ", userAccepted=" + userAccepted + ", jobEarnings=" + jobEarnings
				+ ", category=" + category + ", timeEstimate=" + timeEstimate + ", product=" + product + ", status="
				+ status + ", rating=" + rating + "]";
	}
	public JobRatingWrapper(int jobId, Users userCreated, String address, String description, Date dateCreated,
			Date dateAccepted, Date jobDateTime, Users userAccepted, BigDecimal jobEarnings, Category category,
			Duration timeEstimate, Product product, Status status, double rating) {
		super();
		this.jobId = jobId;
		this.userCreated = userCreated;
		this.address = address;
		this.description = description;
		this.dateCreated = dateCreated;
		this.dateAccepted = dateAccepted;
		this.jobDateTime = jobDateTime;
		this.userAccepted = userAccepted;
		this.jobEarnings = jobEarnings;
		this.category = category;
		this.timeEstimate = timeEstimate;
		this.product = product;
		this.status = status;
		this.rating = rating;
	}

	    
}

