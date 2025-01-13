package com.desafio.neki.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class EventoRequestDto {
//○	Receba o nome, data, localização, imagem e adminId para associar o evento ao administrador.
	@NotBlank(message = "O nome do evento é obrigatório.")
    @Size(max = 30, message = "O nome do evento não pode exceder 30 caracteres.")
    private String nome;
	
	@NotNull(message = "A data do evento é obrigatória.")
    private LocalDate data;
	
	@NotBlank(message = "A localização do evento é obrigatória.")
    @Size(max = 255, message = "A localização não pode exceder 255 caracteres.")
    private String localizacao;
	
	@Size(max = 500, message = "A URL da imagem não pode exceder 500 caracteres.")
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
