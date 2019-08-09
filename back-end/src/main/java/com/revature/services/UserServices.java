package com.revature.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServices {
	UserRepository userRepository;
	
	@Autowired
	public void UserService (UserRepository userRepository) {
		this.userRepository = userRepository;
	}
}
