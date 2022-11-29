package com.example.delivrili.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.delivrili.Entities.DeliveryMan;
import com.example.delivrili.Entities.Offer;

@Repository
public interface OfferRepository extends JpaRepository<Offer,Long> {

  public List<Offer> findBySenderId(Long id);
  public List<Offer> findByDeliveryManId(Long id);

}
