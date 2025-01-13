package com.desafio.neki.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.desafio.neki.dto.AdminResponseDto;
import com.desafio.neki.dto.EventoRequestDto;
import com.desafio.neki.dto.EventoResponseDto;
import com.desafio.neki.entity.Admin;
import com.desafio.neki.entity.Evento;
import com.desafio.neki.service.EventoService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/eventos")
public class EventoController {

	@Autowired
	private EventoService eventoService;

	@Operation(summary = "Cadastra um novo evento")
	@ApiResponses(value = { @ApiResponse(responseCode = "201", content = {
			@Content(schema = @Schema(implementation = Evento.class), mediaType = "application/json") }, description = "Evento cadastrado com sucesso"),
			@ApiResponse(responseCode = "400", description = "Requisição inválida. Verifique se os parâmetros fornecidos estão corretos e no formato esperado."),
			@ApiResponse(responseCode = "401", description = "Erro de autenticação"),
			@ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
			@ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
			@ApiResponse(responseCode = "500", description = "Erro interno no servidor"),
			@ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") })
	@PostMapping
	public ResponseEntity<EventoResponseDto> cadastrarEvento(@Valid @RequestBody EventoRequestDto eventoRequest) {
		EventoResponseDto response = eventoService.criarEvento(eventoRequest);
		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}

	@Operation(summary = "Lista todos os eventos", description = "Retorna todos os eventos cadastrados no banco de dados.")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
			@Content(schema = @Schema(implementation = Evento.class), mediaType = "application/json") }, description = "Retorna todos os eventos"),
			@ApiResponse(responseCode = "400", description = "Requisição inválida. Verifique se os parâmetros fornecidos estão corretos e no formato esperado."),
			@ApiResponse(responseCode = "401", description = "Erro de autenticação"),
			@ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
			@ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
			@ApiResponse(responseCode = "500", description = "Erro interno no servidor") })
	@GetMapping
	public ResponseEntity<List<EventoResponseDto>> exibirTodosEventos() {
		return ResponseEntity.ok(eventoService.encontrarTodosEventos());
	}

	@Operation(summary = "Lista eventos do administrador autenticado", description = "Retorna todos os eventos associados ao administrador autenticado.")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Lista retornada com sucesso"),
			@ApiResponse(responseCode = "401", description = "Erro de autenticação"),
			@ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso") })
	@GetMapping("/meus-eventos")
	public ResponseEntity<List<EventoResponseDto>> listarEventosPorAdminAutenticado() {
		List<EventoResponseDto> eventos = eventoService.encontrarEventosPorAdminId();
		return ResponseEntity.ok(eventos);
	}

	@Operation(summary = "Busca evento pelo Id do evento", description = "Busca um evento de acordo com o seu Id.")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
			@Content(schema = @Schema(implementation = Evento.class), mediaType = "application/json") }, description = "Retorna o evento por Id"),
			@ApiResponse(responseCode = "400", description = "Requisição inválida. Verifique se os parâmetros fornecidos estão corretos e no formato esperado."),
			@ApiResponse(responseCode = "401", description = "Erro de autenticação"),
			@ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
			@ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
			@ApiResponse(responseCode = "500", description = "Erro interno no servidor") })
	@GetMapping("{id}")
	public ResponseEntity<Optional<EventoResponseDto>> encontrarPorEventoId(@PathVariable Long id) {
		return ResponseEntity.ok(eventoService.encontrarPorEventoId(id));
	}

	@Operation(summary = "Atualiza imagem, data ou localização do evento", description = "Permite atualizar a imagem, a data ou a localização de um evento.")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Evento atualizado com sucesso."),
			@ApiResponse(responseCode = "404", description = "Evento não encontrado."),
			@ApiResponse(responseCode = "400", description = "Requisição inválida.") })
	@PutMapping("/{eventoId}")
	public ResponseEntity<EventoResponseDto> atualizarEvento(@PathVariable Long eventoId,
			@Valid @RequestBody EventoRequestDto dto) {
		EventoResponseDto response = eventoService.atualizarEvento(eventoId, dto);
		return ResponseEntity.ok(response);
	}

	@Operation(summary = "Serviço de Exclusão de Evento:", description = "Permite que o administrador delete qualquer evento presente na plataforma utilizando o eventoId.")
	@ApiResponses(value = { @ApiResponse(responseCode = "204", description = "Sem conteúdo"),
			@ApiResponse(responseCode = "404", description = "Busca não encontrada. Verifique o ID ou outros parâmetros informados."),
			@ApiResponse(responseCode = "400", description = "Requisição inválida. Verifique se os parâmetros fornecidos estão corretos e no formato esperado."),
			@ApiResponse(responseCode = "500", description = "Erro interno no servidor. Tente novamente mais tarde.") })
	@DeleteMapping("/deletar/{eventoId}")
	public ResponseEntity<Void> apagarEvento(@PathVariable @Valid Long eventoId) {
		eventoService.deletarEvento(eventoId);
		return ResponseEntity.noContent().build();
	}
}
