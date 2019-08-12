package com.revature.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.revature.models.Job;
import com.revature.models.Users;
import com.revature.services.UsersService;

@RestController
@RequestMapping("users")
public class UsersController {
	UsersService usersService;
	@Autowired
	public UsersController(UsersService usersService) {
		this.usersService = usersService;
	}
	@PostMapping("")
	public  Users createUser(@RequestBody Users user) {
		Users newUser = usersService.createUser(user);
		return newUser;
	}
	@GetMapping("/me")
	public  Users getMe() {
		return new Users(0, null, null, null, null, null, 0);
	}
	@GetMapping("")
	public List<Users> getAllUsers() {
		List<Users> userList = usersService.listAll();
		return userList;
	}
	@PatchMapping("")
	public  Users updateUser(@RequestBody Users user) {
		Users updatedUser = usersService.updateUser(user.getUserId(), user);
		return updatedUser;
	}
	@DeleteMapping("/{id}")
	public String deleteUserById(@PathVariable int id) {
		String result = usersService.deleteUser(id);
		return result;
	}
	@GetMapping("/{id}")
	public Users getUserById(@PathVariable int id) {
		Users user = usersService.getById(id);
		return user;
	}
}
