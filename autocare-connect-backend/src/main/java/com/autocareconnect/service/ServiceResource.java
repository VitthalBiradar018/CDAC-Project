package com.autocareconnect.service;

import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;
import org.springframework.util.FileCopyUtils;

import com.autocareconnect.dao.CategoryDao;
import com.autocareconnect.dao.JobCardDao;
import com.autocareconnect.dao.ServiceAppointmentDao;
import com.autocareconnect.dao.ServiceDao;
import com.autocareconnect.dao.UserDao;
import com.autocareconnect.dto.AddJobCardRequest;
import com.autocareconnect.dto.AddServiceAppointmentRequest;
import com.autocareconnect.dto.AddServiceRequest;
import com.autocareconnect.dto.CommonApiResponse;
import com.autocareconnect.dto.ServiceAppointmentResponse;
import com.autocareconnect.dto.ServiceResponse;
import com.autocareconnect.entity.Category;
import com.autocareconnect.entity.JobCard;
import com.autocareconnect.entity.Service;
import com.autocareconnect.entity.ServiceAppointment;
import com.autocareconnect.entity.User;
import com.autocareconnect.exception.ServiceSaveFailedException;
import com.autocareconnect.utility.Constants.ActiveStatus;
import com.autocareconnect.utility.Constants.ServiceAppointmentStatus;
import com.autocareconnect.utility.Constants.ServicingStatus;
import com.autocareconnect.utility.Constants.UserRole;

import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;

@Component
@Transactional
public class ServiceResource {

	private final Logger LOG = LoggerFactory.getLogger(ServiceResource.class);

	@Autowired
	private ServiceDao serviceDao;

	@Autowired
	private UserDao userDao;

	@Autowired
	private StorageService storageService;

	@Autowired
	private CategoryDao categoryDao;

	@Autowired
	private ServiceAppointmentDao serviceAppointmentDao;

	@Autowired
	private JobCardDao jobCardDao;

	@Value("${com.autocareconnect.admin.commission}")
	private Integer adminCommission;

