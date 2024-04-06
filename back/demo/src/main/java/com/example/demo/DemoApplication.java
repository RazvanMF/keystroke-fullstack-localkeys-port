package com.example.demo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@SpringBootApplication
public class DemoApplication {
	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@Bean
	CommandLineRunner init(AccountRepository accountRepository) {
		return args -> {
			accountRepository.save(new Account("Twitter", "razalternative@gmail.com", "RazvanMF", "parolatwitter"));
			accountRepository.save(new Account("Dragons: Rise of Berk", "budasurazvan55@gmail.com", "[BANNED]", "razvan08"));
			accountRepository.save(new Account("Reddit", "budasurazvan.mf@gmail.com", "RazvanMF", "redditpassword"));
			accountRepository.save(new Account("Yahoo Messenger", "razvanbudasu@yahoo.com", "fifiben10", "fabian"));
			accountRepository.save(new Account("Facebook", "budasurazvan.mf@gmail.com", "RazvanMF", "genericfacebookpassword"));

			accountRepository.findAll().forEach(System.out::println);
			};
	};
}
