package com.desafio.neki.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.desafio.neki.entity.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long> {
	
}
