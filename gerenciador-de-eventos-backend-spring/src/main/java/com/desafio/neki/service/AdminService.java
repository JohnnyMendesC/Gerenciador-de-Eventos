package com.desafio.neki.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.desafio.neki.dto.AdminRequestDto;
import com.desafio.neki.dto.AdminResponseDto;
import com.desafio.neki.entity.Admin;
import com.desafio.neki.repository.AdminRepository;

import jakarta.transaction.Transactional;

@Service
public class AdminService {
//	Repositórios do Service
    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private AutenticacaoService autenticacaoService;
    
//	Metodos CRUD do Service do Administrador:
//	Create | Criar
    @Transactional
    public AdminResponseDto criarAdmin(AdminRequestDto dto) {
    	Admin admin = new Admin();
    	admin.setNome(dto.getNome());
    	admin.setEmail(dto.getEmail());
    	admin.setSenha(passwordEncoder.encode(dto.getSenha()));
    	adminRepository.save(admin);
    	return AdminResponseDto.fromEntity(admin);
    }
	
//	Read | Ler
	public List<AdminResponseDto> encontrarTodosAdmins() {
		return adminRepository.findAll().stream().map(admin -> AdminResponseDto.fromEntity(admin)).toList();
	}

	public Optional<AdminResponseDto> encontrarPorAdminId(Long id) {
		if (!adminRepository.existsById(id)) {
		}
		return Optional.of(AdminResponseDto.fromEntity(adminRepository.findById(id).get()));
	}
	
	public Optional<AdminResponseDto> encontrarAdminPorToken() {
		Admin adminAutenticado = autenticacaoService.getAuthenticatedUser();
		if (!adminRepository.existsById(adminAutenticado.getAdminId())) {
		}
		return Optional.of(AdminResponseDto.fromEntity(adminAutenticado));
	}
	
//	Update | Atualizar/Editar
	
//	Delete | Deletar
}
