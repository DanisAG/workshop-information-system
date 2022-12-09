package com.example.workshopInformationSystem.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.example.workshopInformationSystem.model.Stock;
import com.example.workshopInformationSystem.repository.StockRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StockServiceImpl implements StockService {
    @Autowired
    private StockRepository stockRepository;

    @Override
    public Stock saveStock(Stock stock){
        try {            

            Stock stocks = new Stock();
            stocks.setName(stock.getName());
            stocks.setPrice(stock.getPrice()); 
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
    public List<Stock> getAllStocks() {
        return stockRepository.findAll();
    }
    

}