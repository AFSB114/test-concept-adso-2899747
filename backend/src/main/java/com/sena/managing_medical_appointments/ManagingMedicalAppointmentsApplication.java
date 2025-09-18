package com.sena.managing_medical_appointments;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class ManagingMedicalAppointmentsApplication {

    public static void main(String[] args) {
        SpringApplication.run(ManagingMedicalAppointmentsApplication.class, args);
    }

}
