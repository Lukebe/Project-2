package com.revature.utils;

import java.security.NoSuchAlgorithmException;

import org.mindrot.jbcrypt.BCrypt;

public class PasswordEncrypt {
	public static String encrypt(String password) {
		String encryptedPassword = BCrypt.hashpw(password, BCrypt.gensalt(12));
		return encryptedPassword;
	}
	public static Boolean check(String encryptedPassword, String nonEncryptedPassword) {
		return BCrypt.checkpw(nonEncryptedPassword, encryptedPassword);
	}
}
