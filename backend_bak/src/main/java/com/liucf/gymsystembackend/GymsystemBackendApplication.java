package com.liucf.gymsystembackend;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.liucf.gymsystembackend.mapper")
public class GymsystemBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(GymsystemBackendApplication.class, args);
    }

}
