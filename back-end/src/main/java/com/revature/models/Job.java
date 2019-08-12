package com.revature.models;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.boot.autoconfigure.security.SecurityProperties.User;
@Entity
@Table(name="jobs")
public class Job {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int jobId;
	private User userCreated;
	private String address;
	private String description;
	private Date dateCreated;
	private Date dateAccepted;
	private Date jobDateTime;
	private User userAccepted;
	private BigDecimal jobEarnings;
	private Category category;
	private Date timeEstimate;
	private Product product;
	private Status status;
	
	public int getJobId() {
		return jobId;
	}

	public void setJobId(int jobId) {
		this.jobId = jobId;
	}

	public User getUserCreated() {
		return userCreated;
	}

	public void setUserCreated(User userCreated) {
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

	public User getUserAccepted() {
		return userAccepted;
	}

	public void setUserAccepted(User userAccepted) {
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

	public Date getTimeEstimate() {
		return timeEstimate;
	}

	public void setTimeEstimate(Date timeEstimate) {
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

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((address == null) ? 0 : address.hashCode());
		result = prime * result + ((dateAccepted == null) ? 0 : dateAccepted.hashCode());
		result = prime * result + ((dateCreated == null) ? 0 : dateCreated.hashCode());
		result = prime * result + ((description == null) ? 0 : description.hashCode());
		result = prime * result + ((jobDateTime == null) ? 0 : jobDateTime.hashCode());
		result = prime * result + ((jobEarnings == null) ? 0 : jobEarnings.hashCode());
		result = prime * result + jobId;
		result = prime * result + ((timeEstimate == null) ? 0 : timeEstimate.hashCode());
		result = prime * result + ((userAccepted == null) ? 0 : userAccepted.hashCode());
		result = prime * result + ((userCreated == null) ? 0 : userCreated.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Job other = (Job) obj;
		if (address == null) {
			if (other.address != null)
				return false;
		} else if (!address.equals(other.address))
			return false;
		if (dateAccepted == null) {
			if (other.dateAccepted != null)
				return false;
		} else if (!dateAccepted.equals(other.dateAccepted))
			return false;
		if (dateCreated == null) {
			if (other.dateCreated != null)
				return false;
		} else if (!dateCreated.equals(other.dateCreated))
			return false;
		if (description == null) {
			if (other.description != null)
				return false;
		} else if (!description.equals(other.description))
			return false;
		if (jobDateTime == null) {
			if (other.jobDateTime != null)
				return false;
		} else if (!jobDateTime.equals(other.jobDateTime))
			return false;
		if (jobEarnings == null) {
			if (other.jobEarnings != null)
				return false;
		} else if (!jobEarnings.equals(other.jobEarnings))
			return false;
		if (jobId != other.jobId)
			return false;
		if (timeEstimate == null) {
			if (other.timeEstimate != null)
				return false;
		} else if (!timeEstimate.equals(other.timeEstimate))
			return false;
		if (userAccepted == null) {
			if (other.userAccepted != null)
				return false;
		} else if (!userAccepted.equals(other.userAccepted))
			return false;
		if (userCreated == null) {
			if (other.userCreated != null)
				return false;
		} else if (!userCreated.equals(other.userCreated))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Job [jobId=" + jobId + ", userCreated=" + userCreated + ", address=" + address + ", description="
				+ description + ", dateCreated=" + dateCreated + ", dateAccepted=" + dateAccepted + ", jobDateTime="
				+ jobDateTime + ", userAccepted=" + userAccepted + ", jobEarnings=" + jobEarnings + ", timeEstimate="
				+ timeEstimate + "]";
	}

	public Job(int jobId, User userCreated, String address, String description, Date dateCreated, Date dateAccepted,
			Date jobDateTime, User userAccepted, BigDecimal jobEarnings, Category category, Date timeEstimate,
			Product product, Status status) {
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
	}

	@Autowire
	public Job() {
		super();
		// TODO Auto-generated constructor stub
	}

}