	public ResponseEntity<CommonApiResponse> addService(AddServiceRequest request) {

		LOG.info("request received for Service add");

		CommonApiResponse response = new CommonApiResponse();

		if (request == null) {
			response.setResponseMessage("missing input");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		if (request.getName() == null || request.getDescription() == null || request.getMinPrice() == null
				|| request.getCategoryId() == null || request.getDeliveryTime() == 0
				|| request.getServiceCenterId() == 0 || request.getImage1() == null || request.getImage2() == null
				|| request.getImage3() == null) {
			response.setResponseMessage("bad request - missing input!!!");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		String addedDateTime = String
				.valueOf(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant().toEpochMilli());

		Category category = this.categoryDao.findById(request.getCategoryId()).get();

		if (category == null) {
			response.setResponseMessage("Category not found");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		User serviceCenter = this.userDao.findById(request.getServiceCenterId()).get();

		// store service image in Image Folder and give event name to store in database
		String image1 = storageService.store(request.getImage1());
		String image2 = storageService.store(request.getImage2());
		String image3 = storageService.store(request.getImage3());

		Service service = AddServiceRequest.toServiceEntity(request);
		service.setImage1(image1);
		service.setImage2(image2);
		service.setImage3(image3);
		service.setCategory(category);

		service.setAddedTime(addedDateTime);
		service.setStatus(ActiveStatus.ACTIVE.value());
		service.setServiceCenter(serviceCenter);

		Service savedService = this.serviceDao.save(service);

		if (savedService == null) {
			throw new ServiceSaveFailedException("Failed to save the Service");
		}

		response.setResponseMessage("Service added successful");
		response.setSuccess(true);

		return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);

	}

	public ResponseEntity<ServiceResponse> fetchAllServices() {

		LOG.info("Request received for fetching all services");

		ServiceResponse response = new ServiceResponse();

		List<Service> services = new ArrayList<>();

		services = this.serviceDao.findByStatus(ActiveStatus.ACTIVE.value());

		if (CollectionUtils.isEmpty(services)) {
			response.setResponseMessage("No Services found");
			response.setSuccess(false);

			return new ResponseEntity<ServiceResponse>(response, HttpStatus.OK);
		}

		response.setServices(services);
		response.setResponseMessage("Services fetched successful");
		response.setSuccess(true);

		return new ResponseEntity<ServiceResponse>(response, HttpStatus.OK);
	}

	public ResponseEntity<CommonApiResponse> deleteService(int serviceId) {

		LOG.info("Request received for deleting category");

		CommonApiResponse response = new CommonApiResponse();

		if (serviceId == 0) {
			response.setResponseMessage("missing service Id");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		Service service = this.serviceDao.findById(serviceId).get();

		if (service == null) {
			response.setResponseMessage("service not found");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		service.setStatus(ActiveStatus.DEACTIVATED.value());
		Service updatedService = this.serviceDao.save(service);

		if (updatedService == null) {
			throw new ServiceSaveFailedException("Failed to delete the Service");
		}

		response.setResponseMessage("Service Deleted Successful!!!");
		response.setSuccess(true);

		return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);

	}

	public void fetchServiceImage(String serviceImageName, HttpServletResponse resp) {
		Resource resource = storageService.load(serviceImageName);
		if (resource != null) {
			try (InputStream in = resource.getInputStream()) {
				ServletOutputStream out = resp.getOutputStream();
				FileCopyUtils.copy(in, out);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	public ResponseEntity<ServiceResponse> fetchAllServicesByServiceCenter(Integer serviceCenterId) {

		LOG.info("Request received for fetching all services");

		ServiceResponse response = new ServiceResponse();

		if (serviceCenterId == 0) {
			response.setResponseMessage("missing service center Id");
			response.setSuccess(false);

			return new ResponseEntity<ServiceResponse>(response, HttpStatus.BAD_REQUEST);
		}

		User serviceCenter = this.userDao.findById(serviceCenterId).get();

		if (serviceCenter == null) {
			response.setResponseMessage("service center not found!!");
			response.setSuccess(false);

			return new ResponseEntity<ServiceResponse>(response, HttpStatus.BAD_REQUEST);
		}

		List<Service> services = new ArrayList<>();

		services = this.serviceDao.findByServiceCenter(serviceCenter);

		if (CollectionUtils.isEmpty(services)) {
			response.setResponseMessage("No Services found");
			response.setSuccess(false);

			return new ResponseEntity<ServiceResponse>(response, HttpStatus.OK);
		}

		response.setServices(services);
		response.setResponseMessage("Services fetched successful");
		response.setSuccess(true);

		return new ResponseEntity<ServiceResponse>(response, HttpStatus.OK);
	}

	public ResponseEntity<ServiceResponse> fetchAllServicesByCategory(Integer categoryId) {

		LOG.info("Request received for fetching all services using category id");

		ServiceResponse response = new ServiceResponse();

		if (categoryId == 0) {
			response.setResponseMessage("missing category");
			response.setSuccess(false);

			return new ResponseEntity<ServiceResponse>(response, HttpStatus.BAD_REQUEST);
		}

		Category category = this.categoryDao.findById(categoryId).get();

		List<Service> services = new ArrayList<>();

		services = this.serviceDao.findByCategoryAndStatus(category, ActiveStatus.ACTIVE.value());

		if (CollectionUtils.isEmpty(services)) {
			response.setResponseMessage("No Services found");
			response.setSuccess(false);

			return new ResponseEntity<ServiceResponse>(response, HttpStatus.OK);
		}

		response.setServices(services);
		response.setResponseMessage("Services fetched successful");
		response.setSuccess(true);

		return new ResponseEntity<ServiceResponse>(response, HttpStatus.OK);
	}

	public ResponseEntity<ServiceResponse> fetchServiceById(Integer serviceId) {

		LOG.info("Request received for fetching all services");

		ServiceResponse response = new ServiceResponse();

		if (serviceId == 0) {
			response.setResponseMessage("missing service Id");
			response.setSuccess(false);

			return new ResponseEntity<ServiceResponse>(response, HttpStatus.BAD_REQUEST);
		}

		Service service = this.serviceDao.findById(serviceId).get();

		if (service == null) {
			response.setResponseMessage("service not found!!");
			response.setSuccess(false);

			return new ResponseEntity<ServiceResponse>(response, HttpStatus.BAD_REQUEST);
		}

		service = this.serviceDao.findById(serviceId).get();

		if (service == null) {
			response.setResponseMessage("Service not found!!!");
			response.setSuccess(false);

			return new ResponseEntity<ServiceResponse>(response, HttpStatus.OK);
		}

		response.setServices(Arrays.asList(service));
		response.setResponseMessage("Services fetched successful");
		response.setSuccess(true);

		return new ResponseEntity<ServiceResponse>(response, HttpStatus.OK);

	}

	public ResponseEntity<CommonApiResponse> addServiceAppointment(AddServiceAppointmentRequest request) {

		LOG.info("request received for adding service request");

		CommonApiResponse response = new CommonApiResponse();

		if (request == null || request.getServiceId() == 0) {
			response.setResponseMessage("missing input");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		if (request.getCustomerId() == 0 || request.getIssue_description() == null
				|| request.getAppointmentDate() == null || request.getAppointmentTime() == null) {
			response.setResponseMessage("bad request - missing input!!!");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		String addedDateTime = String
				.valueOf(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant().toEpochMilli());

		User customer = this.userDao.findById(request.getCustomerId()).get();

		Service service = this.serviceDao.findById(request.getServiceId()).get();

		List<ServiceAppointment> existingAppointments = this.serviceAppointmentDao
				.findByServiceAndAppointmentDateAndAppointmentTimeAndStatusIn(service, request.getAppointmentDate(),
						request.getAppointmentTime(), Arrays.asList(ServiceAppointmentStatus.BOOKED.value()));

		if (!CollectionUtils.isEmpty(existingAppointments)) {
			response.setResponseMessage("Oops Sorry, Time Slot Not Available, please select another slot!!!");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		ServiceAppointment serviceAppointment = new ServiceAppointment();
		serviceAppointment.setCustomer(customer);
		serviceAppointment.setIssue_description(request.getIssue_description());
		serviceAppointment.setService(service);
		serviceAppointment.setStatus(ServiceAppointmentStatus.BOOKED.value());
		serviceAppointment.setAppointmentDate(request.getAppointmentDate());
		serviceAppointment.setAppointmentTime(request.getAppointmentTime());
		serviceAppointment.setAddedTime(addedDateTime);
		serviceAppointment.setServicingStatus(ServicingStatus.PENDING.value());
		serviceAppointment.setServiceAmount(BigDecimal.ZERO);
		serviceAppointment.setVehicleName(request.getVehicleName());
		serviceAppointment.setVehicleRegistration(request.getVehicleRegistration());

		ServiceAppointment savedAppointment = this.serviceAppointmentDao.save(serviceAppointment);

		if (savedAppointment == null) {
			throw new ServiceSaveFailedException("Failed to add the service appointment");
		}

		response.setResponseMessage("Service Appointment added successful!!!");
		response.setSuccess(true);

		return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);

	}

	public ResponseEntity<CommonApiResponse> closeServiceAppointment(Integer appointmentId) {

		LOG.info("request received for adding service request");

		CommonApiResponse response = new CommonApiResponse();

		if (appointmentId == 0) {
			response.setResponseMessage("missing input");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		ServiceAppointment appointment = this.serviceAppointmentDao.findById(appointmentId).get();
		appointment.setStatus(ServiceAppointmentStatus.CLOSE.value());

		ServiceAppointment savedAppointment = this.serviceAppointmentDao.save(appointment);

		if (savedAppointment == null) {
			throw new ServiceSaveFailedException("Failed to close the service appointment");
		}

		response.setResponseMessage("Service Appointment closed successful!!!");
		response.setSuccess(true);

		return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);

	}

	public ResponseEntity<CommonApiResponse> addJobCard(AddJobCardRequest request) {

		LOG.info("request received for adding service request");

		CommonApiResponse response = new CommonApiResponse();

		if (request == null || request.getServiceAppointmentId() == 0) {
			response.setResponseMessage("missing input");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		if (request.getName() == null || request.getDescription() == null || request.getAmount() == null) {
			response.setResponseMessage("bad request - missing input!!!");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		String addedDateTime = String
				.valueOf(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant().toEpochMilli());

		ServiceAppointment serviceAppointment = this.serviceAppointmentDao.findById(request.getServiceAppointmentId())
				.get();

		JobCard jobCard = new JobCard();
		jobCard.setAmount(request.getAmount());
		jobCard.setDescription(request.getDescription());
		jobCard.setName(request.getName());
		jobCard.setServiceAppointment(serviceAppointment);

		JobCard savedCard = this.jobCardDao.save(jobCard);

		if (savedCard == null) {
			response.setResponseMessage("Failed to save the job card");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		serviceAppointment.setServiceAmount(serviceAppointment.getServiceAmount().add(jobCard.getAmount()));
		ServiceAppointment savedAppointment = this.serviceAppointmentDao.save(serviceAppointment);

		if (savedAppointment == null) {
			throw new ServiceSaveFailedException("Failed to add the service appointment job card");
		}

		response.setResponseMessage("Service Appointment Job Card added successful!!!");
		response.setSuccess(true);

		return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);

	}

	public ResponseEntity<ServiceAppointmentResponse> fetchAllServiceAppointments() {

		LOG.info("Request received for fetching all services");

		ServiceAppointmentResponse response = new ServiceAppointmentResponse();

		List<ServiceAppointment> appointments = new ArrayList<>();

		appointments = this.serviceAppointmentDao.findAll();

		if (CollectionUtils.isEmpty(appointments)) {
			response.setResponseMessage("No Appointments found");
			response.setSuccess(false);

			return new ResponseEntity<ServiceAppointmentResponse>(response, HttpStatus.OK);
		}

		response.setAppointments(appointments);
		response.setResponseMessage("Service Appointments fetched successful");
		response.setSuccess(true);

		return new ResponseEntity<ServiceAppointmentResponse>(response, HttpStatus.OK);
	}

	public ResponseEntity<ServiceAppointmentResponse> fetchAllServiceAppointmentsByCustomer(int customerId) {

		LOG.info("Request received for fetching all services by customer id");

		ServiceAppointmentResponse response = new ServiceAppointmentResponse();

		List<ServiceAppointment> appointments = new ArrayList<>();

		User customer = this.userDao.findById(customerId).get();

		appointments = this.serviceAppointmentDao.findByCustomer(customer);

		if (CollectionUtils.isEmpty(appointments)) {
			response.setResponseMessage("No Appointments found");
			response.setSuccess(false);

			return new ResponseEntity<ServiceAppointmentResponse>(response, HttpStatus.OK);
		}

		response.setAppointments(appointments);
		response.setResponseMessage("Service Appointments fetched successful");
		response.setSuccess(true);

		return new ResponseEntity<ServiceAppointmentResponse>(response, HttpStatus.OK);
	}

	public ResponseEntity<ServiceAppointmentResponse> fetchAllServiceAppointmentsByServiceCenter(int serviceCenterId) {

		LOG.info("Request received for fetching all services by customer id");

		ServiceAppointmentResponse response = new ServiceAppointmentResponse();

		List<ServiceAppointment> appointments = new ArrayList<>();

		User serviceCenter = this.userDao.findById(serviceCenterId).get();

		appointments = this.serviceAppointmentDao.findByServiceCenter(serviceCenter);

		if (CollectionUtils.isEmpty(appointments)) {
			response.setResponseMessage("No Appointments found");
			response.setSuccess(false);

			return new ResponseEntity<ServiceAppointmentResponse>(response, HttpStatus.OK);
		}

		response.setAppointments(appointments);
		response.setResponseMessage("Service Appointments fetched successful");
		response.setSuccess(true);

		return new ResponseEntity<ServiceAppointmentResponse>(response, HttpStatus.OK);
	}

	public ResponseEntity<CommonApiResponse> payAndConfirmVehicleServicing(int appointmentId) {

		LOG.info("Request received for pay and confirm vehicle servicing");

		CommonApiResponse response = new CommonApiResponse();

		ServiceAppointment serviceAppointment = this.serviceAppointmentDao.findById(appointmentId).get();

		List<JobCard> jobCards = serviceAppointment.getJobCards();

		if (CollectionUtils.isEmpty(jobCards)) {
			response.setResponseMessage("Job Card not found!!!");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		BigDecimal payableAmount = serviceAppointment.getServiceAmount();

		if (payableAmount == null || payableAmount.compareTo(BigDecimal.ZERO) <= 0) {
			response.setResponseMessage("Job Card not found!!!");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);
		}

		User customer = this.userDao.findById(serviceAppointment.getCustomer().getId()).get();
		BigDecimal customerWallet = customer.getWalletAmount();

		User serviceCenter = this.userDao.findById(serviceAppointment.getService().getServiceCenter().getId()).get();
		BigDecimal serviceCenterWallet = serviceCenter.getWalletAmount();

		User firstAdmin = this.userDao.findByRoleAndStatus(UserRole.ROLE_ADMIN.value(), ActiveStatus.ACTIVE.value())
				.get(0);
		BigDecimal adminWallet = firstAdmin.getWalletAmount();

		// Convert commission percentage from integer to BigDecimal
		BigDecimal commissionPercentage = new BigDecimal(adminCommission).divide(new BigDecimal("100"));

		// Calculate commission and amount to service center
		BigDecimal commissionAmount = payableAmount.multiply(commissionPercentage);
		BigDecimal serviceCenterAmount = payableAmount.subtract(commissionAmount);

		// Update wallet balances
		adminWallet = adminWallet.add(commissionAmount);
		serviceCenterWallet = serviceCenterWallet.add(serviceCenterAmount);
		customerWallet = customerWallet.subtract(payableAmount);

		customer.setWalletAmount(customerWallet);
		serviceCenter.setWalletAmount(serviceCenterWallet);
		firstAdmin.setWalletAmount(adminWallet);

		this.userDao.save(customer);
		this.userDao.save(serviceCenter);
		this.userDao.save(firstAdmin);

		serviceAppointment.setStatus(ServiceAppointmentStatus.BOOKED_AND_PAID.value());
		this.serviceAppointmentDao.save(serviceAppointment);

		response.setResponseMessage("Servicing Amount Paid, Shortly we'll start your vehicle servicing!!!");
		response.setSuccess(true);

		return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);
	}

	public ResponseEntity<CommonApiResponse> updateTheAppointmentServicingStatus(int appointmentId, String status) {

		LOG.info("Request received for updating the appointment servicing status");

		CommonApiResponse response = new CommonApiResponse();

		ServiceAppointment serviceAppointment = this.serviceAppointmentDao.findById(appointmentId).get();

		serviceAppointment.setServicingStatus(status);
		this.serviceAppointmentDao.save(serviceAppointment);

		response.setResponseMessage("Appointemnt Servicing Status Updated Successful!!!");
		response.setSuccess(true);

		return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);
	}

}
