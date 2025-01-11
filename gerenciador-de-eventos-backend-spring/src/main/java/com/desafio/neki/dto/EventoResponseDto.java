package com.desafio.neki.dto;

import java.time.LocalDate;

import com.desafio.neki.entity.Evento;

public class EventoResponseDto {
//	Dados que voltam na resposta
	private Long eventoId;
    private String nome;
    private LocalDate data;
    private String localizacao;
    private String imagemUrl;
    private Long adminId;
    
//	Construtor cheio e vazio:
    public EventoResponseDto(Evento evento) {
    	super();
    	this.eventoId = evento.getEventoId();
    	this.nome = evento.getNome();
    	this.data = evento.getData();
    	this.localizacao = evento.getLocalizacao();
    	this.imagemUrl = evento.getImagemUrl();
    	this.adminId = evento.getAdminResponsavel().getAdminId();
    }
	public EventoResponseDto(Long eventoId, String nome, LocalDate data, String localizacao, String imagemUrl, Long adminId) {
		super();
		this.eventoId = eventoId;
		this.nome = nome;
		this.data = data;
		this.localizacao = localizacao;
		this.imagemUrl = imagemUrl;
		this.adminId = adminId;
	}
	public EventoResponseDto() {
		super();
	}
	
//	Conversor de Entidade para ResponseDto (utilizado no Service):
	public static EventoResponseDto fromEntity(Evento evento) {
		return new EventoResponseDto(
				evento.getEventoId(),
				evento.getNome(),
				evento.getData(),
				evento.getLocalizacao(),
				evento.getImagemUrl(),
				evento.getAdminResponsavel().getAdminId()
				);
	}
	
//	Getters Setters:
	public Long getEventoId() {
		return eventoId;
	}
	public void setEventoId(Long eventoId) {
		this.eventoId = eventoId;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public LocalDate getData() {
		return data;
	}
	public void setData(LocalDate data) {
		this.data = data;
	}
	public String getLocalizacao() {
		return localizacao;
	}
	public void setLocalizacao(String localizacao) {
		this.localizacao = localizacao;
	}
	public String getImagemUrl() {
		return imagemUrl;
	}
	public void setImagemUrl(String imagemUrl) {
		this.imagemUrl = imagemUrl;
	}
	public Long getAdminId() {
		return adminId;
	}
	public void setAdminId(Long adminId) {
		this.adminId = adminId;
	}
}
