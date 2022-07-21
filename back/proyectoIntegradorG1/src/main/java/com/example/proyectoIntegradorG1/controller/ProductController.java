package com.example.proyectoIntegradorG1.controller;

import com.example.proyectoIntegradorG1.model.dto.ProductCreateDTO;
import com.example.proyectoIntegradorG1.model.dto.ProductDTO;
import com.example.proyectoIntegradorG1.service.IServiceProduct;
import com.example.proyectoIntegradorG1.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST, RequestMethod.DELETE})
public class ProductController {

    @Autowired
    private IServiceProduct service;


    @PostMapping("/auth")
    public ResponseEntity<ProductCreateDTO> create (@RequestBody ProductCreateDTO productDTO){

        ProductCreateDTO object = service.save(productDTO);

        if(object != null){
            //Si existe el producto lo devuelve
            return ResponseEntity.status(HttpStatus.CREATED).body(object);
        }else{
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }

    }

    @GetMapping()
    public ResponseEntity<Page<ProductDTO>> listAll(@PageableDefault(page=0,
            size=5) Pageable pageable){
        return ResponseEntity.ok(service.findAllPageable(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> findById(@PathVariable Long id) {

        ProductDTO object = service.findById(id);

        if(object != null){
            //Si existe el producto lo devuelve
            return ResponseEntity.ok(object);
        }else{
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }

    }

    @PutMapping()
    public ResponseEntity<ProductCreateDTO> update(@RequestBody ProductCreateDTO productDTO){

        ProductCreateDTO object = service.update(productDTO);

        if(object != null){
            //Si existe el producto lo devuelve
            return ResponseEntity.status(HttpStatus.CREATED).body(object);
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

    @GetMapping("/categories/{id}")
    public ResponseEntity<Page<ProductDTO>> listAllByCategory(@PathVariable Long id, @PageableDefault(page=0, size=5) Pageable pageable) {

        Page<ProductDTO> list = service.findAllByCategory(id, pageable);

        if(list != null){
            //Si existe esa categoría devuelve el listado
            return ResponseEntity.ok(list);
        }else{
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }

    }

    @GetMapping("/cities/{id}")
    public ResponseEntity<Page<ProductDTO>> listAllByCity(@PathVariable Long id,
                                                       @PageableDefault(page=0, size=5) Pageable pageable) {

        Page<ProductDTO> list = service.findAllByCity(id, pageable);

        if(list != null){
            //Si existe esa ciudad devuelve el listado
            return ResponseEntity.ok(list);
        }else{
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }

    }

    @GetMapping("/rating")
    public ResponseEntity<Page<ProductDTO>> listAllByRating(@PageableDefault(page=0, size=5) Pageable pageable){
        return ResponseEntity.ok(service.findAllByRating(pageable));
    }

    @GetMapping("/filter/{city}/{start}/{finish}")
    public ResponseEntity<Page<ProductDTO>> listAllByCityandDates(@PathVariable Long city,
                                                                          @PathVariable String start,
                                                                          @PathVariable String finish, @PageableDefault(page=0, size=5) Pageable pageable) {

        Page<ProductDTO> list =
                service.findAllByCityandDates(city, start,
                        finish, pageable);

        if(list != null){
            //Si existe esa categoría devuelve el listado
            return ResponseEntity.ok(list);
        }else{
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }

    }

    @GetMapping("/filterDates/{start}/{finish}")
    public ResponseEntity<Page<ProductDTO>> listAllByDates(@PathVariable String start,
                                                                  @PathVariable String finish, @PageableDefault(page=0, size=5) Pageable pageable) {

        Page<ProductDTO> list =
                service.findAllByDates(start,
                        finish, pageable);

        if(list != null){
            //Si existe esa categoría devuelve el listado
            return ResponseEntity.ok(list);
        }else{
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }

    }

    /*PAGINACIÓN*/
    @GetMapping("/page")
    public ResponseEntity<Page<ProductDTO>> findAllProductsPage (@PageableDefault(page=0, size=5) Pageable pageable) {
        Page<ProductDTO> result = service.findAllPageable(pageable);
   /*     if(result.isEmpty()){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }else{*/
            return ResponseEntity.ok(result);
  //      }
    }

    @GetMapping("/rating/page")
    public ResponseEntity<Page<ProductDTO>> listAllByRatingPageable(@PageableDefault(page=0, size=5) Pageable pageable){
        return ResponseEntity.ok(service.findAllByRatingPageable(pageable));
    }


}
