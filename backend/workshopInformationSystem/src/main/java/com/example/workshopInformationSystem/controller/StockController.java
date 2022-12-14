package com.example.workshopInformationSystem.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.example.workshopInformationSystem.model.Stock;
import com.example.workshopInformationSystem.service.StockService;
import com.example.workshopInformationSystem.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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
  
}
