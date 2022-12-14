package com.example.workshopInformationSystem.service;

import java.util.List;

import com.example.workshopInformationSystem.model.User;
public interface UserService{
    public User saveUser(User user);
    public List<User> getAllUsers();

}
