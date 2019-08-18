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
	private String dropoffAddress;
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
		return new Job(this.jobId, this.userCreated,this.address, this.dropoffAddress,
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
	public String getDropoffAddress() {
		return dropoffAddress;
	}
	public void setDropoffAddress(String dropoffAddress) {
		this.dropoffAddress = dropoffAddress;
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
	public JobRatingWrapper() {
		super();
		// TODO Auto-generated constructor stub
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((address == null) ? 0 : address.hashCode());
		result = prime * result + ((category == null) ? 0 : category.hashCode());
		result = prime * result + ((dateAccepted == null) ? 0 : dateAccepted.hashCode());
		result = prime * result + ((dateCreated == null) ? 0 : dateCreated.hashCode());
		result = prime * result + ((description == null) ? 0 : description.hashCode());
		result = prime * result + ((dropoffAddress == null) ? 0 : dropoffAddress.hashCode());
		result = prime * result + ((jobDateTime == null) ? 0 : jobDateTime.hashCode());
		result = prime * result + ((jobEarnings == null) ? 0 : jobEarnings.hashCode());
		result = prime * result + jobId;
		result = prime * result + ((product == null) ? 0 : product.hashCode());
		long temp;
		temp = Double.doubleToLongBits(rating);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		result = prime * result + ((status == null) ? 0 : status.hashCode());
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
		JobRatingWrapper other = (JobRatingWrapper) obj;
		if (address == null) {
			if (other.address != null)
				return false;
		} else if (!address.equals(other.address))
			return false;
		if (category == null) {
			if (other.category != null)
				return false;
		} else if (!category.equals(other.category))
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
		if (dropoffAddress == null) {
			if (other.dropoffAddress != null)
				return false;
		} else if (!dropoffAddress.equals(other.dropoffAddress))
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
		if (product == null) {
			if (other.product != null)
				return false;
		} else if (!product.equals(other.product))
			return false;
		if (Double.doubleToLongBits(rating) != Double.doubleToLongBits(other.rating))
			return false;
		if (status == null) {
			if (other.status != null)
				return false;
		} else if (!status.equals(other.status))
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
		return "JobRatingWrapper [jobId=" + jobId + ", userCreated=" + userCreated + ", address=" + address
				+ ", dropoffAddress=" + dropoffAddress + ", description=" + description + ", dateCreated=" + dateCreated
				+ ", dateAccepted=" + dateAccepted + ", jobDateTime=" + jobDateTime + ", userAccepted=" + userAccepted
				+ ", jobEarnings=" + jobEarnings + ", category=" + category + ", timeEstimate=" + timeEstimate
				+ ", product=" + product + ", status=" + status + ", rating=" + rating + "]";
	}
	
	    
}

