package com.example.proyectoIntegradorG1.controller;

import com.example.proyectoIntegradorG1.model.dto.ReservationCompleteDTO;
import com.example.proyectoIntegradorG1.model.dto.ReservationDTO;
import com.example.proyectoIntegradorG1.service.IService;
import com.example.proyectoIntegradorG1.service.ReservationService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reservations")
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST, RequestMethod.DELETE})
public class ReservationController {

    @Autowired
    @Qualifier("ReservationService")
    private ReservationService service;


 /*   @PostMapping()
    public ResponseEntity<ReservationDTO> create (@RequestBody ReservationDTO reservationDTO){

        ReservationDTO object = service.save(reservationDTO);

        if(object!= null){
            return ResponseEntity.status(HttpStatus.CREATED).body(object);
        }else{
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
    }*/

    @GetMapping()
    public ResponseEntity<List<ReservationDTO>> listAll(){
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReservationDTO> findById(@PathVariable Long id) {

        ReservationDTO reservationDTO = service.findById(id);

        if(reservationDTO != null){
            //Si existe la categoría la devuelve
            return ResponseEntity.ok(reservationDTO);
        }else{
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }

    }

    @GetMapping("/products/{id}")
    public ResponseEntity<List<ReservationDTO>> listAllByProduct(@PathVariable Long id){
        List<ReservationDTO> list = service.findAllReservationsByProduct(id);
        if(list!=null){
            return ResponseEntity.ok(list);
        }else {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<List<ReservationCompleteDTO>> listAllByUser(@PathVariable Long id){
        List<ReservationCompleteDTO> list = service.findAllReservationsByUser(id);
        if(list!=null){
            return ResponseEntity.ok(list);
        }else {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
    }

    @PutMapping()
    public ResponseEntity<ReservationDTO> update(@RequestBody ReservationDTO reservationDTO){

        if(service.findById(reservationDTO.getId()) != null){
            //Si existe la categoría la actualiza
            return ResponseEntity.ok(service.update(reservationDTO));
        }else{
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        ResponseEntity<String> response = null;

        if (service.findById(id) != null) {
            service.delete(id);
            response = ResponseEntity.ok("Eliminado correctamente");
        } else {
            response = ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }

        return response;
    }
}
