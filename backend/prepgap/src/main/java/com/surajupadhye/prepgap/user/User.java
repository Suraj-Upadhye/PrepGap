package com.surajupadhye.prepgap.user;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@Document(collection = "users")
public class User {

    @Id
    private String id;

    private String email;

    private String collegeId; // references College.id

    private String department;

    private Integer graduationYear;

    private Instant createdAt = Instant.now();

    private Instant lastLoginAt;
}
