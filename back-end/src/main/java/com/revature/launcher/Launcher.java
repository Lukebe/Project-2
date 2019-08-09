package com.revature.launcher;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;
import org.hibernate.service.ServiceRegistry;
import org.hibernate.type.StringType;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.revature.Application;

public class Launcher {

static SessionFactory sessionFactory;
	public static void main(String[] args) {
//		sessionFactory = configure();
		SpringApplication.run(Application.class, args);
	}
//	public static SessionFactory configure() {
//		// Configuration is one of the primary interfaces of Hibernate
//		
//		// Builder pattern
//		Configuration configuration = new Configuration()
//			.configure() // Loads the configuration from hibernate.cfg.xml
//			.addAnnotatedClass(User.class);
////			.addAnnotatedClass(Cave.class)
////			.addAnnotatedClass(HoneyJar.class); 
////			.setProperty("hibernate.connection.username", System.getenv("DB_PASSWORD")); 
//			// Used to set property values programmatically
//			
//			
//			
//		ServiceRegistry serviceRegistry = new StandardServiceRegistryBuilder()
//				.applySettings(configuration.getProperties()).build();
//		return configuration.buildSessionFactory(serviceRegistry);
//	}
}
