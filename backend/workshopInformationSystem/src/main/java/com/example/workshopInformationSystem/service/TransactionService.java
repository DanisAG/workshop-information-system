package com.example.workshopInformationSystem.service;

import java.util.List;
import java.util.Map;

import com.example.workshopInformationSystem.model.Transaction;

public interface TransactionService {
    public Transaction saveTransaction(Transaction stock);
    public Transaction updateTransaction(Transaction stock);
    public String deleteTransaction(Integer id);
    public Integer getTransactionTotal(Map<String, Object> reqData);
    public Map<String, Object> getTransactionPagination(Map<String, Object> reqData, int totalData);
}
