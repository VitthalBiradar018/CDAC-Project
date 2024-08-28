package com.autocareconnect;

import java.math.BigDecimal;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.autocareconnect.dao.UserDao;
import com.autocareconnect.entity.User;
import com.autocareconnect.utility.Constants.ActiveStatus;
import com.autocareconnect.utility.Constants.UserRole;

@SpringBootApplication
public class AutocareConnectBackendApplication implements CommandLineRunner {

	private final Logger LOG = LoggerFactory.getLogger(AutocareConnectBackendApplication.class);

	@Autowired
	private UserDao userDao;

	@Autowired
	private PasswordEncoder passwordEncoder;

	public static void main(String[] args) {
		SpringApplication.run(AutocareConnectBackendApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

		User admin = this.userDao.findByEmailIdAndRoleAndStatus("admin@autocare.com", UserRole.ROLE_ADMIN.value(),
				ActiveStatus.ACTIVE.value());

		if (admin == null) {

			LOG.info("Admin not found in system, so adding default admin");

			User user = new User();
			user.setFirstName("Admin");
			user.setLastName("Admin");
			user.setEmailId("admin@autocare.com");
			user.setPassword(passwordEncoder.encode("123456"));
			user.setRole(UserRole.ROLE_ADMIN.value());
			user.setWalletAmount(BigDecimal.ZERO);
			user.setStatus(ActiveStatus.ACTIVE.value());

			this.userDao.save(user);

		}

	}

}
