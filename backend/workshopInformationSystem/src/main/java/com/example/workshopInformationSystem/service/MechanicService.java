package com.example.workshopInformationSystem.service;

import java.util.List;
import java.util.Map;

import com.example.workshopInformationSystem.model.Mechanic;

public interface MechanicService {
    public Mechanic saveMechanic(Mechanic mechanic, Integer userId);
    public Mechanic updateMechanic(Mechanic customer, Integer userId);
    public String deleteMechanic(Integer id);
    public Integer getMechanicTotal(Map<String, Object> reqData, Integer userId);
    public Map<String, Object> getMechanicPagination(Map<String, Object> reqData, int totalData, Integer userId);
    public List<Mechanic> getAllMechanics(Integer userId);
}