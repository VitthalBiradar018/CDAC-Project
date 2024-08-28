package com.autocareconnect.dto;

import lombok.Data;

@Data
public class AddServiceAppointmentRequest {

	private Integer customerId;

	private Integer serviceId;

	private String issue_description;

	private String appointmentTime;

	private String appointmentDate;

	private String vehicleName;

	private String vehicleRegistration;

	private Integer appointmentId;

}
