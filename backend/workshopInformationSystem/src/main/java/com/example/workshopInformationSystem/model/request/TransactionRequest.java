package com.example.workshopInformationSystem.model.request;

public class TransactionRequest {

    private int id;
    public String mechanic;
    public String customer;
    public String stock;
    private String name;
    private String type;
    private int price;
    private int quantity;
    private String status;
    private String created;
    private String updated;

    public TransactionRequest() {
    }


    public TransactionRequest(int id, String mechanic, String customer, String stock, String name, String type, int price, int quantity, String status, String created, String updated) {
        this.id = id;
        this.mechanic = mechanic;
        this.customer = customer;
        this.stock = stock;
        this.name = name;
        this.type = type;
        this.price = price;
        this.quantity = quantity;
        this.status = status;
        this.created = created;
        this.updated = updated;
    }

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
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

    public String getStock() {
        return this.stock;
    }

    public void setStock(String stock) {
        this.stock = stock;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
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

    public String getCreated() {
        return this.created;
    }

    public void setCreated(String created) {
        this.created = created;
    }

    public String getUpdated() {
        return this.updated;
    }

    public void setUpdated(String updated) {
        this.updated = updated;
    }
    
}
