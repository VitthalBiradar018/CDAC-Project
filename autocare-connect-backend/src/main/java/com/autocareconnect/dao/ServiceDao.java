package com.autocareconnect.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.autocareconnect.entity.Category;
import com.autocareconnect.entity.Service;
import com.autocareconnect.entity.User;

@Repository
public interface ServiceDao extends JpaRepository<Service, Integer> {

	List<Service> findByStatus(String status);

	List<Service> findByServiceCenter(User serviceCenter);

	List<Service> findByCategoryAndStatus(Category category, String status);

}
