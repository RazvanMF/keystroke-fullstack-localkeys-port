package com.example.demo;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.Objects;

@Entity
public class Account {

    private @Id
    @GeneratedValue(strategy = GenerationType.AUTO) Long id;
    private String service;
    private String username;
    private String email;
    private String password;

    public Account(String service, String email, String username, String password) {
        this.service = service;
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public Account() {

    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Account rhs = (Account) o;
        return (Objects.equals(id, rhs.id)) ||
                (Objects.equals(service, rhs.service) && Objects.equals(email, rhs.email) &&
                Objects.equals(username, rhs.username) && Objects.equals(password, rhs.password));
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, service, email, username, password);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "Employee{" +
                "id=" + id +
                ", service='" + service + "'" +
                ", email='" + email + "'" +
                ", username='" + username + "'" +
                ", password='" + password + "'" +
                '}';
    }


    public String getService() {
        return service;
    }

    public void setService(String service) {
        this.service = service;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}