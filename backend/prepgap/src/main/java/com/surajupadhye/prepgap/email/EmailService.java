package com.surajupadhye.prepgap.email;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    public void sendVerificationOtp(String to, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Verify your PrepGap Account");
        message.setText("Your OTP for registration is: " + otp + "\nThis OTP is valid for 10 minutes.");
        mailSender.send(message);
    }

    public void sendPasswordResetToken(String to, String token) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Reset your PrepGap Password");
        message.setText("Click the following link to reset your password: \n" +
                "http://localhost:5173/reset-password?token=" + token + "\n" +
                "This link is valid for 1 hour.");
        mailSender.send(message);
    }
}
