package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tb_jsg")
public class kanbanEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String customer;
    private String caller;
    private String status;
    private String context;

    // 기본 생성자 및 게터/세터
    public kanbanEntity() {}

    public kanbanEntity(Long id, String customer, String caller, String status, String context) {
        this.id = id;
        this.customer = customer;
        this.caller = caller;
        this.status = status;
        this.context = context;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCustomer() {
        return customer;
    }

    public void setCustomer(String customer) {
        this.customer = customer;
    }

    public String getCaller() {
        return caller;
    }

    public void setCaller(String caller) {
        this.caller = caller;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getContext() {
        return context;
    }

    public void setContext(String context) {
        this.context = context;
    }
}
