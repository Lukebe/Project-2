package com.revature;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Bootstrap the Spring boot application
 * The process of starting the spring boot app server using a main method
 * 
 * @SpringBootApplication is a convenience annotation that combines three other annotations:
 * 	@configuration - Act as a configuration class
 * 	@EnableAutoConfiguration - Allows Spring Boot to autoconfigure
 * 	@componentScan - scans components from this package.
 * @author Luke Behnke
 *
 */

@SpringBootApplication
public class Application {
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
}
