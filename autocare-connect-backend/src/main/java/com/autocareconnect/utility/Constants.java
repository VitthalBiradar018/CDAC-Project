package com.autocareconnect.utility;

public class Constants {

	public enum UserRole {
		ROLE_CUSTOMER("Customer"), ROLE_ADMIN("Admin"), ROLE_SERVICE_CENTER("Service Center");

		private String role;

		private UserRole(String role) {
			this.role = role;
		}

		public String value() {
			return this.role;
		}
	}

	public enum ActiveStatus {
		ACTIVE("Active"), DEACTIVATED("Deactivated");

		private String status;

		private ActiveStatus(String status) {
			this.status = status;
		}

		public String value() {
			return this.status;
		}
	}

	public enum TimeSlot {
		NINE_TO_TEN_AM("09:00 - 10:00 am"), TEN_TO_ELEVEN_AM("10:00 - 11:00 am"),
		ELEVEN_TO_TWELLVE_AM("11:00 - 12:00 am"), TWELVE_TO_ONE_PM("12:00 - 01:00 pm"),
		ONE_TO_TWO_PM("01:00 - 02:00 pm"), TWO_TO_THREE_PM("02:00 - 03:00 pm"), THREE_TO_FOUR_PM("03:00 - 04:00 pm"),
		FOUR_TO_FIVE_PM("04:00 - 05:00 pm"), FIVE_TO_SIX_PM("05:00 - 06:00 pm"), SIX_TO_SEVEN_PM("06:00 - 07:00 pm"),
		SEVEN_TO_EIGHT_PM("07:00 - 08:00 pm"), EIGHT_TO_NINE_PM("08:00 - 09:00 pm"), NINE_TO_TEN_PM("09:00 - 10:00 pm");

		private String time;

		private TimeSlot(String time) {
			this.time = time;
		}

		public String value() {
			return this.time;
		}

	}

	public enum ServiceAppointmentStatus {
		BOOKED("Booked"), BOOKED_AND_PAID("Booked & Paid"), CLOSE("Close");

		private String status;

		private ServiceAppointmentStatus(String status) {
			this.status = status;
		}

		public String value() {
			return this.status;
		}
	}

	public enum ServicingStatus {
		PENDING("Pending"), WORKING("Working"), DONE("Done");

		private String status;

		private ServicingStatus(String status) {
			this.status = status;
		}

		public String value() {
			return this.status;
		}
	}

	public enum PaymentGatewayTxnType {
		CREATE_ORDER("Create Order"), PAYMENT("Payment");

		private String type;

		private PaymentGatewayTxnType(String type) {
			this.type = type;
		}

		public String value() {
			return this.type;
		}
	}

	public enum PaymentGatewayTxnStatus {
		SUCCESS("Success"), FAILED("Failed");

		private String type;

		private PaymentGatewayTxnStatus(String type) {
			this.type = type;
		}

		public String value() {
			return this.type;
		}
	}

}
