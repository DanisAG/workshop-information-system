package com.example.workshopInformationSystem.service;

import java.util.List;
import java.util.Map;

import com.example.workshopInformationSystem.model.Mechanic;

public interface MechanicService {
    public Mechanic saveMechanic(Mechanic mechanic);
    public Mechanic updateMechanic(Mechanic customer);
    public String deleteMechanic(Integer id);
    public Integer getMechanicTotal(Map<String, Object> reqData);
    public Map<String, Object> getMechanicPagination(Map<String, Object> reqData, int totalData);
    public List<Mechanic> getAllMechanics();
}