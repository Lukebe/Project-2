package com.revature.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PetServices {
	PetRepository petRepository;
	
	@Autowired
	public void PetService (PetRepository petRepository) {
		this.petRepository = petRepository;
	}
	
}
