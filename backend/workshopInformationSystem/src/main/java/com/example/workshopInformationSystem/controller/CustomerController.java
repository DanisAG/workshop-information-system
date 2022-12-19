package com.example.workshopInformationSystem.controller;

import java.util.List;

import com.example.workshopInformationSystem.model.Customer;
import com.example.workshopInformationSystem.service.CustomerService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/customer")
@CrossOrigin
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @PostMapping("/add")
    public String add(@RequestBody Customer customer){
        customerService.saveCustomer(customer);
        return "New Customer is added";
    }

    @GetMapping("/getAll")
    public List<Customer> getAllCustomer(){
        return customerService.getAllCustomers();
    }

}