package com.autocareconnect.dto;

import java.math.BigDecimal;

import org.springframework.beans.BeanUtils;
import org.springframework.web.multipart.MultipartFile;

import com.autocareconnect.entity.Service;

import lombok.Data;

@Data
public class AddServiceRequest {

	private int id;

	private String name;

	private String description;

	private Integer categoryId;

	private Integer serviceCenterId;

	private BigDecimal minPrice;

	private Integer deliveryTime; // in days

	private MultipartFile image1;

	private MultipartFile image2;

	private MultipartFile image3;

	public static Service toServiceEntity(AddServiceRequest request) {
		Service service = new Service();
		BeanUtils.copyProperties(request, service, "categoryId", "serviceCenterId", "image1", "image2", "image3");
		return service;
	}

}
