package com.example.workshopInformationSystem.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.example.workshopInformationSystem.model.Customer;
import com.example.workshopInformationSystem.repository.CustomerRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerServiceImpl implements CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public Customer saveCustomer(Customer customer){
        try {

            Customer customers = new Customer();
            customers.setName(customer.getName());
            customers.setDob(customer.getDob()); 
            customers.setGender(customer.getGender());
            customers.setAddress(customer.getAddress());
            customers.setPhone(customer.getPhone());
            customers.setEmail(customer.getEmail());

            customerRepository.save(customers);

            Map<String, Object> userData = new HashMap<>();
            userData.put("user", customer);
            return customers;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

}