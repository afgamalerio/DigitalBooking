package com.example.proyectoIntegradorG1.jwt;

import com.example.proyectoIntegradorG1.model.AuthenticationRequest;
import com.example.proyectoIntegradorG1.model.AuthenticationResponse;
import com.example.proyectoIntegradorG1.model.User;
import com.example.proyectoIntegradorG1.model.dto.ReservationDTO;
import com.example.proyectoIntegradorG1.repository.IUserRepository;
import com.example.proyectoIntegradorG1.service.IService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,
        RequestMethod.POST,
        RequestMethod.DELETE, RequestMethod.OPTIONS, RequestMethod.HEAD,
        RequestMethod.PUT, RequestMethod.PATCH, RequestMethod.TRACE},
        allowedHeaders = "*")
public class ControllerJWT {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    @Qualifier("ReservationService")
    private IService<ReservationDTO> service;

    @Autowired
    private IUserRepository userRepository;

    final static Logger logger = Logger.getLogger(ControllerJWT.class);


    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception{
        logger.info("createAuthenticationToken");

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword()));
        }catch (BadCredentialsException e) {
            throw new Exception("Incorrect", e);
        }
        final UserDetails  userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        final String jwt = jwtUtil.generateToken(userDetails);
        logger.info("jwt: " + jwt);

        Optional<User> user = userRepository.getUserByEmail(authenticationRequest.getUsername());
        logger.info("user: " + user.toString());

        return ResponseEntity.ok(new AuthenticationResponse(jwt,
                user.get().getName(), user.get().getLastname(),
                user.get().getId(), user.get().getRol(), userDetails.getAuthorities()));
    }

   @RequestMapping(value = "/hello", method = RequestMethod.POST)
   @CrossOrigin(origins = "*", methods= {RequestMethod.GET,
           RequestMethod.POST,
           RequestMethod.DELETE, RequestMethod.OPTIONS, RequestMethod.HEAD,
           RequestMethod.PUT, RequestMethod.PATCH, RequestMethod.TRACE},
           allowedHeaders =
                   "Content-Type, " +
                           "Authorization")
      public String hello() {
        return "Hello World";
    }

    @RequestMapping({"/newreservation"})
    @PostMapping()
    public ResponseEntity<ReservationDTO> create (@RequestBody ReservationDTO reservationDTO){

        ReservationDTO object = service.save(reservationDTO);
        logger.info("controller object: " + object.toString());
        if(object!= null){
            return ResponseEntity.status(HttpStatus.CREATED).body(object);
        }else{
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
    }

}
