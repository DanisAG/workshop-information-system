package com.example.workshopInformationSystem.repository;

import com.example.workshopInformationSystem.model.Transaction;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Integer>  {
    
}
