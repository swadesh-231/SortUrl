package com.backend;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        // Load from current directory
        Dotenv.configure()
                .ignoreIfMissing()
                .load()
                .entries()
                .forEach(entry -> System.setProperty(entry.getKey(), entry.getValue()));

        // Load from Backend directory (useful when running from project root)
        Dotenv.configure()
                .directory("Backend")
                .ignoreIfMissing()
                .load()
                .entries()
                .forEach(entry -> System.setProperty(entry.getKey(), entry.getValue()));
        SpringApplication.run(BackendApplication.class, args);
    }

}
