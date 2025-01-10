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
	/*
	public Optional<EventoResponseDto> encontrarPorAdminId(Long id) {
		if (!adminRepository.existsById(id)) {
		}
		return Optional.of(AdminResponseDto.fromEntity(adminRepository.findById(id).get()));
	}*/
	
	public Optional<EventoResponseDto> encontrarPorEventoId(Long id) {
		if (!eventoRepository.existsById(id)) {
		}
		return Optional.of(EventoResponseDto.fromEntity(eventoRepository.findById(id).get()));
	}
	
//	Update | Atualizar/Editar
	
//	Delete | Deletar
	
}
