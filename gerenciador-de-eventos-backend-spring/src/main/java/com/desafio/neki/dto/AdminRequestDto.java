package com.desafio.neki.dto;

public class AdminRequestDto {
//○	Receba os dados de nome, email e senha para cadastro:
	private String nome;
	private String email;
	private String senha;
	
//	Getters Setters:
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getSenha() {
		return senha;
	}
	public void setSenha(String senha) {
		this.senha = senha;
	}
}
