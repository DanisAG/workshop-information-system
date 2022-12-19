package com.example.workshopInformationSystem.repository;

import com.example.workshopInformationSystem.model.Mechanic;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MechanicRepository extends JpaRepository<Mechanic, Integer> {
}