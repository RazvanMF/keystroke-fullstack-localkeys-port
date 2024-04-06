package com.example.demo.validators;

import com.example.demo.Account;
import com.example.demo.AccountNotValidException;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class EmailValidator {
    static public boolean ValidateEmail(Account account) {
        Pattern pattern = Pattern.compile("[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,4}", Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(account.getEmail());
        if (!matcher.find())
            throw new AccountNotValidException();
        return true;
    }
}
