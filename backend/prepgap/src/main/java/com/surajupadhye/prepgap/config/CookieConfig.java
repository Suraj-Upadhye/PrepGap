package com.surajupadhye.prepgap.config;

import org.apache.tomcat.util.http.Rfc6265CookieProcessor;
import org.apache.tomcat.util.http.SameSiteCookies;
import org.springframework.boot.web.embedded.tomcat.TomcatContextCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CookieConfig {

    @Bean
    public TomcatContextCustomizer tomcatContextCustomizer() {
        return context -> {
            Rfc6265CookieProcessor cookieProcessor = new Rfc6265CookieProcessor();
            // Using LAX instead of NONE for local development compatibility over HTTP.
            // When deploying to production (Render/Vercel), this may need to be NONE + Secure.
            cookieProcessor.setSameSiteCookies(SameSiteCookies.LAX.getValue());
            context.setCookieProcessor(cookieProcessor);
        };
    }
}