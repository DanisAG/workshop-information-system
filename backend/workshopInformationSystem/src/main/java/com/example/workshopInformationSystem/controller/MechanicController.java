package com.example.workshopInformationSystem.controller;

import java.util.List;

import com.example.workshopInformationSystem.model.Mechanic;
import com.example.workshopInformationSystem.service.MechanicService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/mechanic")
@CrossOrigin
public class MechanicController {
    @Autowired
    private MechanicService mechanicService;

    @PostMapping("/add")
    public String add(@RequestBody Mechanic mechanic){
        mechanicService.saveMechanic(mechanic);
        return "New Mechanic is added";
    }

    @GetMapping("/getAll")
    public List<Mechanic> getAllMechanic(){
        return mechanicService.getAllMechanics();
    }

}