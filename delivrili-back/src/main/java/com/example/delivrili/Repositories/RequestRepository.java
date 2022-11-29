package com.example.delivrili.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.delivrili.Entities.Requests;

public interface RequestRepository extends JpaRepository<Requests,Long> {

   List<Requests> findByOfferId(Long offerid);
   List<Requests> findByDeliveryManId(Long delid);
   Requests findByOfferIdAndDeliveryManId(Long offerid,Long delid);
}
