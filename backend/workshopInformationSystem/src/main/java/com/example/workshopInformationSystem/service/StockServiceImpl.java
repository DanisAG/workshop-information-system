package com.example.workshopInformationSystem.service;

import java.util.Date;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import com.example.workshopInformationSystem.model.Stock;
import com.example.workshopInformationSystem.repository.StockRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StockServiceImpl implements StockService {
    @Autowired
    private StockRepository stockRepository;

    @PersistenceContext
    private EntityManager entityManager;
    
    @Override
    public Stock saveStock(Stock stock){
        try {            

            Stock stocks = new Stock();
            stocks.setName(stock.getName());
            stocks.setPrice(stock.getPrice()); 
            stocks.setQuantity(stock.getQuantity());
            stocks.setCreated(new Date());
            stockRepository.save(stocks);

            Map<String, Object> userData = new HashMap<>();
            userData.put("user", stock);
            return stocks;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    
    
    @Override
    public Stock updateStock(Stock stock){
        try {            

            Stock stocks = new Stock();
            stocks.setId(stock.getId());
            stocks.setName(stock.getName());
            stocks.setPrice(stock.getPrice()); 
            stocks.setUpdated(new Date());
            stocks.setQuantity(stock.getQuantity());
            
            stockRepository.save(stocks);

            Map<String, Object> userData = new HashMap<>();
            userData.put("user", stock);
            return stocks;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public String deleteStock(Integer id){
        try {                        
            stockRepository.deleteById(id);
            return "Stock Deleted";
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to Delete Stock";
        }
    }

    @Override
    public List<Stock> getAllStocks() {
        return stockRepository.findAll();
    }
    
    @Override
    public Integer getStockTotal(Map<String, Object> reqData) {
        Long totalData = null;
        try {
            String query = "SELECT COUNT(a) FROM User a ";
            query += "JOIN RoleUser ru ON a.id = ru.userId ";
            query += "JOIN Role r ON ru.roleId = r.id " ;
            query += "WHERE (a.isActive=true or a.isActive IS NULL) ";
            query += "AND (LOWER(a.email) LIKE CONCAT('%', :key, '%') OR LOWER(a.username) LIKE CONCAT('%', :key, '%') OR LOWER(a.fullName) LIKE CONCAT('%', :key, '%')) ";

            Query queryResult = entityManager.createQuery(query,Long.class);

            totalData = (Long) queryResult.getSingleResult();
            return totalData.intValue();
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    @Override
    public Map<String, Object> getStockPagination(Map<String, Object> reqData, int totalData) {
        List<Stock> listUsers = new LinkedList<>();
        Map<String, Object> data = new HashMap<>();
        Map<String, Object> pagination = new HashMap<>();
        try {
            int limit =reqData.get("limit") != null ? Integer.parseInt(reqData.get("limit").toString()) : 0;
            int currentPage =reqData.get("page") !=null ? Integer.parseInt(reqData.get("page").toString()) : 0;
            String key = reqData.get("keyword") != null ? reqData.get("keyword").toString().toLowerCase() : "";
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
            
            List<Stock> users = new LinkedList<>();
            String query = "SELECT a FROM Stock a WHERE a.isActive=false";
            if(!orderBy.isEmpty() && !sort.isEmpty()) query += " ORDER BY " + orderBy + " " + sort;
            else query += " ORDER BY a.createdAt DESC";
            System.out.println(query);
            users = entityManager.createQuery(query, Stock.class).setMaxResults(limit).setFirstResult(offset).getResultList();
            users.forEach((Stock stock) -> {
                listUsers.add(stock);
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