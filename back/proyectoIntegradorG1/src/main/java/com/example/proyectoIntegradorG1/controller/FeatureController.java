package com.example.proyectoIntegradorG1.controller;

import com.example.proyectoIntegradorG1.model.dto.FeatureDTO;
import com.example.proyectoIntegradorG1.service.IService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/features")
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST, RequestMethod.DELETE})
public class FeatureController {

    @Autowired
    @Qualifier("FeatureService")
    private IService<FeatureDTO> service;

    @PostMapping()
    public ResponseEntity<FeatureDTO> create (@RequestBody FeatureDTO featureDTO){

        FeatureDTO object = service.save(featureDTO);

        if(object != null){
            return ResponseEntity.status(HttpStatus.CREATED).body(object);
        }else{
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
    }

    @GetMapping()
    public ResponseEntity<List<FeatureDTO>> listAll(){
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FeatureDTO> findById(@PathVariable Long id) {

        FeatureDTO featureDTO = service.findById(id);

        if(featureDTO != null){
            //Si existe la categoría la devuelve
            return ResponseEntity.ok(featureDTO);
        }else{
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }

    }

    @PutMapping()
    public ResponseEntity<FeatureDTO> update(@RequestBody FeatureDTO featureDTO){

        if(service.findById(featureDTO.getId()) != null){
            return ResponseEntity.ok(service.update(featureDTO));
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
