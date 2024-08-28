package com.autocareconnect.dto;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class AddJobCardRequest {

	private Integer serviceAppointmentId;

	private String name;

	private String description;

	private BigDecimal amount;

	private String addedTime;

}
