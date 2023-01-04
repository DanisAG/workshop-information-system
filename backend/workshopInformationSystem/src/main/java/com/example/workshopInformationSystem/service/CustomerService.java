package com.example.workshopInformationSystem.service;

import java.util.List;
import java.util.Map;

import com.example.workshopInformationSystem.model.Customer;

public interface CustomerService {
    public Customer saveCustomer(Customer customer, Integer userId);
    public Customer updateCustomer(Customer customer, Integer userId);
    public String deleteCustomer(Integer id);
    public Integer getCustomerTotal(Map<String, Object> reqData, Integer userId);
    public Map<String, Object> getCustomerPagination(Map<String, Object> reqData, int totalData, Integer userId);
    public List<Customer> getAllCustomers(Integer userId);
}