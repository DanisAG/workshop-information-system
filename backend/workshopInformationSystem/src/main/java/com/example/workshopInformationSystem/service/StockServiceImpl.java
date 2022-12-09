package com.example.workshopInformationSystem.service;

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
        return stockRepository.save(stock);
    }

}