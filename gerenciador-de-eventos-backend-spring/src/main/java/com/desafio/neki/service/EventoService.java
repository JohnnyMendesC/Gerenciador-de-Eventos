package com.desafio.neki.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.desafio.neki.dto.AdminResponseDto;
import com.desafio.neki.dto.EventoRequestDto;
import com.desafio.neki.dto.EventoResponseDto;
import com.desafio.neki.entity.Admin;
import com.desafio.neki.entity.Evento;
import com.desafio.neki.exception.ResourceNotFoundException;
import com.desafio.neki.repository.AdminRepository;
import com.desafio.neki.repository.EventoRepository;

import jakarta.transaction.Transactional;

@Service
public class EventoService {
//	Repositórios do Service
	@Autowired 
	private EventoRepository eventoRepository;
	
//	Autenticador que encontrará o admin que fez a requisição:
	@Autowired
	private AutenticacaoService autenticacaoService;

//	Metodos CRUD do Service de Eventos:
//	Create | Criar
	@Transactional
	public EventoResponseDto criarEvento(EventoRequestDto dto) {
		Admin adminAutenticado = autenticacaoService.getAuthenticatedUser();
		Evento evento = new Evento();
		evento.setNome(dto.getNome());
		evento.setData(dto.getData());
		evento.setLocalizacao(dto.getLocalizacao());
		evento.setImagemUrl(dto.getImagemUrl());
		evento.setAdminResponsavel(adminAutenticado);
		eventoRepository.save(evento);
		return EventoResponseDto.fromEntity(evento);
	}
	
//	Read | Ler
	public List<EventoResponseDto> encontrarTodosEventos() {
		return eventoRepository.findAll().stream().map(evento -> EventoResponseDto.fromEntity(evento)).toList();
	}
	public List<EventoResponseDto> encontrarEventosPorAdminId() {
		Admin adminAutenticado = autenticacaoService.getAuthenticatedUser();
		List<Evento> eventos = eventoRepository.findByAdminResponsavel_AdminId(adminAutenticado.getAdminId());
		return eventos.stream().map(EventoResponseDto::fromEntity).toList();
	}
	
	public Optional<EventoResponseDto> encontrarPorEventoId(Long id) {
		if (!eventoRepository.existsById(id)) {
		}
		return Optional.of(EventoResponseDto.fromEntity(eventoRepository.findById(id).get()));
	}
	
//	Update | Atualizar/Editar
	public EventoResponseDto atualizarEvento(Long eventoId, EventoRequestDto dto) {
		Evento evento = eventoRepository.findById(eventoId)
				.orElseThrow(() -> new ResourceNotFoundException("Evento com id "+ eventoId  +" não encontrado."));
		
		if (dto.getNome() != null) {
			evento.setNome(dto.getNome());
		}
		if (dto.getData() != null) {
			evento.setData(dto.getData());
		}
		if (dto.getLocalizacao() != null) {
			evento.setLocalizacao(dto.getLocalizacao());
		}
		if (dto.getImagemUrl() != null) {
			evento.setImagemUrl(dto.getImagemUrl());
		}
		if (dto.getData() == null && dto.getLocalizacao() == null && dto.getImagemUrl() == null) {
		    throw new IllegalArgumentException("Pelo menos um campo (imagem, data ou localização) deve ser informado.");
		}

		
		eventoRepository.save(evento);
		return EventoResponseDto.fromEntity(evento);
	}
	
//	Delete | Deletar
	public void deletarEvento(Long id) {
		Evento evento = eventoRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Evento com id "+ id +" não encontrado."));
		eventoRepository.delete(evento);
	}
}
