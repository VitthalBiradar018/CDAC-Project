package com.autocareconnect.dto;

import com.autocareconnect.pg.RazorPayPaymentRequest;

public class UserWalletUpdateResponse extends CommonApiResponse {

	private RazorPayPaymentRequest razorPayRequest;

	public RazorPayPaymentRequest getRazorPayRequest() {
		return razorPayRequest;
	}

	public void setRazorPayRequest(RazorPayPaymentRequest razorPayRequest) {
		this.razorPayRequest = razorPayRequest;
	}

}
