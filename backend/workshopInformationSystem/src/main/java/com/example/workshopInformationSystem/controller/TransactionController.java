package com.example.workshopInformationSystem.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    public String add(@RequestBody TransactionPayload transaction, @RequestHeader (name="Authorization") String token){
        if(userService.checkToken(token)==false)return "Invalid Token";
        transactionService.saveTransaction(transaction);
        return "New Transaction is added";
    }

    @PostMapping("/update")
    public String update(@RequestBody TransactionPayload transaction, @RequestHeader (name="Authorization") String token){
        if(userService.checkToken(token)==false)return "Invalid Token";
        transactionService.updateTransaction(transaction);
        return "Transaction is Updated";
    }

    @DeleteMapping("/delete/{id}")
    public String update(@RequestHeader (name="Authorization") String token, @PathVariable("id") Integer id){
        if(userService.checkToken(token)==false)return "Invalid Token";
        return transactionService.deleteTransaction(id);
    }

    @PostMapping("/getList")
    public Map<String,Object> getPagination(@RequestHeader (name="Authorization") String token, @RequestBody Map<String, Object> reqData){
        Map<String,Object> result = new HashMap<>();
        if(userService.checkToken(token)==false){
            result.put("transaction", "Invalid Token");
            return result;
        }
        int totalData = transactionService.getTransactionTotal(reqData);
        result = transactionService.getTransactionPagination(reqData, totalData);
        return result;
    }

    @PostMapping("/getList/financial")
    public Map<String,Object> getPaginationFinancial(@RequestHeader (name="Authorization") String token, @RequestBody Map<String, Object> reqData){
        Map<String,Object> result = new HashMap<>();
        if(userService.checkToken(token)==false){
            result.put("transaction", "Invalid Token");
            return result;
        }
        int totalData = transactionService.getTransactionTotalFinancial(reqData);
        result = transactionService.getTransactionPaginationFinancial(reqData, totalData);
        return result;
    }

}
