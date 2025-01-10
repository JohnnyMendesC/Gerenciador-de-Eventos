package com.desafio.neki.dto;

import java.time.LocalDate;

public class EventoRequestDto {
//○	Receba o nome, data, localização, imagem e adminId para associar o evento ao administrador.
    private String nome;
    private LocalDate data;
    private String localizacao;
    private String imagemUrl;
    
//	Getters e Setters
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
}
