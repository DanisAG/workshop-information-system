package com.example.workshopInformationSystem.service;

import java.util.List;
import java.util.Map;

import com.example.workshopInformationSystem.model.Stock;

public interface StockService {
    public Stock saveStock(Stock stock, Integer userId);
    public Stock updateStock(Stock stock, Integer userId);
    public String deleteStock(Integer id);
    public Integer getStockTotal(Map<String, Object> reqData, Integer userId);
    public Map<String, Object> getStockPagination(Map<String, Object> reqData, int totalData, Integer userId);
    public List<Stock> getAllStocks(Integer userId);
}