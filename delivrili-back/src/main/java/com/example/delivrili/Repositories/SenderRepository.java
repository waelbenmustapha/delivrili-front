package com.example.delivrili.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.delivrili.Entities.Sender;

@Repository
public interface SenderRepository extends JpaRepository<Sender,Long> {
public Sender findByEmail(String s);
}
