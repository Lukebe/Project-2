package com.revature.models;

import java.math.BigDecimal;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.Range;
import org.hibernate.validator.constraints.time.DurationMax;
import org.hibernate.validator.constraints.time.DurationMin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

import com.fasterxml.jackson.annotation.JsonFormat;
@Entity
@Table(name="jobs")
public class Job {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int jobId;
	@ManyToOne
	@JoinColumn(name = "user_created_id")
	@NotNull
	private Users userCreated;
	@Length(min = 5, max = 150)
	@NotNull
	private String address;
	@Length(min = 5, max = 150)
	@NotNull
	private String dropoffAddress;
	@Length(max = 500)
	@NotNull
	private String description;
	@NotNull
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private Date dateCreated;
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private Date dateAccepted;
	@NotNull
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private Date jobDateTime;
	@ManyToOne
	@JoinColumn(name = "user_accepted_id")
    private Users userAccepted;
	@NotNull
	@Range(min = 1, max = 100000)
	private BigDecimal jobEarnings;
	@OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category")
	@NotNull
	private Category category;
	@DurationMin(minutes = 10)
	@DurationMax(days = 7)	
	@NotNull
	private long timeEstimate;
	@OneToOne()
    @JoinColumn(name = "product")
	@NotNull
	private Product product;
	@OneToOne()
    @JoinColumn(name = "status")
	@NotNull
	private Status status;

	
	public Job(int jobId, @NotNull Users userCreated, @Length(min = 5, max = 150) @NotNull String address,
			@Length(min = 5, max = 150) @NotNull String dropoffAddress, @Length(max = 500) @NotNull String description,
			@NotNull Date dateCreated, Date dateAccepted, @NotNull Date jobDateTime, Users userAccepted,
			@NotNull @Range(min = 1, max = 100000) BigDecimal jobEarnings, @NotNull Category category,
			@DurationMin(minutes = 10) @DurationMax(days = 7) @NotNull long timeEstimate, @NotNull Product product,
			@NotNull Status status) {
		super();
		this.jobId = jobId;
		this.userCreated = userCreated;
		this.address = address;
		this.dropoffAddress = dropoffAddress;
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
		result = prime * result + ((status == null) ? 0 : status.hashCode());
		result = prime * result + (int) (timeEstimate ^ (timeEstimate >>> 32));
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
		if (status == null) {
			if (other.status != null)
				return false;
		} else if (!status.equals(other.status))
			return false;
		if (timeEstimate != other.timeEstimate)
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
		return "Job [jobId=" + jobId + ", userCreated=" + userCreated + ", address=" + address + ", dropoffAddress="
				+ dropoffAddress + ", description=" + description + ", dateCreated=" + dateCreated + ", dateAccepted="
				+ dateAccepted + ", jobDateTime=" + jobDateTime + ", userAccepted=" + userAccepted + ", jobEarnings="
				+ jobEarnings + ", category=" + category + ", timeEstimate=" + timeEstimate + ", product=" + product
				+ ", status=" + status + "]";
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



	public long getTimeEstimate() {
		return timeEstimate;
	}



	public void setTimeEstimate(long timeEstimate) {
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



	@Autowired
	public Job() {
		super();
		// TODO Auto-generated constructor stub
	}

}
