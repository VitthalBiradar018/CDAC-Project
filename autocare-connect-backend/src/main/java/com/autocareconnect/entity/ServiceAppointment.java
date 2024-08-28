package com.autocareconnect.entity;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Data
@Entity
public class ServiceAppointment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "customer_id")
	private User customer;

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "service_id")
	private Service service;

	private String vehicleName;

	private String vehicleRegistration;

	private String issue_description;

	private String appointmentTime;

	private String appointmentDate;

	private String addedTime;

	private String status;

	private String servicingStatus;

	private BigDecimal serviceAmount; // if approved, calculate based on job card

	@OneToMany(mappedBy = "serviceAppointment", cascade = { CascadeType.PERSIST, CascadeType.MERGE })
	private List<JobCard> jobCards = new ArrayList<>();

}
