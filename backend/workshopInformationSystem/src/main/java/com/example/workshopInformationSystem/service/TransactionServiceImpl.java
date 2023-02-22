package com.example.workshopInformationSystem.service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import com.example.workshopInformationSystem.model.Customer;
import com.example.workshopInformationSystem.model.Mechanic;
import com.example.workshopInformationSystem.model.Stock;
import com.example.workshopInformationSystem.model.Transaction;
import com.example.workshopInformationSystem.model.request.FinancialRequest;
import com.example.workshopInformationSystem.model.request.TransactionPayload;
import com.example.workshopInformationSystem.model.request.TransactionRequest;
import com.example.workshopInformationSystem.repository.StockRepository;
import com.example.workshopInformationSystem.repository.TransactionRepository;
import com.example.workshopInformationSystem.util.CommonMethod;

import ch.qos.logback.core.net.SyslogOutputStream;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
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
    public Transaction saveTransaction(TransactionPayload transaction, Integer userId){
        try {            

            Transaction transactions = new Transaction();
            transactions.setName(transaction.getName());
            transactions.setType(transaction.getType());
            transactions.setStatus(transaction.getStatus());
            transactions.setUserId(userId);
            String query = "FROM Mechanic WHERE id = "+transaction.getMechanic()+" ";
            Query queryResult = entityManager.createQuery(query,Mechanic.class);
            Mechanic mechanic = (Mechanic) queryResult.getSingleResult();

            transactions.setMechanic(mechanic);

            query = "FROM Customer WHERE id = "+transaction.getCustomer()+" ";
            queryResult = entityManager.createQuery(query,Customer.class);
            Customer customer = (Customer) queryResult.getSingleResult();

            transactions.setCustomer(customer);

            // query = "FROM Stock WHERE id = "+transaction.getStock()+" ";
            // queryResult = entityManager.createQuery(query,Stock.class);
            // Stock stock = (Stock) queryResult.getSingleResult();

            transactions.setStock(transaction.getStock());
            transactions.setPrice(transaction.getPrice()); 
            transactions.setQuantity(transaction.getQuantity());
            transactions.setCreated(new Date());
            transactions.setUpdated(new Date());
            transactionRepository.save(transactions);

            if(transactions.getStock()!=null){
                if(!transactions.getStock().toString().isEmpty()){
                    String[] stockList = transactions.getStock().split(";");
                    String[] qtyList = transactions.getQuantity().split(";");
                    for(int i=0;i<stockList.length;i++){
          
                        query = "FROM Stock WHERE id = "+stockList[i]+" ";

                        queryResult = entityManager.createQuery(query,Stock.class);
    
                        Stock stocks = (Stock) queryResult.getSingleResult();
                     
                        stocks.setUpdated(new Date());
                        stocks.setQuantity(stocks.getQuantity()- Integer.parseInt(qtyList[i].toString()));
                        
                        stockRepository.save(stocks);
                    }
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
    public Transaction updateTransaction(TransactionPayload transaction, Integer userId){
        try {            

            String query = "FROM Transaction WHERE id = "+transaction.getId()+" AND userId = "+userId+" ";

            Query queryResult = entityManager.createQuery(query,Transaction.class);

            Transaction transactions = (Transaction) queryResult.getSingleResult();
            // Stock stocks = new Stock();
            transactions.setId(transaction.getId());
            transactions.setName(transaction.getName());
            transactions.setType(transaction.getType());
            transactions.setUserId(userId);
            query = "FROM Mechanic WHERE id = "+transaction.getMechanic()+" ";
            queryResult = entityManager.createQuery(query,Mechanic.class);
            Mechanic mechanic = (Mechanic) queryResult.getSingleResult();

            transactions.setMechanic(mechanic);

            query = "FROM Customer WHERE id = "+transaction.getCustomer()+" ";
            queryResult = entityManager.createQuery(query,Customer.class);
            Customer customer = (Customer) queryResult.getSingleResult();

            transactions.setCustomer(customer);

            // query = "FROM Stock WHERE id = "+transaction.getStock()+" ";
            // queryResult = entityManager.createQuery(query,Stock.class);
            // Stock stock = (Stock) queryResult.getSingleResult();
            transactions.setStatus(transaction.getStatus());
            transactions.setStock(transaction.getStock());
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
    public Integer getTransactionTotal(Map<String, Object> reqData, Integer userId) {
        Long totalData = null;
        try {

            String key = reqData.get("keyword") != null ? reqData.get("keyword").toString().toLowerCase() : "";
            String type = "";
            String status = "";
            String mechanic = "";
            String customer = "";
            Map<String, Object> filtered = new HashMap<>();
            
            if (reqData.get("filter")!=null) {
                filtered = (Map<String, Object>) reqData.get("filter");
                type = filtered.get("type") != null ? filtered.get("type").toString().toLowerCase() : "";
                status = filtered.get("status") != null ? filtered.get("status").toString().toLowerCase() : "";
                mechanic = filtered.get("mechanic") != null ? filtered.get("mechanic").toString().toLowerCase() : "";
                customer = filtered.get("customer") != null ? filtered.get("customer").toString().toLowerCase() : "";
            }

            String query = "SELECT COUNT(a) FROM Transaction a WHERE a.userId="+userId+" ";

            if(!type.isEmpty()){  
                query += "AND (a.type LIKE '%" + type + "%') ";                
            }
            if(!status.isEmpty()){  
                query += "AND (a.status LIKE '%" + status + "%') ";                
            }
            if(!key.isEmpty()){
                query += " AND (UPPER(a.name) LIKE '%" + key + "%') ";
            }
            if(!mechanic.isEmpty()){
                query += " AND (UPPER(a.mechanic.name) LIKE '%" + mechanic + "%') ";
            }
            if(!customer.isEmpty()){
                query += " AND (UPPER(a.customer.name) LIKE '%" + customer + "%') ";
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
    public Map<String, Object> getTransactionPagination(Map<String, Object> reqData, int totalData, Integer userId) {
        List<TransactionRequest> listUsers = new LinkedList<>();
        Map<String, Object> data = new HashMap<>();
        Map<String, Object> pagination = new HashMap<>();
        try {
            int limit =reqData.get("limit") != null ? Integer.parseInt(reqData.get("limit").toString()) : 0;
            int currentPage =reqData.get("page") !=null ? Integer.parseInt(reqData.get("page").toString()) : 0;
            String key = reqData.get("keyword") != null ? reqData.get("keyword").toString().toUpperCase() : "";
            String type = "";
            String status = "";
            String mechanic = "";
            String customer = "";
            Map<String, Object> filtered = new HashMap<>();
            String orderBy = "";
            String sort = "";
            if (reqData.get("filter")!=null) {
                filtered = (Map<String, Object>) reqData.get("filter");
                type = filtered.get("type") != null ? filtered.get("type").toString().toLowerCase() : "";
                status = filtered.get("status") != null ? filtered.get("status").toString().toLowerCase() : "";
                mechanic = filtered.get("mechanic") != null ? filtered.get("mechanic").toString().toLowerCase() : "";
                customer = filtered.get("customer") != null ? filtered.get("customer").toString().toLowerCase() : "";
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
            String query = "SELECT a FROM Transaction a WHERE a.userId="+userId+" ";

            if(!type.isEmpty()){  
                query += "AND (a.type LIKE '%" + type + "%') ";                
            }
            if(!status.isEmpty()){  
                query += "AND (a.status LIKE '%" + status + "%') ";                
            }
            if(!key.isEmpty()){
                query += " AND (UPPER(a.name) LIKE '%" + key + "%') ";
            }
            if(!mechanic.isEmpty()){
                query += " AND (UPPER(a.mechanic.name) LIKE '%" + mechanic + "%') ";
            }
            if(!customer.isEmpty()){
                query += " AND (UPPER(a.customer.name) LIKE '%" + customer + "%') ";
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
                // transactions.setStock(transaction.getStock().getName());
                List<Map<String, Object>> stockLists = new LinkedList<>();
                if(transaction.getStock()!=null){
                    if(!transaction.getStock().toString().isEmpty()){
                        String[] qtyList = transaction.getQuantity().split(";");
                        String[] stockList = transaction.getStock().split(";");

                        for(int i=0;i<stockList.length;i++){
                            Map<String, Object> map = new HashMap<>();
                            String querys = "FROM Stock WHERE id = "+stockList[i]+" ";
    
                            Query queryResult = entityManager.createQuery(querys,Stock.class);
        
                            Stock stocks = (Stock) queryResult.getSingleResult();
                            // stocks.setQuantity(Integer.parseInt(qtyList[i].toString()));
                            
                            map.put("id",stocks.getId());
                            map.put("name",stocks.getName());
                            map.put("quantity",Integer.parseInt(qtyList[i].toString()));

                            stockLists.add(map);
                            System.out.println(" ke "+i+"tracing2  "+ stocks.getQuantity());
                        }
                    }
                }
                transactions.setStock(stockLists);
                
                transactions.setPrice(transaction.getPrice()); 
                transactions.setStatus(transaction.getStatus()); 
                // transactions.setQuantity(transaction.getQuantity());
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
    public Integer getTransactionTotalFinancial(Map<String, Object> reqData, Integer userId) {
        Long totalData = null;
        try {

            String key = reqData.get("keyword") != null ? reqData.get("keyword").toString().toLowerCase() : "";
            String type = "";
            String status = "";
            String month = "";
            String year = "";
            String day = "";
            Map<String, Object> filtered = new HashMap<>();
            
            if (reqData.get("filter")!=null) {
                filtered = (Map<String, Object>) reqData.get("filter");
                type = filtered.get("type") != null ? filtered.get("type").toString().toLowerCase() : "";
                status = filtered.get("status") != null ? filtered.get("status").toString().toLowerCase() : "";
                month = filtered.get("month") != null ? filtered.get("month").toString().toLowerCase() : "";
                year = filtered.get("year") != null ? filtered.get("year").toString().toLowerCase() : "";
                day = filtered.get("day") != null ? filtered.get("day").toString().toLowerCase() : "";
            }

            String query = "SELECT COUNT(a) FROM Transaction a WHERE a.userId="+userId+" ";

            if(!type.isEmpty()){  
                query += "AND (a.type LIKE '%" + type + "%') ";                
            }
            if(!status.isEmpty()){  
                query += "AND (a.status LIKE '%" + status + "%') ";                
            }
            if(!key.isEmpty()){
                query += " AND (UPPER(a.name) LIKE '%" + key + "%') ";
            }
            if(!day.isEmpty()){  
                query += "AND (DAY(a.created)="+ day +") ";                
            }
            if(!month.isEmpty()){  
                query += "AND (MONTH(a.created)="+ month +") ";                
            }
            if(!year.isEmpty()){  
                query += "AND (YEAR(a.created)="+ year +") ";                
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
    public Map<String, Object> getTransactionPaginationFinancial(Map<String, Object> reqData, int totalData, Integer userId) {
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
            String month = "";
            String year = "";
            String day = "";
            if (reqData.get("filter")!=null) {
                filtered = (Map<String, Object>) reqData.get("filter");
                type = filtered.get("type") != null ? filtered.get("type").toString().toLowerCase() : "";
                status = filtered.get("status") != null ? filtered.get("status").toString().toLowerCase() : "";
                month = filtered.get("month") != null ? filtered.get("month").toString().toLowerCase() : "";
                year = filtered.get("year") != null ? filtered.get("year").toString().toLowerCase() : "";
                day = filtered.get("day") != null ? filtered.get("day").toString().toLowerCase() : "";
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
            String query = "SELECT a FROM Transaction a WHERE a.userId="+userId+" ";

            if(!type.isEmpty()){  
                query += "AND (a.type LIKE '%" + type + "%') ";                
            }
            if(!status.isEmpty()){  
                query += "AND (a.status LIKE '%" + status + "%') ";                
            }
            if(!key.isEmpty()){
                query += " AND (UPPER(a.name) LIKE '%" + key + "%') ";
            }
            if(!day.isEmpty()){  
                query += "AND (DAY(a.created)="+ day +") ";                
            }
            if(!month.isEmpty()){  
                query += "AND (MONTH(a.created)="+ month +") ";                
            }
            if(!year.isEmpty()){  
                query += "AND (YEAR(a.created)="+ year +") ";                
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
                if(transaction.getQuantity()!=null && !transaction.getQuantity().isEmpty()){
                    if(transaction.getStock()!=null){
                        if(!transaction.getStock().toString().isEmpty()){
                            String[] stockList = transaction.getStock().split(";");
                            String[] qtyList = transaction.getQuantity().split(";");
                            for(int i=0;i<stockList.length;i++){
                                String querys = "FROM Stock WHERE id = "+stockList[i]+" ";
        
                                Query queryResult = entityManager.createQuery(querys,Stock.class);
            
                                Stock stocks = (Stock) queryResult.getSingleResult();
                                stocks.setQuantity(Integer.parseInt(qtyList[i].toString()));
                                expense = expense + Integer.parseInt(qtyList[i].toString()) * stocks.getPrice();
                            }
                        }
                    }
                    // expense = transaction.getQuantity() * transaction.getStock().getPrice();
                }
                
                financial.setExpense(expense);
                financial.setRevenue(transaction.getPrice() - expense);

                if(transaction.getCreated()!=null)
                financial.setCreated(transaction.getCreated().toString());
                financial.setCustomer(transaction.getCustomer().getName());
                financial.setMechanic(transaction.getMechanic().getName());
                // financial.setStock(transaction.getStock().getName());
                // transactions.setStock(transaction.getStock().getName());
                List<Object> stockLists = new LinkedList<>();
                if(transaction.getStock()!=null){
                    if(!transaction.getStock().toString().isEmpty()){
                        String[] stockList = transaction.getStock().split(";");
                        String[] qtyList = transaction.getQuantity().split(";");
                        for(int i=0;i<stockList.length;i++){
                            String querys = "FROM Stock WHERE id = "+stockList[i]+" ";
                    
                            Query queryResult = entityManager.createQuery(querys,Stock.class);
                        
                            Stock stocks = (Stock) queryResult.getSingleResult();
                            
                            stockLists.add(stocks);
                
                        }
                    }
                }
                financial.setStock(stockLists);

                // financial.setQuantity(transaction.getQuantity());
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
    public Map<String, Object> getReport(Map<String, Object> reqData, Integer userId) {
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
            String query = "SELECT a FROM Transaction a WHERE a.userId="+userId+" ";

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
                if(transaction.getQuantity()!=null && !transaction.getQuantity().isEmpty()){
                    if(transaction.getStock()!=null){
                        if(!transaction.getStock().toString().isEmpty()){
                            String[] stockList = transaction.getStock().split(";");
                            String[] qtyList = transaction.getQuantity().split(";");
                            for(int i=0;i<stockList.length;i++){
                                String querys = "FROM Stock WHERE id = "+stockList[i]+" ";
        
                                Query queryResult = entityManager.createQuery(querys,Stock.class);
            
                                Stock stocks = (Stock) queryResult.getSingleResult();

                                expense = expense + Integer.parseInt(qtyList[i].toString()) * stocks.getPrice();
                            }
                        }
                    }
                    // expense = transaction.getQuantity() * transaction.getStock().getPrice();
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

    @Override
    public Map<String, Object> mostStock(Integer userId) {
        
        Map<String, Object> data = new HashMap<>();
        List<Object> listStock = new LinkedList<>();
        try {


            // List<Object[]> results = new LinkedList<>();
            // String query = "SELECT stock.name, stock.minimumQty, stock.quantity, COUNT(stock) FROM Transaction WHERE userId="+userId+" GROUP BY stock ";

            // System.out.println(query);
            // results = entityManager.createQuery(query, Object[].class).getResultList();
    
            // if (results != null) {
            //     for (Object[] row : results) {
            //         Map<String, Object> datas = new HashMap<>();
            //         datas.put("name", row[0]);
            //         System.out.println("tracename "+row[0]);
            //         datas.put("minimumQty", row[1]);
            //         datas.put("quantity", row[2]);
            //         datas.put("count", row[3]);
            //         datas.containsKey("count");
            //         listStock.add(datas);
            //     }
            // }      


            List<Object[]> results = new LinkedList<>();
            String query = "SELECT stock, quantity FROM Transaction WHERE userId="+userId;

            System.out.println(query);
            results = entityManager.createQuery(query, Object[].class).getResultList();
    
            Map<String, Object> dataResult = new HashMap<>();

            if (results != null) {
                for (Object[] row : results) {

                    String[] stockList = row[0].toString().split(";");
                    String[] qtyList = row[1].toString().split(";");
                    System.out.println("tracing qty "+ row[1]);
                    for(int i=0;i<stockList.length;i++){
                        
                        String querys = "FROM Stock WHERE id = "+stockList[i]+" ";

                        Query queryResult = entityManager.createQuery(querys,Stock.class);
    
                        Stock stocks = (Stock) queryResult.getSingleResult();

                        Map<String, Object> datas = new HashMap<>();
                        datas.put("name", stocks.getName());
                        System.out.println("tracename "+row[0]);
                        datas.put("minimumQty", stocks.getMinimumQty());
                        datas.put("quantity", stocks.getQuantity());
                        datas.put("count", 1);
                        if(dataResult.containsKey(stocks.getName())){
                            Map<String, Object> dataTemp = (Map<String, Object>) dataResult.get(stocks.getName());
                            
                            datas.put("count", 1+Integer.parseInt(dataTemp.get("count").toString()));
                            dataResult.put(stocks.getName(), datas);
                        }else
                        dataResult.put(stocks.getName(), datas);
                    }
 
                    // dataResult
                    
                    // datas.put("name", row[0]);
                    // System.out.println("tracename "+row[0]);
                    // datas.put("minimumQty", row[1]);
                    // datas.put("quantity", row[2]);
                    // datas.put("count", row[3]);
                    // datas.containsKey("count");
                    
                }
            }     

            listStock = new ArrayList<Object>(dataResult.values());
            data.put("result", listStock);
            return data;
        } catch (Exception e) {
            e.printStackTrace();
            data.put("result", listStock);
            return data;
        }
    }

    @Override
    public void exportData(HttpServletResponse response, Map<String, Object> payload, Integer userId) {
        try {

            XSSFWorkbook workbook = new XSSFWorkbook();
            ServletOutputStream outputStream = response.getOutputStream();
            try {
                DateFormat dateFormatter = new SimpleDateFormat("ddMMyyyy");
   
                String headerKey = "Content-Disposition";
                String headerValue = "attachment; filename=Report_Transaction__"+dateFormatter.format(new Date())+".xlsx";
                response.setHeader(headerKey, headerValue);
                response.setContentType("application/octet-stream");

                String startDateString = "";
                String endDateString = "";
                Map<String, Object> filtered = new HashMap<>();

                if (payload.get("filter")!=null) {
                    filtered = (Map<String, Object>) payload.get("filter");
                    startDateString = filtered.get("startDate") != null ? filtered.get("startDate").toString().trim() : "";
                    endDateString = filtered.get("endDate") != null ? filtered.get("endDate").toString().toLowerCase() : "";
                }

                XSSFSheet sheet = workbook.createSheet("Report Medical Record_" + startDateString);

                LocalDate startDate = null, now = LocalDate.now(), endDate = now;

                if(!startDateString.isEmpty()){
                    if(!endDateString.isEmpty()){
                        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");
                        startDate = LocalDate.parse(startDateString, dtf);
                        endDate = LocalDate.parse(endDateString, dtf);
                    }
                }


                //set title
                Row title = sheet.createRow(0);
                Row title2 = sheet.createRow(1);

                Cell titleCell = title.createCell(0);
                Cell titleCell2 = title2.createCell(0);
                XSSFFont font = workbook.createFont(); 
                CellStyle cs = titleCell.getCellStyle();
                font.setBold(true);
                cs.setFont(font);
                titleCell.setCellStyle(cs);
                titleCell.setCellValue("DATA TRANSAKSI");
                if(!startDateString.isEmpty()){
                    if(!endDateString.isEmpty()){
                        titleCell2.setCellValue("Periode Tanggal: "+startDateString +" - " + endDateString);
                    }
                }else{
                    titleCell2.setCellValue("Periode Tanggal: Seluruh Transaksi");
                }
                

                //set headers
                // List<String> headers = Arrays.asList("NO", "TGL", "NAMA TRANSAKSI", "TIPE TRANSAKSI", "CUSTOMER", "MECHANIC"
                // , "STOCK" , "HARGA" , "STATUS", "QTY");
                List<String> headers = Arrays.asList("NO", "TGL", "NAMA TRANSAKSI", "TIPE TRANSAKSI", "CUSTOMER", "MECHANIC"
                , "HARGA" , "STATUS");
                Row header = sheet.createRow(3);
                Row header2 = sheet.createRow(4);
                for(int i = 0; i< headers.size(); i++) {
                    header.createCell(i).setCellValue(headers.get(i));
                    sheet.addMergedRegion(new CellRangeAddress(header.getRowNum(), header2.getRowNum(), 
                    i, i));
                }

                //get data 
                Map<String, Object> result = exportDatas(payload, startDate, endDate, userId);
                if(result.isEmpty()) throw new Exception("data not found");
                List<Map<String,Object>> data = (List<Map<String,Object>>) result.get("data");
                if(data.isEmpty()) throw new Exception("data not found");
                //mapping inventory medicine to table
                int count = 5;
                int index = 1;
                DateFormat df = new SimpleDateFormat("dd-MM-yyyy");
                for(Map<String,Object> map: data) {
                    Row row = sheet.createRow(count);
                    row.createCell(0).setCellValue(index);
                    if(map.get("date") != null){
                        DateFormat inputFormat = new SimpleDateFormat("yyyy-MM-dd");
                        Date date = inputFormat.parse(map.get("date").toString());
                        row.createCell(1).setCellValue(df.format(date));
                    }
                    if(map.get("name")!=null)row.createCell(2).setCellValue((String) map.get("name").toString());
                    if(map.get("type")!=null)row.createCell(3).setCellValue((String) map.get("type").toString());
                    if(map.get("customer")!=null)row.createCell(4).setCellValue((String) map.get("customer").toString());
                    if(map.get("mechanic")!=null)row.createCell(5).setCellValue((String) map.get("mechanic").toString());
                    // if(map.get("stock")!=null)row.createCell(6).setCellValue((String) map.get("stock").toString());
                    if(map.get("price")!=null)row.createCell(6).setCellValue((String) map.get("price").toString());
                    if(map.get("status")!=null)row.createCell(7).setCellValue((String) map.get("status").toString());
                    // if(map.get("quantity")!=null)row.createCell(9).setCellValue((String) map.get("quantity").toString());
              
                    index++;
                    count++;
                }

                workbook.write(outputStream);
            } catch (Exception ex) {
                ex.printStackTrace();
                throw ex;
            } finally {
                workbook.close();
                outputStream.close();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public Map<String, Object> exportDatas(Map<String, Object> payload, LocalDate startDate, LocalDate endDate, Integer userId) {
        try {            
    

            
            
            String orderBy=" ORDER BY created DESC";
    
            String strQuery =   "FROM Transaction "
                                +" WHERE userId = " +userId+ "";          

            if(startDate!=null) {
              endDate = endDate.plusDays(1);
              strQuery = strQuery + " AND (created >= '"+startDate+"' AND created <= '"+endDate+"')";
            }
            strQuery = strQuery + orderBy;
            List<Transaction> users = entityManager.createQuery(strQuery, Transaction.class).getResultList();
    
    
            System.out.println("tracequery "+strQuery);
            List<Map<String,Object>> resultDataList = new LinkedList<>();
            users.forEach((Transaction transaction) -> {
                Map<String,Object> resultData = new HashMap<>();
                resultData.put("name", transaction.getName());
                resultData.put("type", transaction.getType());
                resultData.put("mechanic", transaction.getMechanic().getName());
                resultData.put("customer", transaction.getCustomer().getName());
                // resultData.put("stock", transaction.getStock().getName());
                resultData.put("price", transaction.getPrice());
                resultData.put("status", transaction.getStatus());
                // resultData.put("quantity", transaction.getQuantity());
                resultData.put("date", transaction.getCreated());
                resultDataList.add(resultData);
            });

            

            Map<String,Object> result = new HashMap<>();
            if(resultDataList.isEmpty()) throw new Exception("no data found");
            

            result.put("data", resultDataList);
            return result;
    
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        } 
    }

}
