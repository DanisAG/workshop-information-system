package com.example.workshopInformationSystem.service;

import java.util.List;
import java.util.Map;

import com.example.workshopInformationSystem.model.Customer;

public interface CustomerService {
    public Customer saveCustomer(Customer customer);
    public Customer updateCustomer(Customer customer);
    public String deleteCustomer(Integer id);
    public Integer getCustomerTotal(Map<String, Object> reqData);
    public Map<String, Object> getCustomerPagination(Map<String, Object> reqData, int totalData);
    public List<Customer> getAllCustomers();
}