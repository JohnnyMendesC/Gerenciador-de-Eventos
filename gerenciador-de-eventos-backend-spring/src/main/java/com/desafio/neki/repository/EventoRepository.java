package com.desafio.neki.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.desafio.neki.entity.Evento;

@Repository
public interface EventoRepository extends JpaRepository<Evento, Long> {

}
