package com.example.workshopInformationSystem.service;

import java.util.List;
import java.util.Map;

import com.example.workshopInformationSystem.model.Transaction;
import com.example.workshopInformationSystem.model.request.TransactionPayload;

public interface TransactionService {
    public Transaction saveTransaction(TransactionPayload stock, Integer userId);
    public Transaction updateTransaction(TransactionPayload stock, Integer userId);
    public String deleteTransaction(Integer id);
    public Integer getTransactionTotal(Map<String, Object> reqData, Integer userId);
    public Map<String, Object> getTransactionPagination(Map<String, Object> reqData, int totalData, Integer userId);
    public Integer getTransactionTotalFinancial(Map<String, Object> reqData, Integer userId);
    public Map<String, Object> getTransactionPaginationFinancial(Map<String, Object> reqData, int totalData, Integer userId);
    public Map<String, Object> getReport(Map<String, Object> reqData, Integer userId);
    public Map<String, Object> mostStock(Integer userId);
}
