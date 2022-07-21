package com.example.proyectoIntegradorG1.jwt;

import com.example.proyectoIntegradorG1.model.Rol;
import com.example.proyectoIntegradorG1.repository.IRolRepository;
import com.example.proyectoIntegradorG1.repository.IUserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.log4j.Logger;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;


@Service
public class MyUserDetailsService implements UserDetailsService {

    final static Logger logger = Logger.getLogger(MyUserDetailsService.class);

    @Autowired
    IUserRepository userRepository;

    @Autowired
    IRolRepository rolRepository;

    @Autowired
    ObjectMapper mapper;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    private BCryptPasswordEncoder encoder;

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        Optional<com.example.proyectoIntegradorG1.model.User> user = userRepository.getUserByEmail(userName);

        logger.info("loadUserByUsername");
        Set<GrantedAuthority> autorizaciones = new HashSet<>();
        if(user.isPresent()){
            GrantedAuthority autorizacion = new SimpleGrantedAuthority(user.get().getRol().getName());
            autorizaciones.add(autorizacion);

            logger.info("autorizaciones: " + autorizaciones);
        }else{
            logger.error("USER IS EMPTY: " + user.toString());
        }

        org.springframework.security.core.userdetails.User userDetail =
                new org.springframework.security.core.userdetails.User(user.get().getEmail(),user.get().getPassword(),true, true, true,true, autorizaciones);
        return userDetail;
    }

    public com.example.proyectoIntegradorG1.model.User save(com.example.proyectoIntegradorG1.model.User user) {
        //Analiza si existe el rol USER en la BD para asignarlo por defecto y
        // si no lo crea y lo asigna
        Optional<Rol> userRol = rolRepository.getRolByName("ROLE_USER");

        if(userRol.isPresent()){
            user.setRol(mapper.convertValue(userRol,
                    Rol.class));
        }else{
            Rol rol = new Rol();
            rol.setName("ROLE_USER");
            user.setRol(rolRepository.save(rol));
        }

        //Encripta la contraseña antes de guardarla
        encoder = new BCryptPasswordEncoder(12);
        user.setPassword(encoder.encode(user.getPassword()));

        com.example.proyectoIntegradorG1.model.User userCreated = null;
        try {
            userCreated = userRepository.save(user);
        }catch (DataIntegrityViolationException e){
            //capta el error de dato repetido en el email
            logger.error(e);
        }

        return userCreated;
    }
}
