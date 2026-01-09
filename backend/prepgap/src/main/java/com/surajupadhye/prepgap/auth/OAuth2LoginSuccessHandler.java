package com.surajupadhye.prepgap.auth;

import com.surajupadhye.prepgap.user.User;
import com.surajupadhye.prepgap.user.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.Instant;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final UserRepository userRepository;

    @Value("${app.frontend.dashboard-url}")
    private String frontendDashboardUrl;
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getAttribute("email");

        // 1. Sync User to MongoDB
        Optional<User> existingUser = userRepository.findByEmail(email);
        if (existingUser.isPresent()) {
            User user = existingUser.get();
            user.setLastLoginAt(Instant.now());
            userRepository.save(user);
        } else {
            User newUser = new User();
            newUser.setEmail(email);
            newUser.setCreatedAt(Instant.now());
            newUser.setLastLoginAt(Instant.now());
            userRepository.save(newUser);
        }

        // 2. Redirect
        getRedirectStrategy().sendRedirect(request, response, frontendDashboardUrl);
    }
}