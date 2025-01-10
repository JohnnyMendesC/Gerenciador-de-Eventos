package com.desafio.neki.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.desafio.neki.dto.EventoRequestDto;
import com.desafio.neki.dto.EventoResponseDto;
import com.desafio.neki.entity.Evento;
import com.desafio.neki.service.EventoService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@RestController
@RequestMapping("/eventos")
public class EventoController {

	@Autowired
	private EventoService eventoService;
	/*
	@Operation(summary = "Insere um novo evento")
	@ApiResponses(value = { 
			@ApiResponse(responseCode = "201", 
			content = {@Content(schema = @Schema(implementation = Evento.class), mediaType = "application/json")},
			description = "Evento cadastrado com sucesso"),
			@ApiResponse(responseCode = "401", description = "Erro de autenticação"),
			@ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
			@ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
			@ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") })
	@PostMapping("/eventos")
	public ResponseEntity<EventoResponseDto> criarEvento(@RequestBody EventoRequestDto eventoRequest) {
	    EventoResponseDto response = eventoService.criarEvento(eventoRequest);
	    return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}
	*/
	@GetMapping
	public List<Evento> listarEventos(@RequestParam Long adminId) {
	    return null;//eventoService.findByAdminId(adminId);
	}
}
