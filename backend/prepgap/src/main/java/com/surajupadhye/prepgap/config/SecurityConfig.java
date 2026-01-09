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

    @Value("${app.base-url}")
    private String baseUrl;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // CORS Configuration
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                // Disable CSRF for simplicity
                .csrf(AbstractHttpConfigurer::disable)

                // Authorization
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/", "/login/**", "/oauth2/**", "/logout").permitAll() // Allow logout access
                        .anyRequest().authenticated()
                )

                // OAuth2 Login
                .oauth2Login(oauth2 -> oauth2
                        .successHandler(oAuth2LoginSuccessHandler)
                )

                // --- ADDED LOGOUT CONFIGURATION ---
                .logout(logout -> logout
                        .logoutUrl("/logout") // The URL to trigger logout
                        .logoutSuccessUrl(baseUrl) // Redirect here after logout
                        .invalidateHttpSession(true) // Kill the session
                        .clearAuthentication(true)
                        .deleteCookies("JSESSIONID") // Kill the cookie
                );

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of(baseUrl));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}