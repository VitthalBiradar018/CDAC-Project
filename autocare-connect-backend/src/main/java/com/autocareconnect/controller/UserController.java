package com.autocareconnect.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.autocareconnect.dto.CommonApiResponse;
import com.autocareconnect.dto.RegisterUserRequestDto;
import com.autocareconnect.dto.UserLoginRequest;
import com.autocareconnect.dto.UserLoginResponse;
import com.autocareconnect.dto.UserResponseDto;
import com.autocareconnect.dto.UserStatusUpdateRequestDto;
import com.autocareconnect.dto.UserWalletUpdateResponse;
import com.autocareconnect.entity.User;
import com.autocareconnect.pg.RazorPayPaymentResponse;
import com.autocareconnect.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.razorpay.RazorpayException;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("api/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

	@Autowired
	private UserService userService;

	// RegisterUserRequestDto, we will set only email, password & role from UI
	@PostMapping("/admin/register")
	@Operation(summary = "Api to register Admin")
	public ResponseEntity<CommonApiResponse> registerAdmin(@RequestBody RegisterUserRequestDto request) {
		return userService.registerAdmin(request);
	}

	// for customer and manager register
	@PostMapping("register")
	@Operation(summary = "Api to register customer or tech expert user")
	public ResponseEntity<CommonApiResponse> registerUser(@RequestBody RegisterUserRequestDto request) {
		return this.userService.registerUser(request);
	}

	@PostMapping("login")
	@Operation(summary = "Api to login any User")
	public ResponseEntity<UserLoginResponse> login(@RequestBody UserLoginRequest userLoginRequest) {
		return userService.login(userLoginRequest);
	}

	@GetMapping("/fetch/role-wise")
	@Operation(summary = "Api to get Users By Role")
	public ResponseEntity<UserResponseDto> fetchAllUsersByRole(@RequestParam("role") String role)
			throws JsonProcessingException {
		return userService.getUsersByRole(role);
	}

	@PutMapping("update/status")
	@Operation(summary = "Api to update the user status")
	public ResponseEntity<CommonApiResponse> updateUserStatus(@RequestBody UserStatusUpdateRequestDto request) {
		return userService.updateUserStatus(request);
	}

	@GetMapping("/fetch/user-id")
	@Operation(summary = "Api to get User Detail By User Id")
	public ResponseEntity<UserResponseDto> fetchUserById(@RequestParam("userId") int userId) {
		return userService.getUserById(userId);
	}

	@DeleteMapping("/delete/service-center")
	@Operation(summary = "Api to delete the service center")
	public ResponseEntity<CommonApiResponse> deleteServiceCenter(
			@RequestParam("serviceCenterId") Integer serviceCenterId) throws JsonProcessingException {
		return userService.deleteServiceCenter(serviceCenterId);
	}

	@PutMapping("update/wallet")
	@Operation(summary = "Api to create the razor pay order")
	public ResponseEntity<UserWalletUpdateResponse> createRazorPayOrder(@RequestBody User user)
			throws RazorpayException {
		return userService.createRazorPayOrder(user);
	}

	@PutMapping("razorpPay/response")
	@Operation(summary = "Api to update the user wallet based on razorpay response")
	public ResponseEntity<CommonApiResponse> updateUserWallet(@RequestBody RazorPayPaymentResponse razorPayResponse)
			throws RazorpayException {
		return userService.handleRazorPayPaymentResponse(razorPayResponse);
	}

}
