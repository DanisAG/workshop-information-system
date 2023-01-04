package com.example.workshopInformationSystem.service;

import java.util.List;
import java.util.Map;

import com.example.workshopInformationSystem.model.User;
public interface UserService{
    public User saveUser(User user);
    public User updateUser(User user);
    public User logInUser(User user);
    public Boolean checkToken(String token);
    public Integer getId(String token);
    public List<User> getAllUsers();
    public User tokenUser(Map<String, Object> reqData);
}
