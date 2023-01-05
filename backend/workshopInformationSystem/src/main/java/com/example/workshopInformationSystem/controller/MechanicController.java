package com.example.workshopInformationSystem.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.example.workshopInformationSystem.model.Mechanic;
import com.example.workshopInformationSystem.service.MechanicService;
import com.example.workshopInformationSystem.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/mechanic")
@CrossOrigin
public class MechanicController {
    @Autowired
    private MechanicService mechanicService;

    @Autowired
    private UserService userService;

    @PostMapping("/add")
    public String saveMechanic(@RequestBody Mechanic mechanic, @RequestHeader (name="Authorization") String token){
        if(userService.checkToken(token)==false)return "Invalid Token";
        mechanicService.saveMechanic(mechanic, userService.getId(token));
        return "New Mechanic is added";
    }

    @PostMapping("/update")
    public String updateMechanic(@RequestBody Mechanic mechanic, @RequestHeader (name="Authorization") String token){
        if(userService.checkToken(token)==false)return "Invalid Token";
        mechanicService.updateMechanic(mechanic, userService.getId(token));
        return "Mechanic is Updated";
    }

    @DeleteMapping("/delete/{id}")
    public String deleteMechanic(@RequestHeader (name="Authorization") String token, @PathVariable("id") Integer id){
        if(userService.checkToken(token)==false)return "Invalid Token";
        return mechanicService.deleteMechanic(id);
    }
    
    @PostMapping("/getList")
    public Map<String,Object> getMechanicPagination(@RequestHeader (name="Authorization") String token, @RequestBody Map<String, Object> reqData){
        Map<String,Object> result = new HashMap<>();
        if(userService.checkToken(token)==false){
            result.put("mechanic", "Invalid Token");
            return result;
        }
        int totalData = mechanicService.getMechanicTotal(reqData, userService.getId(token));
        result = mechanicService.getMechanicPagination(reqData, totalData, userService.getId(token));
        return result;
    }

    @GetMapping("/getAll")
    public List<Mechanic> getAllMechanics(@RequestHeader (name="Authorization") String token){
        return mechanicService.getAllMechanics(userService.getId(token));
    }

}