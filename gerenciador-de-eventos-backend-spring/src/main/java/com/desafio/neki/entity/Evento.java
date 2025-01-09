package com.desafio.neki.entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Evento {
//	Atributos do evento:
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long eventoId;
    
    private String nome;
    private LocalDate data;
    private String localizacao;
    private String imagemUrl;
    
//	Relação com o administrador responsável pelo evento (N, 1):
    @ManyToOne
    @JoinColumn(name = "admin_id")
    private Admin adminResponsavel;

//	Getters e Setters do evento:
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

	public Admin getAdminResponsavel() {
		return adminResponsavel;
	}

	public void setAdminResponsavel(Admin adminResponsavel) {
		this.adminResponsavel = adminResponsavel;
	}
}
