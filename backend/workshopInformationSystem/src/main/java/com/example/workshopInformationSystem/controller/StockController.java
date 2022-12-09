package com.example.workshopInformationSystem.controller;

import com.example.workshopInformationSystem.model.Stock;
import com.example.workshopInformationSystem.service.StockService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/stock")
@CrossOrigin
public class StockController {
    @Autowired
    private StockService stockService;

    @PostMapping("/add")
    public String add(@RequestBody Stock stock){
        stockService.saveStock(stock);
        return "New Stock is added";
    }
  
}
