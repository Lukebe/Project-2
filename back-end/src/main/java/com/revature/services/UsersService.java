package com.revature.services;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import com.revature.models.Job;
import com.revature.models.Product;
import com.revature.models.Users;
import com.revature.utils.Utils;
@Service
public class UsersService {
	UsersRepository usersRepository;
	@Autowired
	public UsersService(UsersRepository usersRepository) {
		this.usersRepository = usersRepository;
	}
	
	public UsersService() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Users createUser(Users user) {
		// Business Logic
		// Ensuring the user has the privileges to create this thing
		// Ensuring that the values passed are valid
		System.out.println("USER CREATED WITH UID: " + user.getUserId());
		return usersRepository.save(user);
	}
	public Page<Users> listAll(Pageable pageable) {
		System.out.println("ALL USERS SELECTED");
		return usersRepository.findAll(pageable);
	}
	public Users getById(int id) {
		System.out.println("USER SELECTED WITH UID: " + id);
		return usersRepository.findById(id)
				.orElseThrow(() -> 
				new EmptyResultDataAccessException(0));
	}
	public Users updateUser(int id, Users user) {
		System.out.println("USER UPDATED WITH PARAMS: " + user.toString());
		Users oldUser = usersRepository.findById(id).orElseThrow(() ->
		new EmptyResultDataAccessException(1));
		Users newUser = (Users) Utils.merge(oldUser, user);
		//Save the product
		return usersRepository.save(newUser);
		//Retrieve it again to show joined values correctly
		//return usersRepository.findById(id).orElseThrow(() ->
		//new HttpClientErrorException(HttpStatus.NOT_FOUND));
	}
	public String deleteUser(int id) {
		System.out.println("USER DELETED WITH UID: " + id);
		if(usersRepository.existsById(id)) {
			usersRepository.deleteById(id);
			return "DELETED USER WITH UID: " + id;
		} else {
			throw new EmptyResultDataAccessException(0);
		}
	}


}
