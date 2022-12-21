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
    public String add(@RequestBody Mechanic mechanic, @RequestHeader (name="Authorization") String token){
        if(userService.checkToken(token)==false)return "Invalid Token";
        mechanicService.saveMechanic(mechanic);
        return "New Mechanic is added";
    }

    @PostMapping("/update")
    public String update(@RequestBody Mechanic mechanic, @RequestHeader (name="Authorization") String token){
        if(userService.checkToken(token)==false)return "Invalid Token";
        mechanicService.updateMechanic(mechanic);
        return "Mechanic is Updated";
    }

    @DeleteMapping("/delete/{id}")
    public String update(@RequestHeader (name="Authorization") String token, @PathVariable("id") Integer id){
        if(userService.checkToken(token)==false)return "Invalid Token";
        return mechanicService.deleteMechanic(id);
    }
    
    @PostMapping("/getList")
    public Map<String,Object> getPagination(@RequestHeader (name="Authorization") String token, @RequestBody Map<String, Object> reqData){
        Map<String,Object> result = new HashMap<>();
        if(userService.checkToken(token)==false){
            result.put("mechanic", "Invalid Token");
            return result;
        }
        int totalData = mechanicService.getMechanicTotal(reqData);
        result = mechanicService.getMechanicPagination(reqData, totalData);
        return result;
    }

    @GetMapping("/getAll")
    public List<Mechanic> getAllMechanic(){
        return mechanicService.getAllMechanics();
    }

}