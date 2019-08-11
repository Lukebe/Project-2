package com.revature.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature.models.User;


@Service
public class UserServices {
	
	UserRepository userRepository;
	
	@Autowired
	public UserServices(UserRepository userRepository) {
		super();
		this.userRepository = userRepository;
	}
	
	public List<User> getAllUsers() {
		
		return userRepository.findAll();			
	}
	
	public User createUser(User user) {
		System.out.println(user);

		return userRepository.save(user);
	}
	
	public Optional<User> findOne(Long userid) {
		return userRepository.findById(userid);
	}
}
