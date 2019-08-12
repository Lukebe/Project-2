package com.revature.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import com.revature.models.PongGameRecord;

@Service
public class PongGameService {

	PongGameRepository pongGameRepository;
	
	@Autowired
	public PongGameService(PongGameRepository pongGameRepository) {
		super();
		this.pongGameRepository = pongGameRepository;
	}

	public PongGameRecord createRecord(PongGameRecord record) {
		// Business Logic
		// Ensuring the user has the privileges to create this thing
		// Ensuring that the values passed are valid
		return pongGameRepository.save(record);
	}

	public PongGameRecord getById(int id) {
		return pongGameRepository.findById(id)
				.orElseThrow(() -> 
					new HttpClientErrorException(HttpStatus.NOT_FOUND));
	}

	public List<PongGameRecord> getGamesWonBy(String winner) {
		return pongGameRepository.findAllByWinner(winner);
	}
}
