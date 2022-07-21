package com.example.proyectoIntegradorG1.controller;

import com.example.proyectoIntegradorG1.model.dto.CategoryDTO;
import com.example.proyectoIntegradorG1.service.IService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST, RequestMethod.DELETE})
public class CategoryController {

    @Autowired
    @Qualifier("CategoryService")
    private IService<CategoryDTO> service;


    @PostMapping()
    public ResponseEntity<CategoryDTO> create (@RequestBody CategoryDTO categoryDTO){

        CategoryDTO object = service.save(categoryDTO);

        if(object != null){
            //Si existe lo devuelve
            return ResponseEntity.status(HttpStatus.CREATED).body(object);
        }else{
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
    }

    @GetMapping()
    public ResponseEntity<List<CategoryDTO>> listAll(){
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoryDTO> findById(@PathVariable Long id) {

        CategoryDTO categoryDTO = service.findById(id);

        if(categoryDTO != null){
            //Si existe la categoría la devuelve
            return ResponseEntity.ok(categoryDTO);
        }else{
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }

    }

    @PutMapping()
    public ResponseEntity<CategoryDTO> update(@RequestBody CategoryDTO categoryDTO){

        if(service.findById(categoryDTO.getId()) != null){
            //Si existe la categoría la actualiza
            return ResponseEntity.ok(service.update(categoryDTO));
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
