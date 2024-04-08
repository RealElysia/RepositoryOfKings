package com.elysia.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;

@Configuration
public class WebConfig extends WebMvcConfigurationSupport {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/static/MyGirl/**")
                .addResourceLocations("classpath:/static/MyGirl/");

        registry.addResourceHandler("/static/**")
                .addResourceLocations("classpath:/static/");
    }
}

