package com.example.workshopInformationSystem.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.example.workshopInformationSystem.model.Stock;
import com.example.workshopInformationSystem.model.User;
import com.example.workshopInformationSystem.service.StockService;
import com.example.workshopInformationSystem.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/add")
    public String saveUser(@RequestBody User user){
        userService.saveUser(user);
        return "New User is added";
    }

    @PostMapping("/update")
    public String updateUser(@RequestBody User user){
        userService.updateUser(user);
        return "User is updated";
    }

    @GetMapping("/getAll")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @PostMapping("/login")
    public Map<String,Object> logInUser(@RequestBody User user){
        Map<String,Object> result = new HashMap<>();
        User res = userService.logInUser(user);
        if(res==null){
            result.put("user","user nor found");
            return result;
        }
        result.put("user",res);

        return result;
    }

    @PostMapping("/getbytoken")
    public Map<String,Object> tokenUser(@RequestBody Map<String, Object> reqData){
        Map<String,Object> result = new HashMap<>();
        User res = userService.tokenUser(reqData);
        if(res==null){
            result.put("user","user nor found");
            return result;
        }
        result.put("user",res);

        return result;
    }

}
