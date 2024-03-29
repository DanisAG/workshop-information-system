package com.example.workshopInformationSystem.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import com.example.workshopInformationSystem.model.Stock;
import com.example.workshopInformationSystem.model.Transaction;
import com.example.workshopInformationSystem.model.request.TransactionPayload;
import com.example.workshopInformationSystem.service.StockService;
import com.example.workshopInformationSystem.service.TransactionService;
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
@RequestMapping("/transaction")
@CrossOrigin
public class TransactionController {
    @Autowired
    private TransactionService transactionService;

    @Autowired
    private UserService userService;
    
    @PostMapping("/add")
    public String saveTransaction(@RequestBody TransactionPayload transaction, @RequestHeader (name="Authorization") String token){
        if(userService.checkToken(token)==false)return "Invalid Token";
        transactionService.saveTransaction(transaction, userService.getId(token));
        return "New Transaction is added";
    }

    @PostMapping("/update")
    public String updateTransaction(@RequestBody TransactionPayload transaction, @RequestHeader (name="Authorization") String token){
        if(userService.checkToken(token)==false)return "Invalid Token";
        transactionService.updateTransaction(transaction, userService.getId(token));
        return "Transaction is Updated";
    }

    @DeleteMapping("/delete/{id}")
    public String deleteTransaction(@RequestHeader (name="Authorization") String token, @PathVariable("id") Integer id){
        if(userService.checkToken(token)==false)return "Invalid Token";
        return transactionService.deleteTransaction(id);
    }

    @PostMapping("/getList")
    public Map<String,Object> getTransactionPagination(@RequestHeader (name="Authorization") String token, @RequestBody Map<String, Object> reqData){
        Map<String,Object> result = new HashMap<>();
        if(userService.checkToken(token)==false){
            result.put("transaction", "Invalid Token");
            return result;
        }
        int totalData = transactionService.getTransactionTotal(reqData, userService.getId(token));
        result = transactionService.getTransactionPagination(reqData, totalData, userService.getId(token));
        return result;
    }

    @PostMapping("/getList/financial")
    public Map<String,Object> getTransactionPaginationFinancial(@RequestHeader (name="Authorization") String token, @RequestBody Map<String, Object> reqData){
        Map<String,Object> result = new HashMap<>();
        if(userService.checkToken(token)==false){
            result.put("transaction", "Invalid Token");
            return result;
        }
        int totalData = transactionService.getTransactionTotalFinancial(reqData, userService.getId(token));
        result = transactionService.getTransactionPaginationFinancial(reqData, totalData, userService.getId(token));
        return result;
    }

    @PostMapping("/getReport")
    public Map<String,Object> getReport(@RequestHeader (name="Authorization") String token, @RequestBody Map<String, Object> reqData){
        Map<String,Object> result = new HashMap<>();
        if(userService.checkToken(token)==false){
            result.put("transaction", "Invalid Token");
            return result;
        }
        result = transactionService.getReport(reqData, userService.getId(token));
        return result;
    }

    @GetMapping("/mostStock")
    public Map<String,Object> mostStock(@RequestHeader (name="Authorization") String token){
        Map<String,Object> result = new HashMap<>();
        if(userService.checkToken(token)==false){
            result.put("transaction", "Invalid Token");
            return result;
        }
        result = transactionService.mostStock(userService.getId(token));
        return result;
    }

    @PostMapping("/export")
    public void exportData(@RequestHeader (name="Authorization") String token, HttpServletResponse response, @RequestBody Map<String, Object> payload) {
        try { 
            transactionService.exportData(response, payload, userService.getId(token));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
