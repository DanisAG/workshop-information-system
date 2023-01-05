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
    public String saveStock(@RequestBody Stock stock, @RequestHeader (name="Authorization") String token){
        if(userService.checkToken(token)==false)return "Invalid Token";

        stockService.saveStock(stock, userService.getId(token));
        return "New Stock is added";
    }

    @PostMapping("/update")
    public String updateStock(@RequestBody Stock stock, @RequestHeader (name="Authorization") String token){
        if(userService.checkToken(token)==false)return "Invalid Token";
        stockService.updateStock(stock, userService.getId(token));
        return "Stock is Updated";
    }

    @DeleteMapping("/delete/{id}")
    public String deleteStock(@RequestHeader (name="Authorization") String token, @PathVariable("id") Integer id){
        if(userService.checkToken(token)==false)return "Invalid Token";
        return stockService.deleteStock(id);
    }

    @GetMapping("/getAll")
    public Map<String,Object> getAllStocks(@RequestHeader (name="Authorization") String token){
        Map<String,Object> result = new HashMap<>();
        if(userService.checkToken(token)==false){
            result.put("stock", "Invalid Token");
            return result;
        }
        result.put("stock", stockService.getAllStocks(userService.getId(token)));
        return result;
    }
  
    @PostMapping("/getList")
    public Map<String,Object> getStockPagination(@RequestHeader (name="Authorization") String token, @RequestBody Map<String, Object> reqData){
        Map<String,Object> result = new HashMap<>();
        if(userService.checkToken(token)==false){
            result.put("stock", "Invalid Token");
            return result;
        }
        int totalData = stockService.getStockTotal(reqData, userService.getId(token));
        result = stockService.getStockPagination(reqData, totalData, userService.getId(token));
        return result;
    }

}
