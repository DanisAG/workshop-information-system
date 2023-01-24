package com.example.workshopInformationSystem.model.request;

import java.util.List;

public class FinancialRequest {

    private int id;
    private int sale;
    private int expense;
    private int revenue;
    private String created;
    private String name;
    public String mechanic;
    public String customer;
    public List<Object> stock;
    private String type;
    private int price;
    private int quantity;
    private String status;

    public FinancialRequest() {
    }


    public FinancialRequest(int id, int sale, int expense, int revenue, String created, String name, String mechanic, String customer, List<Object> stock, String type, int price, int quantity, String status) {
        this.id = id;
        this.sale = sale;
        this.expense = expense;
        this.revenue = revenue;
        this.created = created;
        this.name = name;
        this.mechanic = mechanic;
        this.customer = customer;
        this.stock = stock;
        this.type = type;
        this.price = price;
        this.quantity = quantity;
        this.status = status;
    }


    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getSale() {
        return this.sale;
    }

    public void setSale(int sale) {
        this.sale = sale;
    }

    public int getExpense() {
        return this.expense;
    }

    public void setExpense(int expense) {
        this.expense = expense;
    }

    public int getRevenue() {
        return this.revenue;
    }

    public void setRevenue(int revenue) {
        this.revenue = revenue;
    }

    public String getCreated() {
        return this.created;
    }

    public void setCreated(String created) {
        this.created = created;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMechanic() {
        return this.mechanic;
    }

    public void setMechanic(String mechanic) {
        this.mechanic = mechanic;
    }

    public String getCustomer() {
        return this.customer;
    }

    public void setCustomer(String customer) {
        this.customer = customer;
    }

    public List<Object> getStock() {
        return this.stock;
    }

    public void setStock(List<Object> stock) {
        this.stock = stock;
    }

    public String getType() {
        return this.type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getPrice() {
        return this.price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public int getQuantity() {
        return this.quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

}
