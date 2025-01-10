package com.desafio.neki.dto;

import com.desafio.neki.entity.Admin;

public class AdminResponseDto {
//	Dados que voltam na resposta
	private Long adminId;
	private String nome;
	private String email;

// Construtor cheio e vazio:
	public AdminResponseDto(Admin admin) {
		super();
		this.adminId = admin.getAdminId();
		this.nome = admin.getNome();
		this.email = admin.getEmail();
	}
	public AdminResponseDto(Long adminId, String nome, String email) {
		super();
		this.adminId = adminId;
		this.nome = nome;
		this.email = email;
	}

	public AdminResponseDto() {
		super();
	}
//	Conversor de Entidade para ResponseDto (utilizado no Service):
	public static AdminResponseDto fromEntity(Admin admin) {
		return new AdminResponseDto(
				admin.getAdminId(),
				admin.getNome(),
				admin.getEmail()
				);
	}
	
//	Getters e Setters da Response:	
	public Long getAdminId() {
		return adminId;
	}
	public void setAdminId(Long adminId) {
		this.adminId = adminId;
	}
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
	

}
