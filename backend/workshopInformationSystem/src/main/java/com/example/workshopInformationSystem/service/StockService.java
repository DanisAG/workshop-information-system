package com.example.workshopInformationSystem.service;

import java.util.List;

import com.example.workshopInformationSystem.model.Stock;

public interface StockService {
    public Stock saveStock(Stock stock);
    public Stock updateStock(Stock stock);
    public String deleteStock(Integer id);
    public List<Stock> getAllStocks();
}