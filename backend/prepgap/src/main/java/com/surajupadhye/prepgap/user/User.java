package com.surajupadhye.prepgap.user;

import com.surajupadhye.prepgap.auth.AuthProvider;
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

    private String password; // BCrypt hashed

    private AuthProvider authProvider = AuthProvider.LOCAL;

    private boolean isVerified = false;

    // OTP for Email Verification
    private String otp;
    private Instant otpExpiry;

    // Password Reset
    private String resetToken;
    private Instant resetTokenExpiry;

    private String collegeId; // references College.id

    private String department;

    private Integer graduationYear;

    private Instant createdAt = Instant.now();

    private Instant lastLoginAt;
}
