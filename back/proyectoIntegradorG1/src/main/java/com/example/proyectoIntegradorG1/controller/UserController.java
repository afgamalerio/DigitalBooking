package com.example.proyectoIntegradorG1.controller;

import com.example.proyectoIntegradorG1.jwt.MyUserDetailsService;
import com.example.proyectoIntegradorG1.model.User;
import com.example.proyectoIntegradorG1.model.dto.UserDTO;
import com.example.proyectoIntegradorG1.service.IService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST, RequestMethod.DELETE})
public class UserController {

    @Autowired
    @Qualifier("UserService")
    private IService<UserDTO> service;

    @Autowired
    private MyUserDetailsService myUserDetailsService;

    final static Logger logger = Logger.getLogger(UserController.class);


    @PostMapping()
    public ResponseEntity<String> create (@RequestBody User user){

        if(myUserDetailsService.save(user) != null){
            return ResponseEntity.status(HttpStatus.CREATED).body("Usuario " +
                    "creado correctamente");
        }else{
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Error: Ya" +
                    " existe un usuario con ese correo electrónico");
        }
    }

    @GetMapping()
    public ResponseEntity<List<UserDTO>> listAll(){
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> findById(@PathVariable Long id) {

        UserDTO userDTO = service.findById(id);

        if(userDTO != null){
            //Si existe la categoría la devuelve
            return ResponseEntity.ok(userDTO);
        }else{
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }

    }

    @PutMapping()
    public ResponseEntity<UserDTO> update(@RequestBody UserDTO userDTO){

        if(service.findById(userDTO.getId()) != null){
            //Si existe la categoría la actualiza
            return ResponseEntity.ok(service.update(userDTO));
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
