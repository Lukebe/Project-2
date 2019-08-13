package com.revature.controllers;

import java.sql.SQLException;

import javax.validation.ConstraintViolationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;

import com.revature.models.Users;
import com.revature.services.UsersService;

@RestController
@RequestMapping("users")
@CrossOrigin(allowedHeaders = "*", methods = {RequestMethod.POST,RequestMethod.GET,RequestMethod.PATCH,RequestMethod.DELETE})
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
	@GetMapping("")
	public Page<Users> getAllUsers(Pageable pageable) {
		Page<Users> userList = usersService.listAll(pageable);
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
	/* EXCEPTION HANDLERS */
	  @ExceptionHandler({SQLException.class,DataAccessException.class})
	  public ResponseEntity<String> databaseError() {
		  return ResponseEntity
				  .status(500)
				  .body("Database Error");
	  }
	  @ExceptionHandler(HttpClientErrorException.class)
	  public ResponseEntity<String> handleClientError(HttpClientErrorException e) {
		  return ResponseEntity
				  .status(e.getStatusCode())
				  .body(e.getMessage());
	  }
	  @ExceptionHandler(HttpServerErrorException.class)
	  public ResponseEntity<String> handleServerError(HttpServerErrorException e) {
		  return ResponseEntity
				  .status(e.getStatusCode())
				  .body(e.getMessage());
	  }
	  @ExceptionHandler({NumberFormatException.class, HttpMessageNotReadableException.class,
		  ConstraintViolationException.class})
	  public ResponseEntity<String> badRequest() {
		  return ResponseEntity
				  .status(400)
				  .body("Bad Parameters");
	  }
}
