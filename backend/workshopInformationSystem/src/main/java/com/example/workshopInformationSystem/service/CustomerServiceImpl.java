package com.example.workshopInformationSystem.service;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import com.example.workshopInformationSystem.model.Customer;
import com.example.workshopInformationSystem.repository.CustomerRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerServiceImpl implements CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    @PersistenceContext
    private EntityManager entityManager;
    
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
            userData.put("customer", customer);
            return customers;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public Customer updateCustomer(Customer customer){
        try {            

            Customer customers = new Customer();
            customers.setId(customer.getId());
            customers.setName(customer.getName());
            customers.setDob(customer.getDob()); 
            customers.setGender(customer.getGender());
            customers.setAddress(customer.getAddress());
            customers.setPhone(customer.getPhone());
            customers.setEmail(customer.getEmail());
            
            customerRepository.save(customers);

            Map<String, Object> userData = new HashMap<>();
            userData.put("customer", customers);
            return customers;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public String deleteCustomer(Integer id){
        try {                        
            customerRepository.deleteById(id);
            return "Customer Deleted";
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to Delete Customer";
        }
    }

    @Override
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    @Override
    public Integer getCustomerTotal(Map<String, Object> reqData) {
        Long totalData = null;
        try {

            String key = reqData.get("keyword") != null ? reqData.get("keyword").toString().toLowerCase() : "";

            String query = "SELECT COUNT(a) FROM Customer a WHERE a.id>0 ";

            if(!key.isEmpty()){
                query += " AND (UPPER(a.name) LIKE '%" + key + "%' OR UPPER(a.email) LIKE '%" + key + "%' or UPPER(a.phone) LIKE '%" + key + "%') ";
            }
            Query queryResult = entityManager.createQuery(query,Long.class);

            totalData = (Long) queryResult.getSingleResult();
            return totalData.intValue();
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    @Override
    public Map<String, Object> getCustomerPagination(Map<String, Object> reqData, int totalData) {
        List<Customer> listUsers = new LinkedList<>();
        Map<String, Object> data = new HashMap<>();
        Map<String, Object> pagination = new HashMap<>();
        try {
            int limit =reqData.get("limit") != null ? Integer.parseInt(reqData.get("limit").toString()) : 0;
            int currentPage =reqData.get("page") !=null ? Integer.parseInt(reqData.get("page").toString()) : 0;
            String key = reqData.get("keyword") != null ? reqData.get("keyword").toString().toUpperCase() : "";
            Map<String, Object> filtered = new HashMap<>();
            String orderBy = "";
            String sort = "";
            if (reqData.get("orderBy")!=null) {
                filtered = (Map<String, Object>) reqData.get("orderBy");
                String field = filtered.get("field")!=null?filtered.get("field").toString():"";
                String sortField = filtered.get("sort")!=null?filtered.get("sort").toString():"";
                orderBy = !field.isEmpty() ? "a." + field : "";
                sort = !sortField.isEmpty()  ? sortField.toString().toUpperCase() : "";
            }
            int totalPage = (totalData % limit) == 0 ? (totalData/limit) : (totalData/limit) + 1;
            int offset = 0;
            int page = currentPage - 1;
            boolean hasPrev = false;
            boolean hasNext = false;
            if(currentPage > 0 && currentPage <= totalPage) offset = page*limit;
            if(currentPage < 2 && currentPage < totalPage) hasNext = true;
            if(currentPage >=2 && currentPage < totalPage){
                hasPrev = true;
                hasNext = true;
            }
            if(currentPage == totalPage) hasPrev = true;
            if(totalPage == 1){
                hasPrev = false;
                hasNext = false;
            }
            
            List<Customer> users = new LinkedList<>();
            String query = "SELECT a FROM Customer a WHERE a.id>0 ";

            if(!key.isEmpty()){
                query += " AND (UPPER(a.name) LIKE '%" + key + "%' OR UPPER(a.email) LIKE '%" + key + "%' or UPPER(a.phone) LIKE '%" + key + "%') ";
            }
            if(!orderBy.isEmpty() && !sort.isEmpty()) query += " ORDER BY " + orderBy + " " + sort;
            else query += " ORDER BY a.created DESC";
            System.out.println(query);
            users = entityManager.createQuery(query, Customer.class).setMaxResults(limit).setFirstResult(offset).getResultList();
            users.forEach((Customer customer) -> {
                listUsers.add(customer);
            });
            pagination.put("totalPage", totalPage);
            pagination.put("totalItem", totalData);
            pagination.put("limit", limit);
            pagination.put("currentPage", currentPage);
            pagination.put("hasPrevious", hasPrev);
            pagination.put("hasNext", hasNext);

            data.put("result", listUsers);
            data.put("pagination", pagination);
            return data;
        } catch (Exception e) {
            e.printStackTrace();
            data.put("result", listUsers);
            data.put("pagination", pagination);
            return data;
        }
    }
    
}