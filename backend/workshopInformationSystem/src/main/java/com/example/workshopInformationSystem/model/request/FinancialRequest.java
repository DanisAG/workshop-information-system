package com.example.workshopInformationSystem.model.request;

public class FinancialRequest {

    private int id;
    private int sale;
    private int expense;
    private int revenue;
    private String created;
    private String name;

    public FinancialRequest() {
    }


    public FinancialRequest(int id, int sale, int expense, int revenue, String created, String name) {
        this.id = id;
        this.sale = sale;
        this.expense = expense;
        this.revenue = revenue;
        this.created = created;
        this.name = name;
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

}
