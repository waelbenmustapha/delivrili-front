package com.example.delivrili.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.delivrili.Entities.DeliveryMan;
import com.example.delivrili.Entities.Offer;
import com.example.delivrili.Repositories.DeliveryManRepository;
import com.example.delivrili.Repositories.OfferRepository;
import com.example.delivrili.Repositories.SenderRepository;

@RestController
@RequestMapping("/offer")
public class OfferController {

  @Autowired
  private OfferRepository offerRepository;

  @Autowired
  private SenderRepository senderRepository;

  @Autowired
  private DeliveryManRepository deliveryManRepository;

  @GetMapping("/getall")
  public ResponseEntity getall(){
    return new ResponseEntity(offerRepository.findAll(), HttpStatus.OK);
  }

  @PostMapping("/add-offer")
  public  ResponseEntity addoffer(@RequestBody Offer offer){
   offerRepository.save(offer);

    return new ResponseEntity("saved",HttpStatus.OK);

  }

  @GetMapping("/get-offers-by-user/{id}")
  public ResponseEntity getuseroffers(@PathVariable("id") Long id){
    return new ResponseEntity(offerRepository.findBySenderId(id),HttpStatus.OK);
  }

  @GetMapping("/get-offers-by-delivery-man/{id}")
  public ResponseEntity getdeloffers(@PathVariable("id") Long id){
    return new ResponseEntity(offerRepository.findByDeliveryManId(id),HttpStatus.OK);
  }


  @PutMapping("/apply-to-offer/{offerid}/{deliveryid}")
  public ResponseEntity applytooffer(@PathVariable("offerid") Long offerid,@PathVariable("deliveryid") Long deliveryid){

    Offer offer = offerRepository.findById(offerid).get();
    DeliveryMan deliveryMan = deliveryManRepository.findById(deliveryid).get();

    offer.setDeliveryMan(deliveryMan);
    offerRepository.save(offer);
    return new ResponseEntity("Done",HttpStatus.OK);
  }

}
