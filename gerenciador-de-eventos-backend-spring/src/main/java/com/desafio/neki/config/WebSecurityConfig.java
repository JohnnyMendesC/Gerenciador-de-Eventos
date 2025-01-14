package com.desafio.neki.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.desafio.neki.service.AutenticacaoService;
import com.desafio.neki.service.TokenService;

@Configuration
public class WebSecurityConfig {
	
	@Autowired
	private TokenService tokenService;
	
    @Autowired
    private AutenticacaoService autenticacaoService;

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter(tokenService, autenticacaoService);
    }
    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(request -> {
                var corsConfiguration = new org.springframework.web.cors.CorsConfiguration();
                corsConfiguration.setAllowedOrigins(List.of(
                    "http://localhost:5173", 
                    "http://localhost:8081", 
                    "http://192.168.0.108:8081"	// Acesso do Emulador Mobile
                ));
                corsConfiguration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                corsConfiguration.setAllowedHeaders(List.of("*"));
                corsConfiguration.setAllowCredentials(true);
                return corsConfiguration;
            }))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/autenticacao/**").permitAll() 	// ● Segurança JWT para serviços, exceto o login.
                .requestMatchers("/admins/cadastro/**").permitAll() // E cadastro
                .requestMatchers("/swagger-ui/**", "/v3/api-docs/**", "/swagger-resources/**", "/webjars/**").permitAll()
                .anyRequest().authenticated() 						// Permite outras requisições somente com autenticação
                // .anyRequest().permitAll() 						// Permite todas requisições na fase de desenvolvimento
            )
            .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}