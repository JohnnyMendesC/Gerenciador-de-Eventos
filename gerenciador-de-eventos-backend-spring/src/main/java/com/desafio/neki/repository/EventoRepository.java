package com.desafio.neki.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.desafio.neki.entity.Evento;

public interface EventoRepository extends JpaRepository<Evento, Long> {

}
