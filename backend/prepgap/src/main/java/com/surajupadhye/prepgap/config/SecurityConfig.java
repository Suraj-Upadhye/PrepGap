package com.surajupadhye.prepgap.config;

import com.surajupadhye.prepgap.auth.OAuth2LoginSuccessHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;

    // This is used for Logout Redirect (e.g., https://prepgap.vercel.app)
    @Value("${app.base-url}")
    private String baseUrl;

    // --- MISSING PART ADDED HERE ---
    // This is used for CORS logic (e.g., https://prepgap.vercel.app/dashboard)
    @Value("${app.frontend.dashboard-url}")
    private String frontendDashboardUrl;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // CORS Configuration
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                // Disable CSRF for simplicity
                .csrf(AbstractHttpConfigurer::disable)

                // Authorization
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/", "/login/**", "/oauth2/**", "/logout", "/health").permitAll()
                        .anyRequest().authenticated()
                )

                // OAuth2 Login
                .oauth2Login(oauth2 -> oauth2
                        .successHandler(oAuth2LoginSuccessHandler)
                )

                // Logout Configuration
                .logout(logout -> logout
                        .logoutUrl("/logout")
                        .logoutSuccessUrl(baseUrl) // Redirect to Landing Page
                        .invalidateHttpSession(true)
                        .clearAuthentication(true)
                        .deleteCookies("JSESSIONID")
                );

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // 1. Clean the URL: Remove "/dashboard" if it exists to get the pure origin
        // Example: https://prepgap.vercel.app/dashboard -> https://prepgap.vercel.app
        String frontendOrigin = frontendDashboardUrl.replace("/dashboard", "");

        // 2. Set Allowed Origins (Local + Production)
        configuration.setAllowedOrigins(List.of(
                "http://localhost:3000",
                "http://localhost:5173",
                frontendOrigin // <--- Uses the injected variable correctly now
        ));

        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true); // Essential for cookies

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}