package com.example.proyectoIntegradorG1.controller;

import com.example.proyectoIntegradorG1.model.dto.ImageDTO;
import com.example.proyectoIntegradorG1.model.dto.ProductDTO;
import com.example.proyectoIntegradorG1.service.IService;
import com.example.proyectoIntegradorG1.service.ImageService;
import com.example.proyectoIntegradorG1.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/images")
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST, RequestMethod.DELETE})
public class ImageController {

    @Autowired
    private ImageService service;

    @Autowired
    private ProductService productService;


    @PostMapping()
    public ResponseEntity<ImageDTO> create (@RequestBody ImageDTO imageDTO){

        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(imageDTO));
    }

    @GetMapping()
    public ResponseEntity<List<ImageDTO>> listAll(){
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ImageDTO> findById(@PathVariable Long id) {

        ImageDTO imageDTO = service.findById(id);

        if(imageDTO != null){
            return ResponseEntity.ok(imageDTO);
        }else{
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }

    }

    @PutMapping()
    public ResponseEntity<ImageDTO> update(@RequestBody ImageDTO imageDTO){

        if(service.findById(imageDTO.getId()) != null){
            return ResponseEntity.ok(service.update(imageDTO));
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

    //EndPoint para asignar un producto a una imagen
    @PostMapping("/{id}/products/{id_product}")
    public ResponseEntity<String> findById(@PathVariable Long id,
                                           @PathVariable Long id_product) {

        ImageDTO imageDTO = service.findById(id);
        ProductDTO productDTO = productService.findById(id_product);

        if(imageDTO != null && productDTO != null){
            service.setProduct(imageDTO, productDTO);
            return ResponseEntity.ok("Producto asignado correctamente");
        }else{
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }

    }
}