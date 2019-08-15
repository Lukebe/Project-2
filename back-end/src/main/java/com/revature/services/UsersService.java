package com.revature.services;


import java.awt.List;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import com.revature.models.Users;
import com.revature.security.JwtTokenProvider;
import com.revature.utils.PasswordEncrypt;
import com.revature.utils.Utils;
@Service
public class UsersService implements UserDetailsService{
	@Autowired
	UsersRepository usersRepository;
	
	public Users createUser(Users user) {
		System.out.println("USER CREATED WITH UID: " + user.getUserId());
		String oldpassword = user.getPassword();
		user.setPassword(PasswordEncrypt.encrypt(oldpassword));
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
				new HttpClientErrorException(HttpStatus.NOT_FOUND));
	}
	public Users updateUser(int id, Users user) {
		System.out.println("USER UPDATED WITH PARAMS: " + user.toString());
		Users oldUser = usersRepository.findById(id).orElseThrow(() ->
		new HttpClientErrorException(HttpStatus.NOT_FOUND));
		Users newUser = (Users) Utils.merge(oldUser, user);
		//Save the product
		String oldpassword = newUser.getPassword();
		newUser.setPassword(PasswordEncrypt.encrypt(oldpassword));
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
			throw new HttpClientErrorException(HttpStatus.NOT_FOUND);
		}
	}
	public Page<Users> performSearch(Specification<Users> spec, Pageable pageable) {
		return usersRepository.findAll(spec, pageable);
	}
	public Users getUserByUsername(String username) {
		Users user = usersRepository.findByUsername(username);
		return user;
	}
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users user = usersRepository.findByUsername(username);
        Collection<GrantedAuthority> roleArray = new ArrayList<GrantedAuthority>();
        roleArray.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
        return new org.springframework.security.core.userdetails.User(user.getUsername(),
                user.getPassword(), roleArray);
    }

}
