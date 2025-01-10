package com.desafio.neki.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.desafio.neki.entity.Admin;
import com.desafio.neki.repository.AdminRepository;
import org.springframework.security.core.userdetails.UserDetails;
@Service
public class AutenticacaoService implements UserDetailsService {

	@Autowired
	private AdminRepository adminRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Admin admin = adminRepository.findOptionalByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException("Administrador não encontrado: " + email));
		 return org.springframework.security.core.userdetails.User
	                .withUsername(admin.getEmail())
	                .password(admin.getSenha())
	                .authorities(List.of())
	                .build();
	}
	
	public Admin buscarPorEmail(String email) {
		return adminRepository.findOptionalByEmail(email)
				.orElseThrow(() -> new RuntimeException("Administrador não encontrado"));
	}

	public boolean autenticar(String email, String senha) {
		Admin admin = adminRepository.findOptionalByEmail(email)
				.orElseThrow(() -> new RuntimeException("Administrador não encontrado para autenticação"));
		return passwordEncoder.matches(senha, admin.getSenha());
	}

	public Admin getAuthenticatedUser() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication == null || !authentication.isAuthenticated()) {
			throw new UsernameNotFoundException("Usuário não autenticado.");
		}

		String email = authentication.getName();
		return buscarPorEmail(email);
	}
}