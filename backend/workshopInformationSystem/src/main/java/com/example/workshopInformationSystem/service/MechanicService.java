package com.example.workshopInformationSystem.service;

import java.util.List;

import com.example.workshopInformationSystem.model.Mechanic;

public interface MechanicService {
    public Mechanic saveMechanic(Mechanic mechanic);
    public List<Mechanic> getAllMechanics();
}