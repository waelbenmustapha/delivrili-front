package com.example.delivrili.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.delivrili.Entities.DeliveryMan;

@Repository

public interface DeliveryManRepository extends JpaRepository<DeliveryMan,Long> {
  public DeliveryMan findByEmail(String s);

}
