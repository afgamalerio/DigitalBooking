package com.example.proyectoIntegradorG1.controller;

import com.example.proyectoIntegradorG1.model.dto.CategoryDTO;
import com.example.proyectoIntegradorG1.model.dto.CityDTO;
import com.example.proyectoIntegradorG1.model.dto.ProductDTO;
import com.example.proyectoIntegradorG1.service.CityService;
import com.example.proyectoIntegradorG1.service.IService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cities")
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST, RequestMethod.DELETE})
public class CityController {

    @Autowired
    @Qualifier("CityService")
    private IService<CityDTO> service;


    @PostMapping()
    public ResponseEntity<CityDTO> create (@RequestBody CityDTO cityDTO){

        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(cityDTO));
    }

    @GetMapping()
    public ResponseEntity<List<CityDTO>> listAll(){
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CityDTO> findById(@PathVariable Long id) {

        CityDTO cityDTO = service.findById(id);

        if(cityDTO != null){
            return ResponseEntity.ok(cityDTO);
        }else{
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }

    }

    @PutMapping()
    public ResponseEntity<CityDTO> update(@RequestBody CityDTO cityDTO){

        if(service.findById(cityDTO.getId()) != null){
            //Si existe la ciudad la actualiza
            return ResponseEntity.ok(service.update(cityDTO));
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
