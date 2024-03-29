package com.example.workshopInformationSystem.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.example.workshopInformationSystem.model.Customer;
import com.example.workshopInformationSystem.service.CustomerService;
import com.example.workshopInformationSystem.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/customer")
@CrossOrigin
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @Autowired
    private UserService userService;
    
    @PostMapping("/add")
    public String saveCustomer(@RequestBody Customer customer, @RequestHeader (name="Authorization") String token){
        if(userService.checkToken(token)==false)return "Invalid Token";
        customerService.saveCustomer(customer, userService.getId(token));
        return "New Customer is added";
    }

    @PostMapping("/update")
    public String updateCustomer(@RequestBody Customer customer, @RequestHeader (name="Authorization") String token){
        if(userService.checkToken(token)==false)return "Invalid Token";
        customerService.updateCustomer(customer, userService.getId(token));
        return "Customer is Updated";
    }

    @DeleteMapping("/delete/{id}")
    public String deleteCustomer(@RequestHeader (name="Authorization") String token, @PathVariable("id") Integer id){
        if(userService.checkToken(token)==false)return "Invalid Token";
        return customerService.deleteCustomer(id);
    }
    
    @PostMapping("/getList")
    public Map<String,Object> getCustomerPagination(@RequestHeader (name="Authorization") String token, @RequestBody Map<String, Object> reqData){
        Map<String,Object> result = new HashMap<>();
        if(userService.checkToken(token)==false){
            result.put("customer", "Invalid Token");
            return result;
        }
        int totalData = customerService.getCustomerTotal(reqData, userService.getId(token));
        result = customerService.getCustomerPagination(reqData, totalData, userService.getId(token));
        return result;
    }
    
    @GetMapping("/getAll")
    public List<Customer> getAllCustomers(@RequestHeader (name="Authorization") String token){
        return customerService.getAllCustomers(userService.getId(token));
    }

}