package com.example.workshopInformationSystem.service;

import java.util.List;

import com.example.workshopInformationSystem.model.Customer;

public interface CustomerService {
    public Customer saveCustomer(Customer customer);
    public List<Customer> getAllCustomers();
}