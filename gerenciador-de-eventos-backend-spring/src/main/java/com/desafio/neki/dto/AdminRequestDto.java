package com.desafio.neki.dto;

//import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class AdminRequestDto {
//○	Receba os dados de nome, email e senha para cadastro:
	
	@NotBlank(message = "O nome é obrigatório.")
    @Size(max = 100, message = "O nome não pode exceder 100 caracteres.")
	private String nome;
	
	//@Email(message = "O email deve ser válido.")
    @NotBlank(message = "O email é obrigatório.")
    @Size(max = 100, message = "O email não pode exceder 100 caracteres.")
	private String email;
    
    @NotBlank(message = "A senha é obrigatória.")
    //@Size(min = 8, message = "A senha deve ter pelo menos 8 caracteres.")
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
