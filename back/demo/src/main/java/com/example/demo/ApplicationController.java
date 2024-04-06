package com.example.demo;

import com.example.demo.validators.EmailValidator;
import com.example.demo.validators.PasswordValidator;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
@CrossOrigin(origins = "http://localhost:3000")

public class ApplicationController {
    private final AccountRepository accountRepository;

    public ApplicationController(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @GetMapping("/accounts")
    public List<Account> getAccounts() {
        return (List<Account>) accountRepository.findAll();
    }

    @GetMapping("/lastID")
    public Long getLastID() {
        return getAccounts().stream().map(Account::getId).max(Long::compare).get();
    }

    @GetMapping("/isOnline")
    public String returnYesIfCalled() {
        return "yes";
    }

    @PostMapping("/accounts")
    void addAccount(@RequestBody Account account) {
        //validate for email
        EmailValidator.ValidateEmail(account);

        //validate for password
        //PasswordValidator.ValidatePassword(account);

        //validate for existence
        if (getAccounts().contains(account))
            throw new AccountNotValidException();

        accountRepository.save(account);
    }

    @GetMapping("/accounts/{id}")
    Account one(@PathVariable Long id) {
        return accountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Can't find " + id.toString()));
    }

    @PutMapping("/accounts/{id}")
    Account replaceAccount(@RequestBody Account newAccount, @PathVariable Long id) {
        //validate for email
        EmailValidator.ValidateEmail(newAccount);

        //validate for password
        //PasswordValidator.ValidatePassword(newAccount);

        //validate for existence
        if (getAccounts().contains(newAccount))
            throw new AccountNotValidException();

        return accountRepository.findById(id)
                .map(account -> {
                    account.setService(newAccount.getService());
                    account.setEmail(newAccount.getEmail());
                    account.setUsername(newAccount.getUsername());
                    account.setPassword(newAccount.getPassword());
                    return accountRepository.save(account);
                })
                .orElseGet(() -> {
                    newAccount.setId(id);
                    return accountRepository.save(newAccount);
                });
    }

    @DeleteMapping("/accounts/{id}")
    void deleteEmployee(@PathVariable Long id) {
        accountRepository.deleteById(id);
    }
}
