package com.autocareconnect.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.autocareconnect.dto.AddJobCardRequest;
import com.autocareconnect.dto.AddServiceAppointmentRequest;
import com.autocareconnect.dto.AddServiceRequest;
import com.autocareconnect.dto.CommonApiResponse;
import com.autocareconnect.dto.ServiceAppointmentResponse;
import com.autocareconnect.dto.ServiceResponse;
import com.autocareconnect.service.ServiceResource;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("api/service")
@CrossOrigin(origins = "http://localhost:3000")
public class ServiceController {

	@Autowired
	private ServiceResource serviceResource;

	@PostMapping("/add")
	@Operation(summary = "Api to add service")
	public ResponseEntity<CommonApiResponse> addService(AddServiceRequest request) {
		return serviceResource.addService(request);
	}

	@GetMapping("/fetch/all")
	@Operation(summary = "Api to fetch all services")
	public ResponseEntity<ServiceResponse> fetchAllServices() {
		return serviceResource.fetchAllServices();
	}

	@GetMapping("/fetch/id-wise")
	@Operation(summary = "Api to fetch service by id")
	public ResponseEntity<ServiceResponse> fetchServiceById(@RequestParam("serviceId") Integer serviceId) {
		return serviceResource.fetchServiceById(serviceId);
	}

	@GetMapping("/fetch/service-center-wise")
	@Operation(summary = "Api to fetch all services by service center")
	public ResponseEntity<ServiceResponse> fetchAllServicesByServiceCenter(
			@RequestParam("serviceCenterId") Integer serviceCenterId) {
		return serviceResource.fetchAllServicesByServiceCenter(serviceCenterId);
	}

	@GetMapping("/fetch/category-wise")
	@Operation(summary = "Api to fetch all services by category")
	public ResponseEntity<ServiceResponse> fetchAllServicesByCategory(
			@RequestParam("subCategoryId") Integer categoryId) {
		return serviceResource.fetchAllServicesByCategory(categoryId);
	}

	@DeleteMapping("/delete")
	@Operation(summary = "Api to delete the service")
	public ResponseEntity<CommonApiResponse> deleteService(@RequestParam("serviceId") int serviceId) {
		return serviceResource.deleteService(serviceId);
	}

	@GetMapping(value = "/{serviceImageName}", produces = "image/*")
	public void fetchTourImage(@PathVariable("serviceImageName") String serviceImageName, HttpServletResponse resp) {
		this.serviceResource.fetchServiceImage(serviceImageName, resp);
	}

	@PostMapping("/appointment/add")
	@Operation(summary = "Api to add service appointment")
	public ResponseEntity<CommonApiResponse> addServiceAppointment(@RequestBody AddServiceAppointmentRequest request) {
		return serviceResource.addServiceAppointment(request);
	}

	@GetMapping("/appointment/close")
	@Operation(summary = "Api to close service appointment")
	public ResponseEntity<CommonApiResponse> closeServiceAppointment(
			@RequestParam("appointmentId") Integer appointmentId) {
		return serviceResource.closeServiceAppointment(appointmentId);
	}

	@PostMapping("/appointment/job/card/add")
	@Operation(summary = "Api to add the job card for appointmenr")
	public ResponseEntity<CommonApiResponse> addJobCard(@RequestBody AddJobCardRequest request) {
		return serviceResource.addJobCard(request);
	}

	@GetMapping("/appointment/fetch/all")
	@Operation(summary = "Api to fetch all service appointments")
	public ResponseEntity<ServiceAppointmentResponse> fetchAllServiceAppointments() {
		return serviceResource.fetchAllServiceAppointments();
	}

	@GetMapping("/appointment/fetch/customer-wise")
	@Operation(summary = "Api to fetch all service appointments of customer")
	public ResponseEntity<ServiceAppointmentResponse> fetchAllServiceAppointmentsByCustomer(
			@RequestParam("customerId") int customerId) {
		return serviceResource.fetchAllServiceAppointmentsByCustomer(customerId);
	}

	@GetMapping("/appointment/fetch/service-center-wise")
	@Operation(summary = "Api to fetch all service appointments of customer")
	public ResponseEntity<ServiceAppointmentResponse> fetchAllServiceAppointmentsByServiceCenter(
			@RequestParam("serviceCenterId") int serviceCenterId) {
		return serviceResource.fetchAllServiceAppointmentsByServiceCenter(serviceCenterId);
	}

	@GetMapping("/appointment/pay-and-confirm")
	@Operation(summary = "Api to pay and confirm the vehicle servicing")
	public ResponseEntity<CommonApiResponse> payAndConfirmVehicleServicing(
			@RequestParam("appointmentId") int appointmentId) {
		return serviceResource.payAndConfirmVehicleServicing(appointmentId);
	}

	@GetMapping("/appointment/service/status/update")
	@Operation(summary = "Api to update the appointment servicing status")
	public ResponseEntity<CommonApiResponse> updateTheAppointmentServicingStatus(
			@RequestParam("appointmentId") int appointmentId, @RequestParam("status") String status) {
		return serviceResource.updateTheAppointmentServicingStatus(appointmentId, status);
	}

}
