package com.desafio.neki.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.security.core.Authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.desafio.neki.dto.AdminRequestDto;
import com.desafio.neki.dto.AdminResponseDto;
import com.desafio.neki.entity.Admin;
import com.desafio.neki.entity.Evento;
import com.desafio.neki.service.AdminService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@RestController
@RequestMapping("/admins")
public class AdminController {

	@Autowired
	private AdminService adminService;
	@Operation(summary = "Cria um novo administrador")
	@ApiResponses(value = { @ApiResponse(responseCode = "201", content = {
			@Content(schema = @Schema(implementation = Admin.class), mediaType = "application/json") }, description = "Administrador cadastrado com sucesso"),
			@ApiResponse(responseCode = "400", description = "Requisição inválida. Verifique se os parâmetros fornecidos estão corretos e no formato esperado."),
			@ApiResponse(responseCode = "401", description = "Erro de autenticação"),
			@ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
			@ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
			@ApiResponse(responseCode = "500", description = "Erro interno no servidor"),
			@ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") })
	@PostMapping("/cadastro")
	public ResponseEntity<AdminResponseDto> criarAdministrador(@RequestBody AdminRequestDto adminRequestDto) {
		AdminResponseDto response = adminService.criarAdmin(adminRequestDto);
		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}

	@Operation(summary = "Lista todos os administradores", description = "Retorna todos os administradores cadastrados no banco de dados.")
	@ApiResponses(value = { 
			@ApiResponse(responseCode = "200", content = {
			@Content(schema = @Schema(implementation = Admin.class), mediaType = "application/json") }, description = "Retorna todos os Administradores"),
			@ApiResponse(responseCode = "400", description = "Requisição inválida. Verifique se os parâmetros fornecidos estão corretos e no formato esperado."),
			@ApiResponse(responseCode = "401", description = "Erro de autenticação"),
			@ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
			@ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
			@ApiResponse(responseCode = "500", description = "Erro interno no servidor") })
	@GetMapping
	public ResponseEntity<List<AdminResponseDto>> exibirTodosAdmins() {
		return ResponseEntity.ok(adminService.encontrarTodosAdmins());
	}

	@Operation(summary = "Busca administrador por Id", description = "Busca um administrador de acordo com o seu Id.")
	@ApiResponses(value = { 
			@ApiResponse(responseCode = "200", content = {
			@Content(schema = @Schema(implementation = Admin.class), mediaType = "application/json") }, description = "Retorna o Administrador por Id"),
			@ApiResponse(responseCode = "400", description = "Requisição inválida. Verifique se os parâmetros fornecidos estão corretos e no formato esperado."),
			@ApiResponse(responseCode = "401", description = "Erro de autenticação"),
			@ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
			@ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
			@ApiResponse(responseCode = "500", description = "Erro interno no servidor") })
	@GetMapping("{id}")
	public ResponseEntity<Optional<AdminResponseDto>> exibirAdminPorId(@PathVariable Long id) {
		return ResponseEntity.ok(adminService.encontrarPorAdminId(id));
	}
	
	
	@GetMapping("/perfil")
	public ResponseEntity<String> exibirPerfil(Authentication authentication) {
	    return ResponseEntity.ok("Usuário autenticado: " + authentication);
	}
}
