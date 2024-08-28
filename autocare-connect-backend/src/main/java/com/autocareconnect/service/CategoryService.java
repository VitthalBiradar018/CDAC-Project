package com.autocareconnect.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import com.autocareconnect.dao.CategoryDao;
import com.autocareconnect.dao.ServiceDao;
import com.autocareconnect.dto.CategoryResponseDto;
import com.autocareconnect.dto.CommonApiResponse;
import com.autocareconnect.entity.Category;
import com.autocareconnect.entity.Service;
import com.autocareconnect.exception.CategorySaveFailedException;
import com.autocareconnect.utility.Constants.ActiveStatus;

import jakarta.transaction.Transactional;

@Component
@Transactional
public class CategoryService {

	private final Logger LOG = LoggerFactory.getLogger(CategoryService.class);

	@Autowired
	private CategoryDao categoryDao;

	@Autowired
	private ServiceDao serviceDao;

	public ResponseEntity<CommonApiResponse> addCategory(Category category) {

		LOG.info("Request received for add category");

		CommonApiResponse response = new CommonApiResponse();

		if (category == null) {
			response.setResponseMessage("missing input");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		category.setStatus(ActiveStatus.ACTIVE.value());

		Category savedCategory = this.categoryDao.save(category);

		if (savedCategory == null) {
			throw new CategorySaveFailedException("Failed to add category");
		}

		response.setResponseMessage("Category Added Successful");
		response.setSuccess(true);

		return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);

	}

	public ResponseEntity<CommonApiResponse> updateCategory(Category category) {

		LOG.info("Request received for add category");

		CommonApiResponse response = new CommonApiResponse();

		if (category == null) {
			response.setResponseMessage("missing input");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		if (category.getId() == 0) {
			response.setResponseMessage("missing category Id");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		category.setStatus(ActiveStatus.ACTIVE.value());
		Category savedCategory = this.categoryDao.save(category);

		if (savedCategory == null) {
			throw new CategorySaveFailedException("Failed to update category");
		}

		response.setResponseMessage("Category Updated Successful");
		response.setSuccess(true);

		return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);

	}

	public ResponseEntity<CategoryResponseDto> fetchAllCategory() {

		LOG.info("Request received for fetching all categories");

		CategoryResponseDto response = new CategoryResponseDto();

		List<Category> categories = new ArrayList<>();

		categories = this.categoryDao.findByStatusIn(Arrays.asList(ActiveStatus.ACTIVE.value()));

		if (CollectionUtils.isEmpty(categories)) {
			response.setResponseMessage("No Categories found");
			response.setSuccess(false);

			return new ResponseEntity<CategoryResponseDto>(response, HttpStatus.OK);
		}

		response.setCategories(categories);
		response.setResponseMessage("Category fetched successful");
		response.setSuccess(true);

		return new ResponseEntity<CategoryResponseDto>(response, HttpStatus.OK);
	}

	public ResponseEntity<CommonApiResponse> deleteCategory(int categoryId) {

		LOG.info("Request received for deleting category");

		CommonApiResponse response = new CommonApiResponse();

		if (categoryId == 0) {
			response.setResponseMessage("missing category Id");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		Category category = this.categoryDao.findById(categoryId).get();

		if (category == null) {
			response.setResponseMessage("category not found");
			response.setSuccess(false);

			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		List<Service> services = this.serviceDao.findByCategoryAndStatus(category, ActiveStatus.ACTIVE.value());

		category.setStatus(ActiveStatus.DEACTIVATED.value());
		Category updatedCategory = this.categoryDao.save(category);

		if (updatedCategory == null) {
			throw new CategorySaveFailedException("Failed to delete the Category");
		}

		if (!CollectionUtils.isEmpty(services)) {

			for (Service service : services) {
				service.setStatus(ActiveStatus.DEACTIVATED.value());
			}

			List<Service> updatedService = this.serviceDao.saveAll(services);

			if (CollectionUtils.isEmpty(updatedService)) {
				throw new CategorySaveFailedException("Failed to delete the Category");
			}

		}

		response.setResponseMessage("Category & all its Services Deleted Successful");
		response.setSuccess(true);

		return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);

	}

}
