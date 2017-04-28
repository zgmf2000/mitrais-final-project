package com.mitrais.finaltest;

import com.mitrais.finaltest.employee.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MitraisFinalTestApplication {

	@Autowired
	private EmployeeRepository repository;

	public static void main(String[] args) {
		SpringApplication.run(MitraisFinalTestApplication.class, args);
	}

}
