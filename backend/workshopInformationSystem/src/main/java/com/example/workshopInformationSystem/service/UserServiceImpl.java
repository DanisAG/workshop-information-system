package com.example.workshopInformationSystem.service;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import com.example.workshopInformationSystem.model.User;
import com.example.workshopInformationSystem.repository.UserRepository;
import com.example.workshopInformationSystem.util.CommonMethod;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @PersistenceContext
    private EntityManager entityManager;
    
    @Override
    public User saveUser(User user){
        try {            

            User users = new User();
            users.setUsername(user.getUsername());
            users.setPassword(user.getPassword()); 
            users.setToken(new CommonMethod().generateToken());
            // LocalDate now = LocalDate.now();
            // now = now.plusDays(1);
    
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(new Date());
            calendar.add(Calendar.HOUR_OF_DAY, 12);

            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            sdf.setTimeZone(TimeZone.getTimeZone("Asia/Jakarta"));
            Date dtNow = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(sdf.format(calendar.getTime()));
            // Date date = Date.from(now.atStartOfDay(ZoneId.systemDefault()).toInstant());
            users.setExpiredDate(dtNow);
            userRepository.save(users);

            Map<String, Object> userData = new HashMap<>();
            userData.put("user", users);
            return users;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public User logInUser(User user){
        try {            
            String query = "FROM User WHERE username=:username and password=:password";
            Query queryResult = entityManager.createQuery(query);
            queryResult.setParameter("username", user.getUsername());
            queryResult.setParameter("password", user.getPassword());
            User resultList = (User) queryResult.getSingleResult();

            Calendar calendar = Calendar.getInstance();
            calendar.setTime(new Date());
            calendar.add(Calendar.HOUR_OF_DAY, 12);
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            sdf.setTimeZone(TimeZone.getTimeZone("Asia/Jakarta"));
            Date dtNow = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(sdf.format(calendar.getTime()));
            resultList.setExpiredDate(dtNow);
            resultList.setToken(new CommonMethod().generateToken());
            userRepository.save(resultList);

            return resultList;
        } catch (Exception e) {
            // e.printStackTrace();
            return null;
        }
    }

    @Override
    public Boolean checkToken(String token){
        try {            
            String[] tokens = token.split(" ");
            String query = "SELECT count(*) as total FROM User WHERE token=:token and ExpiredDate>:ExpiredDate";
            Query queryResult = entityManager.createQuery(query);
            queryResult.setParameter("token", tokens[1]);
            queryResult.setParameter("ExpiredDate", new Date());
            Long resultList = (Long) queryResult.getSingleResult();

            if(resultList>0)return true;
            else return false;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User tokenUser(Map<String, Object> reqData) {
        try{
            String query = "FROM User WHERE token=:token ";
            Query queryResult = entityManager.createQuery(query);
            queryResult.setParameter("token", reqData.get("token"));
            User resultList = (User) queryResult.getSingleResult();
        return resultList;
        }catch(Exception e){
            e.printStackTrace();
            return null;
        }

    }
    
}
