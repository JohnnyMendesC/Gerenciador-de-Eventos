package com.desafio.neki.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.desafio.neki.entity.Admin;
import com.desafio.neki.repository.AdminRepository;

@Service
public class AutenticacaoService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Admin buscarPorEmail(String email) {
        return adminRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Administrador não encontrado"));
    }
    
    public boolean autenticar(String email, String senha) {
    	Admin admin = adminRepository.findByEmail(email).
    			orElseThrow(() -> new RuntimeException("Administrador não encontrado"));
    	return passwordEncoder.matches(senha, admin.getSenha());
    }
}
