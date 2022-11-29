package com.example.delivrili.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.delivrili.Entities.DeliveryMan;
import com.example.delivrili.Entities.Offer;
import com.example.delivrili.Entities.Requests;
import com.example.delivrili.Repositories.DeliveryManRepository;
import com.example.delivrili.Repositories.OfferRepository;
import com.example.delivrili.Repositories.RequestRepository;

@RestController
@RequestMapping("/requests")
public class RequestController {

  @Autowired
  private RequestRepository requestRepository;

  @Autowired
  private DeliveryManRepository deliveryManRepository;

  @Autowired
  private OfferRepository offerRepository;


  @GetMapping("/getbyofferid/{id}")
  public ResponseEntity getisexist(@PathVariable("id") Long id) {
    return new ResponseEntity(requestRepository.findByOfferId(id), HttpStatus.OK);
  }
  @GetMapping("/getbydelid/{id}")
  public ResponseEntity getbydelid(@PathVariable("id") Long id) {
    return new ResponseEntity(requestRepository.findByDeliveryManId(id), HttpStatus.OK);
  }

  @PostMapping("/changerequeststatus/{reqid}/{status}")
  public ResponseEntity changereqstatus(@PathVariable("reqid") Long id, @PathVariable("status") Integer statusnumber) {

    Requests requests = requestRepository.findById(id).get();
    if (requests.getStatus() == "accepted") {
      return new ResponseEntity("Offer already accepted", HttpStatus.BAD_REQUEST);
    } else {
      if (statusnumber == 1) {
        requests.setStatus("accepted");
        Offer offer = requests.getOffer();
        offer.setDeliveryMan(requests.getDeliveryMan());
        offer.setStatus("accepted");
        offerRepository.save(offer);
        requestRepository.save(requests);
        return new ResponseEntity("Accepted", HttpStatus.OK);

      } else if (statusnumber == -1) {
        requests.setStatus("rejected");
        requestRepository.save(requests);

        return new ResponseEntity("Rejected", HttpStatus.OK);

      } else {
        return new ResponseEntity("Please provice a valid input", HttpStatus.OK);

      }
    }

  }

  @PostMapping("/request-offer/{delid}/{offerid}")
  public ResponseEntity requestoffer(@PathVariable("delid") Long delid, @PathVariable("offerid") Long offerid) {

    if (requestRepository.findByOfferIdAndDeliveryManId(offerid, delid) != null) {
      return new ResponseEntity("Already Exist", HttpStatus.BAD_REQUEST);

    } else {
      Requests requests = new Requests();
      DeliveryMan deliveryMan = deliveryManRepository.findById(delid).get();
      Offer offer = offerRepository.findById(offerid).get();

      requests.setDeliveryMan(deliveryMan);
      requests.setOffer(offer);

      requestRepository.save(requests);

      return new ResponseEntity("done", HttpStatus.OK);
    }
  }

}
