package com.revature.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.revature.models.User;
import com.revature.services.UserServices;

@RestController
@RequestMapping("/teamd")
public class UserController {
	
	private UserServices userServices;
	
	@Autowired
	public UserController(UserServices userServices) {
		super();
		this.userServices = userServices;
	}
	
	@GetMapping("/users")
	public List<User> getAllUsers() {
		System.out.println("here I am");
		return userServices.getAllUsers();
	}
	
//	@GetMapping("/{id}")
//	public ResponseEntity<Optional<User>> getById(@PathVariable(value="id") Long userid) {
//		System.out.println("here I am");
//		Optional<User> user = userServices.findOne(userid);
//		return ResponseEntity.ok().body(user);
//	}
//	
//	@PostMapping("")
//	public void CreateUser(@RequestBody User user) {
//		User newUser = userServices.createUser(user);
////		return newUser;
//	}
//	
//	@ExceptionHandler(HttpClientErrorException.class)
//	public ResponseEntity<String> errorHandler(HttpClientErrorException e) {
//		return ResponseEntity.status(e.getStatusCode()).body(e.getMessage());
//	}
}
