package com.example.workshopInformationSystem.service;

import java.util.List;
import java.util.Map;

import com.example.workshopInformationSystem.model.Stock;

public interface StockService {
    public Stock saveStock(Stock stock);
    public Stock updateStock(Stock stock);
    public String deleteStock(Integer id);
    public Integer getStockTotal(Map<String, Object> reqData);
    public Map<String, Object> getStockPagination(Map<String, Object> reqData, int totalData);
    public List<Stock> getAllStocks();
}