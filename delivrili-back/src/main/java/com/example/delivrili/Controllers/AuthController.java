package com.example.delivrili.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.delivrili.Dto.AuthDto;
import com.example.delivrili.Entities.DeliveryMan;
import com.example.delivrili.Entities.Sender;
import com.example.delivrili.Repositories.DeliveryManRepository;
import com.example.delivrili.Repositories.SenderRepository;

@RestController
@RequestMapping("/auth")
public class AuthController {

  @Autowired
  BCryptPasswordEncoder bCryptPasswordEncoder;
  @Autowired
  private SenderRepository senderRepository;
  @Autowired
  private DeliveryManRepository deliveryManRepository;

  @PostMapping("/signup-sender")
  public ResponseEntity signupsender(@RequestBody Sender sender) {
    try {
      sender.setPassword(bCryptPasswordEncoder.encode(sender.getPassword()));
      senderRepository.save(sender);

      return new ResponseEntity("signed up succefully", HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity("Exception occured ==> " + e, HttpStatus.OK);

    }
  }

  @PostMapping("/signup-delivery")
  public ResponseEntity signup(@RequestBody DeliveryMan deliveryMan) {
    try {
      deliveryMan.setPassword(bCryptPasswordEncoder.encode(deliveryMan.getPassword()));
      deliveryManRepository.save(deliveryMan);

      return new ResponseEntity("signed up succefully", HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity("Exception occured ==> " + e, HttpStatus.OK);
    }

  }

  @PostMapping("/signin")
  public ResponseEntity signin(@RequestBody AuthDto authDto) {

    Sender sender = senderRepository.findByEmail(authDto.getEmail());

    if (sender != null) {
      if (bCryptPasswordEncoder.matches(authDto.getPassword(), sender.getPassword())) {
        return new ResponseEntity(sender, HttpStatus.OK);
      } else {
        return new ResponseEntity("Wrong info", HttpStatus.UNAUTHORIZED);

      }
    } else {
      DeliveryMan deliveryMan = deliveryManRepository.findByEmail(authDto.getEmail());

      if (deliveryMan != null) {
        if (bCryptPasswordEncoder.matches(authDto.getPassword(), deliveryMan.getPassword())) {
          return new ResponseEntity(deliveryMan, HttpStatus.OK);
        } else {
          return new ResponseEntity("Wrong info", HttpStatus.UNAUTHORIZED);

        }
      }
    }
    return new ResponseEntity("Wrong info", HttpStatus.UNAUTHORIZED);
  }
}
