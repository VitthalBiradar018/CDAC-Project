package com.autocareconnect.dto;

import java.util.ArrayList;
import java.util.List;

import com.autocareconnect.entity.ServiceAppointment;

import lombok.Data;

@Data
public class ServiceAppointmentResponse extends CommonApiResponse {

	private List<ServiceAppointment> appointments = new ArrayList<>();

}
