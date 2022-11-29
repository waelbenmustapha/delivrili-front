package com.example.delivrili.Entities;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.xml.bind.v2.runtime.reflect.Lister.Pack;

import lombok.Data;

@Data
@Entity
public class Sender {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String role = "sender";
  private String name;
  private String password;
  private String email;
  @JsonIgnore
  @OneToMany(mappedBy = "sender")
  private List<Offer> offers;

}
