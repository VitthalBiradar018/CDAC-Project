package com.autocareconnect.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.autocareconnect.entity.Service;
import com.autocareconnect.entity.ServiceAppointment;
import com.autocareconnect.entity.User;

@Repository
public interface ServiceAppointmentDao extends JpaRepository<ServiceAppointment, Integer> {

	List<ServiceAppointment> findByCustomer(User customer);

	List<ServiceAppointment> findByService(Service service);

	@Query("SELECT a FROM ServiceAppointment a WHERE a.service.serviceCenter = :serviceCenter")
	List<ServiceAppointment> findByServiceCenter(User serviceCenter);

	List<ServiceAppointment> findByServiceAndAppointmentDateAndAppointmentTimeAndStatusIn(Service service,
			String appointmentDate, String appointmentTime, List<String> statuses);

}
