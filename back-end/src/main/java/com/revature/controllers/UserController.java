package com.revature.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;

import com.revature.services.UserServices;

@RestController
@RequestMapping("users")
@CrossOrigin(allowedHeaders = "*", methods = {RequestMethod.POST})
public class UserController {
	
	private UserServices userServices;
	
	@Autowired
	public UserController(UserServices userServices) {
		super();
		this.userServices = userServices;
	}
	
	@GetMapping(path="", produces = "text/html")
	public String allUsers() {
		MyObject var = new MyObject("jack", "jill");
		System.out.println(var);
		return "<!DOCTYPE html><html><head></head><body><h1>Hello!</h1></body></html>";
	}
	@ExceptionHandler(HttpClientErrorException.class)
	public ResponseEntity<String> errorHandler(HttpClientErrorException e) {
		return ResponseEntity.status(e.getStatusCode()).body(e.getMessage());
	}
}

class MyObject {
	String x;
	String y;

	public MyObject(String x, String y) {
		this.x = x;
		this.y = y;
		
	}

	@Override
	public String toString() {
		return "MyObject [x=" + x + ", y=" + y + "]";
	}

	public String getX() {
		return x;
	}

	public void setX(String x) {
		this.x = x;
	}

	public String getY() {
		return y;
	}

	public void setY(String y) {
		this.y = y;
	}
	public MyObject() {
		super();
	}

}
