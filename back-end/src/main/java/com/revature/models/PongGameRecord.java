package com.revature.models;

import java.time.Duration;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="PONG_GAME_RECORDS")
public class PongGameRecord {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	// ??? 
	private Duration duration;
	private String winner;
	
	@Column(name="SCORE_WINNER")
	private int scoreWinner;
	
	@Column(name="SCORE_LOSER")
	private int scoreLoser;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Duration getDuration() {
		return duration;
	}

	public void setDuration(Duration duration) {
		this.duration = duration;
	}

	public String getWinner() {
		return winner;
	}

	public void setWinner(String winner) {
		this.winner = winner;
	}

	public int getScoreWinner() {
		return scoreWinner;
	}

	public void setScoreWinner(int scoreWinner) {
		this.scoreWinner = scoreWinner;
	}

	public int getScoreLoser() {
		return scoreLoser;
	}

	public void setScoreLoser(int scoreLoser) {
		this.scoreLoser = scoreLoser;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((duration == null) ? 0 : duration.hashCode());
		result = prime * result + id;
		result = prime * result + scoreLoser;
		result = prime * result + scoreWinner;
		result = prime * result + ((winner == null) ? 0 : winner.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		PongGameRecord other = (PongGameRecord) obj;
		if (duration == null) {
			if (other.duration != null)
				return false;
		} else if (!duration.equals(other.duration))
			return false;
		if (id != other.id)
			return false;
		if (scoreLoser != other.scoreLoser)
			return false;
		if (scoreWinner != other.scoreWinner)
			return false;
		if (winner == null) {
			if (other.winner != null)
				return false;
		} else if (!winner.equals(other.winner))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "PongGameRecord [id=" + id + ", duration=" + duration + ", winner=" + winner + ", scoreWinner="
				+ scoreWinner + ", scoreLoser=" + scoreLoser + "]";
	}

	public PongGameRecord(int id, Duration duration, String winner, int scoreWinner, int scoreLoser) {
		super();
		this.id = id;
		this.duration = duration;
		this.winner = winner;
		this.scoreWinner = scoreWinner;
		this.scoreLoser = scoreLoser;
	}

	public PongGameRecord() {
		super();
		// TODO Auto-generated constructor stub
	}

}
