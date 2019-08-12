package com.revature.controllers;

import java.util.List;

import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.revature.models.PongGameRecord;
import com.revature.services.PongGameService;

@RestController
@RequestMapping("pong-game-record")
public class PongGameController {
	
	PongGameService pongGameService;
	
	@Autowired
	public PongGameController(PongGameService pongGameService) {
		super();
		this.pongGameService = pongGameService;
	}



	@PostMapping("")
	public PongGameRecord createRecord(@RequestBody PongGameRecord record) {
		PongGameRecord newRecord = pongGameService.createRecord(record);
		return newRecord;
	}
	
	@GetMapping("/{id}")
	public PongGameRecord getRecord(@PathVariable int id) {
		return pongGameService.getById(id);
	}
	
	@GetMapping(params = "winner")
	public List<PongGameRecord> getWinsByWinner(@PathParam(value="winner") String winner) {
		return pongGameService.getGamesWonBy(winner);
	}
}











