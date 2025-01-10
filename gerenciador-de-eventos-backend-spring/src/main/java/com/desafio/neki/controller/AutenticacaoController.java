package com.desafio.neki.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.desafio.neki.dto.LoginRequestDto;
import com.desafio.neki.entity.Admin;
import com.desafio.neki.service.AutenticacaoService;
import com.desafio.neki.service.TokenService;

@RestController
@RequestMapping("/autenticacao")
public class AutenticacaoController {

	@Autowired
	private AutenticacaoService autenticacaoService;

	@Autowired
	private TokenService tokenService;
	
	
	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody LoginRequestDto loginRequestDto) {
		boolean autenticado = autenticacaoService.autenticar(loginRequestDto.getEmail(), loginRequestDto.getSenha());
		if (autenticado) {
			Admin admin = autenticacaoService.buscarPorEmail(loginRequestDto.getEmail());
			String token = tokenService.generateToken(admin);
			return ResponseEntity.ok(token);
		}
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciais inválidas");
	}
}
