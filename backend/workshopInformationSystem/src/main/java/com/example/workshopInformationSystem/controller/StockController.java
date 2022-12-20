package com.example.workshopInformationSystem.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.example.workshopInformationSystem.model.Stock;
import com.example.workshopInformationSystem.service.StockService;
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
@RequestMapping("/stock")
@CrossOrigin
public class StockController {
    @Autowired
    private StockService stockService;

    @Autowired
    private UserService userService;
    
    @PostMapping("/add")
    public String add(@RequestBody Stock stock, @RequestHeader (name="Authorization") String token){
        if(userService.checkToken(token)==false)return "Invalid Token";
        stockService.saveStock(stock);
        return "New Stock is added";
    }

    @PostMapping("/update")
    public String update(@RequestBody Stock stock, @RequestHeader (name="Authorization") String token){
        if(userService.checkToken(token)==false)return "Invalid Token";
        stockService.updateStock(stock);
        return "Stock is Updated";
    }

    @DeleteMapping("/delete/{id}")
    public String update(@RequestHeader (name="Authorization") String token, @PathVariable("id") Integer id){
        if(userService.checkToken(token)==false)return "Invalid Token";
        return stockService.deleteStock(id);
    }

    @GetMapping("/getAll")
    public Map<String,Object> getAllStudents(@RequestHeader (name="Authorization") String token){
        Map<String,Object> result = new HashMap<>();
        if(userService.checkToken(token)==false){
            result.put("stock", "Invalid Token");
            return result;
        }
        result.put("stock", stockService.getAllStocks());
        return result;
    }
  
    @PostMapping("/getList")
    public Map<String,Object> getPagination(@RequestHeader (name="Authorization") String token, @RequestBody Map<String, Object> reqData){
        Map<String,Object> result = new HashMap<>();
        if(userService.checkToken(token)==false){
            result.put("stock", "Invalid Token");
            return result;
        }
        result.put("stock", stockService.getAllStocks());
        int totalData = stockService.getStockTotal(reqData);
        result = stockService.getStockPagination(reqData, totalData);
        return result;
    }

}
