package com.example.demo.validators;

import com.example.demo.Account;
import com.example.demo.AccountNotValidException;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class PasswordValidator {
    static public boolean ValidatePassword(Account account) {
        Pattern pattern = Pattern.compile("^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$");
        Matcher matcher = pattern.matcher(account.getPassword());
        if (!matcher.find())
            throw new AccountNotValidException();
        return true;
    }
}
