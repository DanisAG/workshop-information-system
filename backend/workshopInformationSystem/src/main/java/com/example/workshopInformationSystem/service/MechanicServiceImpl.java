package com.example.workshopInformationSystem.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.example.workshopInformationSystem.model.Mechanic;
import com.example.workshopInformationSystem.repository.MechanicRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MechanicServiceImpl implements MechanicService {
    @Autowired
    private MechanicRepository mechanicRepository;

    @Override
    public Mechanic saveMechanic(Mechanic mechanic){
        try {

            Mechanic mechanics = new Mechanic();
            mechanics.setName(mechanic.getName());
            mechanics.setDob(mechanic.getDob()); 
            mechanics.setGender(mechanic.getGender());
            mechanics.setAddress(mechanic.getAddress());
            mechanics.setPhone(mechanic.getPhone());
            mechanics.setEmail(mechanic.getEmail());

            mechanicRepository.save(mechanics);

            Map<String, Object> userData = new HashMap<>();
            userData.put("user", mechanic);
            return mechanics;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List<Mechanic> getAllMechanics() {
        return mechanicRepository.findAll();
    }

}