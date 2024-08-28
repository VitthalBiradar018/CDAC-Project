package com.autocareconnect.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.autocareconnect.dao.UserDao;
import com.autocareconnect.entity.User;
import com.autocareconnect.utility.Constants.ActiveStatus;

@Component
public class CustomUserDetailsService implements UserDetailsService {

	@Autowired
	private UserDao userDao;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

		User user = this.userDao.findByEmailIdAndStatus(email, ActiveStatus.ACTIVE.value());

		CustomUserDetails customUserDetails = new CustomUserDetails(user);

		return customUserDetails;

	}
}
