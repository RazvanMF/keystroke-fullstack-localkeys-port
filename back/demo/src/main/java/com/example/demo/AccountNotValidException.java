package com.example.demo;

public class AccountNotValidException extends RuntimeException {
    public AccountNotValidException() {
        super("Encountered Problem when performing operation on this account");
    }
}
