package com.example.workshopInformationSystem.service;

import java.util.Date;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import com.example.workshopInformationSystem.model.Customer;
import com.example.workshopInformationSystem.model.Mechanic;
import com.example.workshopInformationSystem.model.Stock;
import com.example.workshopInformationSystem.model.Transaction;
import com.example.workshopInformationSystem.model.request.FinancialRequest;
import com.example.workshopInformationSystem.model.request.TransactionPayload;
import com.example.workshopInformationSystem.model.request.TransactionRequest;
import com.example.workshopInformationSystem.repository.StockRepository;
import com.example.workshopInformationSystem.repository.TransactionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class TransactionServiceImpl  implements TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private StockRepository stockRepository;
    
    @PersistenceContext
    private EntityManager entityManager;
    
    @Override
    public Transaction saveTransaction(TransactionPayload transaction){
        try {            

            Transaction transactions = new Transaction();
            transactions.setName(transaction.getName());
            transactions.setType(transaction.getType());
            transactions.setStatus(transaction.getStatus());
            String query = "FROM Mechanic WHERE id = "+transaction.getMechanic()+" ";
            Query queryResult = entityManager.createQuery(query,Mechanic.class);
            Mechanic mechanic = (Mechanic) queryResult.getSingleResult();

            transactions.setMechanic(mechanic);

            query = "FROM Customer WHERE id = "+transaction.getCustomer()+" ";
            queryResult = entityManager.createQuery(query,Customer.class);
            Customer customer = (Customer) queryResult.getSingleResult();

            transactions.setCustomer(customer);

            query = "FROM Stock WHERE id = "+transaction.getStock()+" ";
            queryResult = entityManager.createQuery(query,Stock.class);
            Stock stock = (Stock) queryResult.getSingleResult();

            transactions.setStock(stock);
            transactions.setPrice(transaction.getPrice()); 
            transactions.setQuantity(transaction.getQuantity());
            transactions.setCreated(new Date());
            transactions.setUpdated(new Date());
            transactionRepository.save(transactions);

            if(transactions.getStock()!=null){
                if(!transactions.getStock().toString().isEmpty()){
                    query = "FROM Stock WHERE id = "+transactions.getStock().getId()+" ";

                    queryResult = entityManager.createQuery(query,Stock.class);

                    Stock stocks = (Stock) queryResult.getSingleResult();
                 
                    stocks.setUpdated(new Date());
                    stocks.setQuantity(stocks.getQuantity()-transaction.getQuantity());
                    
                    stockRepository.save(stocks);
                }
            }
            Map<String, Object> userData = new HashMap<>();
            userData.put("transactions", transactions);
            return transactions;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    
    
    @Override
    public Transaction updateTransaction(TransactionPayload transaction){
        try {            

            String query = "FROM Transaction WHERE id = "+transaction.getId()+" ";

            Query queryResult = entityManager.createQuery(query,Transaction.class);

            Transaction transactions = (Transaction) queryResult.getSingleResult();
            // Stock stocks = new Stock();
            transactions.setId(transaction.getId());
            transactions.setName(transaction.getName());
            transactions.setType(transaction.getType());
            query = "FROM Mechanic WHERE id = "+transaction.getMechanic()+" ";
            queryResult = entityManager.createQuery(query,Mechanic.class);
            Mechanic mechanic = (Mechanic) queryResult.getSingleResult();

            transactions.setMechanic(mechanic);

            query = "FROM Customer WHERE id = "+transaction.getCustomer()+" ";
            queryResult = entityManager.createQuery(query,Customer.class);
            Customer customer = (Customer) queryResult.getSingleResult();

            transactions.setCustomer(customer);

            query = "FROM Stock WHERE id = "+transaction.getStock()+" ";
            queryResult = entityManager.createQuery(query,Stock.class);
            Stock stock = (Stock) queryResult.getSingleResult();
            transactions.setStatus(transaction.getStatus());
            transactions.setStock(stock);
            transactions.setPrice(transaction.getPrice()); 
            transactions.setQuantity(transaction.getQuantity());
            transactions.setUpdated(new Date());
            
            transactionRepository.save(transactions);

            Map<String, Object> userData = new HashMap<>();
            userData.put("transactions", transactions);
            return transactions;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public String deleteTransaction(Integer id){
        try {                        
            transactionRepository.deleteById(id);
            return "transactions Deleted";
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to Delete transactions";
        }
    }

    @Override
    public Integer getTransactionTotal(Map<String, Object> reqData) {
        Long totalData = null;
        try {

            String key = reqData.get("keyword") != null ? reqData.get("keyword").toString().toLowerCase() : "";
            String type = "";
            String status = "";
            Map<String, Object> filtered = new HashMap<>();
            
            if (reqData.get("filter")!=null) {
                filtered = (Map<String, Object>) reqData.get("filter");
                type = filtered.get("type") != null ? filtered.get("type").toString().toLowerCase() : "";
                status = filtered.get("status") != null ? filtered.get("status").toString().toLowerCase() : "";
            }

            String query = "SELECT COUNT(a) FROM Transaction a WHERE a.id>0 ";

            if(!type.isEmpty()){  
                query += "AND (a.type LIKE '%" + type + "%') ";                
            }
            if(!status.isEmpty()){  
                query += "AND (a.status LIKE '%" + status + "%') ";                
            }
            if(!key.isEmpty()){
                query += " AND (UPPER(a.name) LIKE '%" + key + "%') ";
            }

            Query queryResult = entityManager.createQuery(query,Long.class);
            
            totalData = (Long) queryResult.getSingleResult();System.out.println("trace "+ totalData);
            return totalData.intValue();
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    @Override
    public Map<String, Object> getTransactionPagination(Map<String, Object> reqData, int totalData) {
        List<TransactionRequest> listUsers = new LinkedList<>();
        Map<String, Object> data = new HashMap<>();
        Map<String, Object> pagination = new HashMap<>();
        try {
            int limit =reqData.get("limit") != null ? Integer.parseInt(reqData.get("limit").toString()) : 0;
            int currentPage =reqData.get("page") !=null ? Integer.parseInt(reqData.get("page").toString()) : 0;
            String key = reqData.get("keyword") != null ? reqData.get("keyword").toString().toUpperCase() : "";
            String type = "";
            String status = "";
            Map<String, Object> filtered = new HashMap<>();
            String orderBy = "";
            String sort = "";
            if (reqData.get("filter")!=null) {
                filtered = (Map<String, Object>) reqData.get("filter");
                type = filtered.get("type") != null ? filtered.get("type").toString().toLowerCase() : "";
                status = filtered.get("status") != null ? filtered.get("status").toString().toLowerCase() : "";
            }
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
            
            List<Transaction> users = new LinkedList<>();
            String query = "SELECT a FROM Transaction a WHERE a.id>0 ";

            if(!type.isEmpty()){  
                query += "AND (a.type LIKE '%" + type + "%') ";                
            }
            if(!status.isEmpty()){  
                query += "AND (a.status LIKE '%" + status + "%') ";                
            }
            if(!key.isEmpty()){
                query += " AND (UPPER(a.name) LIKE '%" + key + "%') ";
            }

            if(!orderBy.isEmpty() && !sort.isEmpty()) query += " ORDER BY " + orderBy + " " + sort;
            else query += " ORDER BY a.created DESC";
            System.out.println(query);
            users = entityManager.createQuery(query, Transaction.class).setMaxResults(limit).setFirstResult(offset).getResultList();
            users.forEach((Transaction transaction) -> {
                TransactionRequest transactions = new TransactionRequest();
                transactions.setId(transaction.getId());
                transactions.setName(transaction.getName());
                transactions.setType(transaction.getType());
                transactions.setMechanic(transaction.getMechanic().getName());
                transactions.setCustomer(transaction.getCustomer().getName());
                transactions.setStock(transaction.getStock().getName());
                transactions.setPrice(transaction.getPrice()); 
                transactions.setStatus(transaction.getStatus()); 
                transactions.setQuantity(transaction.getQuantity());
                if(transaction.getCreated()!=null)
                transactions.setCreated(transaction.getCreated().toString());
                if(transaction.getUpdated()!=null)
                transactions.setUpdated(transaction.getUpdated().toString());
                listUsers.add(transactions);
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

    @Override
    public Integer getTransactionTotalFinancial(Map<String, Object> reqData) {
        Long totalData = null;
        try {

            String key = reqData.get("keyword") != null ? reqData.get("keyword").toString().toLowerCase() : "";
            String type = "";
            String status = "";
            Map<String, Object> filtered = new HashMap<>();
            
            if (reqData.get("filter")!=null) {
                filtered = (Map<String, Object>) reqData.get("filter");
                type = filtered.get("type") != null ? filtered.get("type").toString().toLowerCase() : "";
                status = filtered.get("status") != null ? filtered.get("status").toString().toLowerCase() : "";
            }

            String query = "SELECT COUNT(a) FROM Transaction a WHERE a.id>0 ";

            if(!type.isEmpty()){  
                query += "AND (a.type LIKE '%" + type + "%') ";                
            }
            if(!status.isEmpty()){  
                query += "AND (a.status LIKE '%" + status + "%') ";                
            }
            if(!key.isEmpty()){
                query += " AND (UPPER(a.name) LIKE '%" + key + "%') ";
            }

            Query queryResult = entityManager.createQuery(query,Long.class);
            
            totalData = (Long) queryResult.getSingleResult();System.out.println("trace "+ totalData);
            return totalData.intValue();
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    @Override
    public Map<String, Object> getTransactionPaginationFinancial(Map<String, Object> reqData, int totalData) {
        List<FinancialRequest> listUsers = new LinkedList<>();
        Map<String, Object> data = new HashMap<>();
        Map<String, Object> pagination = new HashMap<>();
        try {
            int limit =reqData.get("limit") != null ? Integer.parseInt(reqData.get("limit").toString()) : 0;
            int currentPage =reqData.get("page") !=null ? Integer.parseInt(reqData.get("page").toString()) : 0;
            String key = reqData.get("keyword") != null ? reqData.get("keyword").toString().toUpperCase() : "";
            String type = "";
            String status = "";
            Map<String, Object> filtered = new HashMap<>();
            String orderBy = "";
            String sort = "";
            if (reqData.get("filter")!=null) {
                filtered = (Map<String, Object>) reqData.get("filter");
                type = filtered.get("type") != null ? filtered.get("type").toString().toLowerCase() : "";
                status = filtered.get("status") != null ? filtered.get("status").toString().toLowerCase() : "";
            }
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
            
            List<Transaction> users = new LinkedList<>();
            String query = "SELECT a FROM Transaction a WHERE a.id>0 ";

            if(!type.isEmpty()){  
                query += "AND (a.type LIKE '%" + type + "%') ";                
            }
            if(!status.isEmpty()){  
                query += "AND (a.status LIKE '%" + status + "%') ";                
            }
            if(!key.isEmpty()){
                query += " AND (UPPER(a.name) LIKE '%" + key + "%') ";
            }

            if(!orderBy.isEmpty() && !sort.isEmpty()) query += " ORDER BY " + orderBy + " " + sort;
            else query += " ORDER BY a.created DESC";
            System.out.println(query);
            users = entityManager.createQuery(query, Transaction.class).setMaxResults(limit).setFirstResult(offset).getResultList();
            users.forEach((Transaction transaction) -> {
                FinancialRequest financial = new FinancialRequest();
                financial.setId(transaction.getId());
                financial.setName(transaction.getName());
                financial.setSale(transaction.getPrice());
                int expense = 0;
                if(transaction.getQuantity()!=0){
                    expense = transaction.getQuantity() * transaction.getStock().getPrice();
                }
                
                financial.setExpense(expense);
                financial.setRevenue(transaction.getPrice() - expense);

                if(transaction.getCreated()!=null)
                financial.setCreated(transaction.getCreated().toString());
                financial.setCustomer(transaction.getCustomer().getName());
                financial.setMechanic(transaction.getMechanic().getName());
                financial.setStock(transaction.getStock().getName());
                financial.setQuantity(transaction.getQuantity());
                financial.setStatus(transaction.getStatus());
                financial.setType(transaction.getType());
                listUsers.add(financial);
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

    @Override
    public Map<String, Object> getReport(Map<String, Object> reqData) {
        Map<String, Object> datas = new HashMap<>();
        Map<String, Object> data = new HashMap<>();
        List<FinancialRequest> listUsers = new LinkedList<>();
        try {

            String month = "";
            String year = "";
            String day = "";
            Map<String, Object> filtered = new HashMap<>();

            if (reqData.get("filter")!=null) {
                filtered = (Map<String, Object>) reqData.get("filter");
                month = filtered.get("month") != null ? filtered.get("month").toString().toLowerCase() : "";
                year = filtered.get("year") != null ? filtered.get("year").toString().toLowerCase() : "";
                day = filtered.get("day") != null ? filtered.get("day").toString().toLowerCase() : "";
            }
            List<Transaction> users = new LinkedList<>();
            String query = "SELECT a FROM Transaction a WHERE a.id>0 ";

            if(!day.isEmpty()){  
                query += "AND (DAY(a.created)="+ day +") ";                
            }
            if(!month.isEmpty()){  
                query += "AND (MONTH(a.created)="+ month +") ";                
            }
            if(!year.isEmpty()){  
                query += "AND (YEAR(a.created)="+ year +") ";                
            }
            System.out.println(query);
            users = entityManager.createQuery(query, Transaction.class).getResultList();

            users.forEach((Transaction transaction) -> {
                FinancialRequest financial = new FinancialRequest();
                financial.setId(transaction.getId());
                financial.setName(transaction.getName());
                financial.setSale(transaction.getPrice());
                int expense = 0;
                if(transaction.getQuantity()!=0){
                    expense = transaction.getQuantity() * transaction.getStock().getPrice();
                }
                
                financial.setExpense(expense);
                financial.setRevenue(transaction.getPrice() - expense);

                if(transaction.getCreated()!=null)
                financial.setCreated(transaction.getCreated().toString());
                listUsers.add(financial);

            });

            int sale = 0;
            int expenses = 0;
            int revenue = 0;

            for(int i = 0;i<listUsers.size();i++){
                FinancialRequest totalFinancial = listUsers.get(i);
                sale += totalFinancial.getSale();
                expenses += totalFinancial.getExpense();
                revenue += totalFinancial.getRevenue();
            }
            revenue = sale - expenses;
            
            datas.put("sale", sale);
            datas.put("expense", expenses);
            datas.put("revenue", revenue);
            datas.put("totalTransaction", users.size());

            data.put("result", datas);
            return data;
        } catch (Exception e) {
            e.printStackTrace();
            data.put("result", datas);
            return data;
        }
    }

}
