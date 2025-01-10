package com.desafio.neki.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.desafio.neki.entity.Evento;

@Repository
public interface EventoRepository extends JpaRepository<Evento, Long> {
//	○	Receba o id do administrador e retorne todos os eventos associados.
	List<Evento> findByAdminResponsavel_AdminId(Long adminId);
}
