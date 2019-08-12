package com.revature.services;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import com.revature.models.Job;
import com.revature.models.PongGameRecord;
import com.revature.models.Users;
@Service
public class UsersService {
	UsersRepository usersRepository;
	@Autowired
	public UsersService(UsersRepository usersRepository) {
		this.usersRepository = usersRepository;

		// TODO Auto-generated constructor stub
	}
	public Users createUser(Users user) {
		// Business Logic
		// Ensuring the user has the privileges to create this thing
		// Ensuring that the values passed are valid
		System.out.println("USER CREATED WITH UID: " + user.getUserId());
		return usersRepository.save(user);
	}
	public List<Users> listAll() {
		System.out.println("ALL USERS SELECTED");
		return usersRepository.findAll();
	}
	public Users getById(int id) {
		System.out.println("USER SELECTED WITH UID: " + id);
		return usersRepository.findById(id)
				.orElseThrow(() -> 
					new HttpClientErrorException(HttpStatus.NOT_FOUND));
	}
	public Users updateUser(int id, Users user) {
		System.out.println("USER UPDATED WITH PARAMS: " + user.toString());
		if(usersRepository.existsById(id)) {
			return usersRepository.save(user);
		} else {
			throw new HttpClientErrorException(HttpStatus.NOT_FOUND);
		}
	}
	public String deleteUser(int id) {
		System.out.println("USER DELETED WITH UID: " + id);
		if(usersRepository.existsById(id)) {
			usersRepository.deleteById(id);
			return "DELETED USER WITH UID: " + id;
		} else {
			throw new HttpClientErrorException(HttpStatus.NOT_FOUND);
		}
	}


}
