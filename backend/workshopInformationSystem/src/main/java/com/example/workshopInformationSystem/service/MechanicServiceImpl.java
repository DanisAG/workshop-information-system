package com.example.workshopInformationSystem.service;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import com.example.workshopInformationSystem.model.Mechanic;
import com.example.workshopInformationSystem.repository.MechanicRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MechanicServiceImpl implements MechanicService {
    
    @Autowired
    private MechanicRepository mechanicRepository;

    @PersistenceContext
    private EntityManager entityManager;

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
    public Mechanic updateMechanic(Mechanic mechanic){
        try {            

            Mechanic mechanics = new Mechanic();
            mechanics.setId(mechanic.getId());
            mechanics.setName(mechanic.getName());
            mechanics.setDob(mechanic.getDob()); 
            mechanics.setGender(mechanic.getGender());
            mechanics.setAddress(mechanic.getAddress());
            mechanics.setPhone(mechanic.getPhone());
            mechanics.setEmail(mechanic.getEmail());

            
            mechanicRepository.save(mechanics);

            Map<String, Object> userData = new HashMap<>();
            userData.put("mechanic", mechanics);
            return mechanics;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public String deleteMechanic(Integer id){
        try {                        
            mechanicRepository.deleteById(id);
            return "Mechanics Deleted";
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to Delete Mechanics";
        }
    }

    @Override
    public List<Mechanic> getAllMechanics() {
        return mechanicRepository.findAll();
    }

    @Override
    public Integer getMechanicTotal(Map<String, Object> reqData) {
        Long totalData = null;
        try {

            String key = reqData.get("keyword") != null ? reqData.get("keyword").toString().toLowerCase() : "";

            String query = "SELECT COUNT(a) FROM Mechanic a WHERE a.id>0 ";

            if(!key.isEmpty()){
                query += " AND (UPPER(a.name) LIKE '%" + key + "%' OR UPPER(a.email) LIKE '%" + key + "%' or UPPER(a.phone) LIKE '%" + key + "%') ";
            }
            Query queryResult = entityManager.createQuery(query,Long.class);

            totalData = (Long) queryResult.getSingleResult();
            return totalData.intValue();
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    @Override
    public Map<String, Object> getMechanicPagination(Map<String, Object> reqData, int totalData) {
        List<Mechanic> listUsers = new LinkedList<>();
        Map<String, Object> data = new HashMap<>();
        Map<String, Object> pagination = new HashMap<>();
        try {
            int limit =reqData.get("limit") != null ? Integer.parseInt(reqData.get("limit").toString()) : 0;
            int currentPage =reqData.get("page") !=null ? Integer.parseInt(reqData.get("page").toString()) : 0;
            String key = reqData.get("keyword") != null ? reqData.get("keyword").toString().toUpperCase() : "";
            Map<String, Object> filtered = new HashMap<>();
            String orderBy = "";
            String sort = "";
            if (reqData.get("orderBy")!=null) {
                filtered = (Map<String, Object>) reqData.get("orderBy");
                String field = filtered.get("field")!=null?filtered.get("field").toString():"";
                String sortField = filtered.get("sort")!=null?filtered.get("sort").toString():"";
                orderBy = !field.isEmpty() ? "a." + field : "";
                sort = !sortField.isEmpty()  ? sortField.toString().toUpperCase() : "";
            }
            int totalPage = (totalData % limit) == 0 ? (totalData/limit) : (totalData/limit) + 1;
            int offset = 0;
            int page = currentPage - 1;
            boolean hasPrev = false;
            boolean hasNext = false;
            if(currentPage > 0 && currentPage <= totalPage) offset = page*limit;
            if(currentPage < 2 && currentPage < totalPage) hasNext = true;
            if(currentPage >=2 && currentPage < totalPage){
                hasPrev = true;
                hasNext = true;
            }
            if(currentPage == totalPage) hasPrev = true;
            if(totalPage == 1){
                hasPrev = false;
                hasNext = false;
            }
            
            List<Mechanic> users = new LinkedList<>();
            String query = "SELECT a FROM Mechanic a WHERE a.id>0 ";

            if(!key.isEmpty()){
                query += " AND (UPPER(a.name) LIKE '%" + key + "%' OR UPPER(a.email) LIKE '%" + key + "%' or UPPER(a.phone) LIKE '%" + key + "%') ";
            }
            if(!orderBy.isEmpty() && !sort.isEmpty()) query += " ORDER BY " + orderBy + " " + sort;
            else query += " ORDER BY a.id DESC";
            System.out.println(query);
            users = entityManager.createQuery(query, Mechanic.class).setMaxResults(limit).setFirstResult(offset).getResultList();
            users.forEach((Mechanic mechanic) -> {
                listUsers.add(mechanic);
            });
            pagination.put("totalPage", totalPage);
            pagination.put("totalItem", totalData);
            pagination.put("limit", limit);
            pagination.put("currentPage", currentPage);
            pagination.put("hasPrevious", hasPrev);
            pagination.put("hasNext", hasNext);

            data.put("result", listUsers);
            data.put("pagination", pagination);
            return data;
        } catch (Exception e) {
            e.printStackTrace();
            data.put("result", listUsers);
            data.put("pagination", pagination);
            return data;
        }
    }
    
}