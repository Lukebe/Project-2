package com.revature.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.revature.services.PetServices;

@RestController
@RequestMapping("pet")
@CrossOrigin(allowedHeaders = "*", methods = {RequestMethod.POST})
public class PetController {
	
	private PetServices petServices;
	
	@Autowired
	public PetController(PetServices petServices) {
		super();
		this.petServices = petServices;
	}
	
	@GetMapping(path="", produces = "application/json")
	public String allPets() {
		return "{dog: bob, cat: sam, bird: tom}";
	}
}
