package com.example.delivrili.Entities;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Entity
@Data
public class Offer {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private Date date;

  private String name;
  private Double weight;
  private Double price;
  private String image;

  @ManyToOne
  private Sender sender;


  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "pickup_location_id", referencedColumnName = "id")
  private Location pickUpLocation;
  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "dropdown_location_id", referencedColumnName = "id")
  private Location dropDownLocation;


  private String status = "pending";
  @ManyToOne
  private DeliveryMan deliveryMan;

}
